import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';

import Button from '../../Button';

import ERC20ABI from '../../../ERC20.json';
import type { ChainConfiguration } from '../../../config';
import { useModal } from '../../../context/ModalContext';
import { useToast } from '../../../context/ToastContext';

interface IProps {
  chainConfig: ChainConfiguration;
}

function ApproveContract({ chainConfig }: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const [approvalTx, setapprovalTx] = useState<null | `0x${string}`>(null);

  const { DAI, BREAD } = chainConfig;

  const { config } = usePrepareContractWrite({
    address: DAI.address,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [BREAD.address, ethers.constants.MaxUint256],
  });

  const {
    data, error, isSuccess, write,
  } = useContractWrite(config);

  useEffect(() => {
    if (error) {
      if (modalState) dispatchModal({ type: 'CLEAR_MODAL' });
      dispatchModal({ type: 'CLEAR_MODAL' });
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message: 'User rejected transaction',
        },
      });
    }
    if (isSuccess && data) {
      dispatchModal({ type: 'CLEAR_MODAL' });
      setapprovalTx(data.hash);
    }
  }, [isSuccess, data, error]);

  const handleApproveContract = async () => {
    dispatchModal({ type: 'SET_MODAL', payload: { type: 'APPROVAL', title: 'Approving BREAD Contract' } });
    write?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        onClick={handleApproveContract}
        variant="large"
        dataTest="approve-contract-button"
        disabled={!!approvalTx}
      >
        Approve Contract
      </Button>
      <div className="pb-6 text-xs text-neutral-300">
        You&apos;ll need to approve the BREAD contract to mint BREAD
      </div>
    </div>
  );
}

export default ApproveContract;
