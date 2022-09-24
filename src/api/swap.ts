import { BigNumberish } from "ethers";
import store from "../store";
import {
  setTransactionComplete,
  setTransactionPending,
} from "../features/transaction/transactionSlice";
import { unlockModal } from "../features/modal/modalSlice";
import { EToastType, setToast } from "../features/toast/toastSlice";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/providers";
import { parseEther } from "ethers/lib/utils";
import { UseContractWriteMutationArgs } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";

interface WaitableHash {
  hash: string;
  wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

export const swap = async (
  sendTx: (
    override?: UseContractWriteMutationArgs | undefined
  ) => Promise<WaitableHash>,
  amount: BigNumberish,
  dispatch: typeof store.dispatch,
  receiverAddress: string,
  resetSwapState: () => void
) => {
  if (typeof amount === "number") amount = parseEther(amount.toString());
  if (typeof amount === "string") amount = parseEther(amount);

  let txn = await sendTx();

  /**
    !!!
    
    At this point the transaction has been successfully submitted.
    
    Does it make more sense to break this swap function into 2 
    separate funcitons?
  
  */

  dispatch(setTransactionPending(txn.hash));
  dispatch(unlockModal());
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    console.error(err);
    dispatch(
      setToast({
        type: EToastType.ERROR,
        message: "bake/burn transaction failed",
      })
    );
  }
  dispatch(setTransactionComplete());
};
