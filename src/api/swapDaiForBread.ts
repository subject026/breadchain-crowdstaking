import {
  Contract, Signer,
} from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { abi as BreadABI } from '../BreadPolygon.json';
import { TToastDispatch } from '../context/ToastContext';
import { IProviderRpcError } from '../metamaskErrorType';
import { TModalDispatch } from '../context/ModalContext';
import { TTransactionDisplayDispatch } from '../context/TransactionDisplayContext';

export const swapDaiForBread = async (
  signer: Signer,
  amount: string,
  breadAddress: string,
  receiverAddress: string,
  dispatchTransactionDisplay: TTransactionDisplayDispatch,
  dispatchToast: TToastDispatch,
  dispatchModal: TModalDispatch,
  resetSwapState: () => void,
) => {
  const parsedAmount = parseEther(amount);

  const bread = new Contract(breadAddress, BreadABI, signer);

  let txn;

  try {
    txn = await bread.mint(parsedAmount, receiverAddress);
  } catch (err) {
    const { message } = err as IProviderRpcError;
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message,
      },
    });
  }

  dispatchTransactionDisplay({ type: 'SET_PENDING', payload: { status: 'PENDING', hash: txn.hash } });
  dispatchModal({ type: 'UNLOCK_MODAL' });
  resetSwapState();
  try {
    await txn.wait();
  } catch (err: any) {
    dispatchToast({
      type: 'SET_TOAST',
      payload: {
        type: 'ERROR',
        message: 'bake transaction failed',
      },
    });
  }
  dispatchTransactionDisplay({ type: 'SET_COMPLETE' });
};

export default swapDaiForBread;
