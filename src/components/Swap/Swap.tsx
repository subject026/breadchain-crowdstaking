import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { ChainConfiguration } from '../../config';
import { useToast } from '../../hooks/useToast';
import { useTokenAllowance } from '../../hooks/useTokenAllowance';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import NativeBalance from '../NativeBalance';

// import Button from '../Button';
import { useTransactionDisplay } from '../../hooks/useTransactionDisplay';
import ApproveContract from './ApproveContract';
import BakeOrBurn from './BakeOrBurn/BakeOrBurn';
import CheckingApproval from './CheckingApproval';
import FromPanel from './FromPanel';
import SwapReverse from './SwapReverse';
import ToPanel from './ToPanel';
import Transaction from './Transaction';
import { sanitizeInputValue } from './swapUtils';

interface ISwapState {
  mode: 'BAKE' | 'BURN';
  value: string;
  isContractApproved: null | boolean;
}

const initialSwapState: ISwapState = {
  mode: 'BAKE',
  value: '',
  isContractApproved: null,
};

interface IProps {
  chainConfig: ChainConfiguration;
  accountAddress: `0x${string}`;
}

function SwapUI({ chainConfig, accountAddress }: IProps) {
  const [swapState, setSwapState] = useState<ISwapState>(initialSwapState);

  const { DAI, BREAD } = chainConfig;

  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();

  const breadBalanceReadings = useTokenBalance(BREAD.address, accountAddress);
  const daiBalanceReadings = useTokenBalance(DAI.address, accountAddress);

  const {
    value: daiAllowanceValue,
    status: daiAllowanceStatus,
    error: daiAllowanceError,
  } = useTokenAllowance(DAI.address, accountAddress, BREAD.address);

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  const clearInputValue = () => {
    setSwapState((state) => ({ ...state, value: '' }));
  };

  useEffect(() => {
    resetSwapState();
  }, [chainConfig.NETWORK_STRING]);

  useEffect(() => {
    if (daiAllowanceError) {
      dispatchToast({
        type: 'SET_TOAST',
        payload: {
          type: 'ERROR',
          message: 'Failed to check contract approval',
        },
      });
      return;
    }

    if (daiAllowanceValue) {
      setSwapState((state) => ({
        ...state,
        isContractApproved: parseFloat(daiAllowanceValue) > 0,
      }));
    }
  }, [daiAllowanceStatus, daiAllowanceValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (transactionDisplay && transactionDisplay.status !== 'PENDING') {
      dispatchTransactionDisplay({ type: 'CLEAR' });
    }
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);
    setSwapState({
      ...swapState,
      value: sanitizedValue,
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => ({
      ...state,
      mode: state.mode === 'BAKE' ? 'BURN' : 'BAKE',
    }));
  };

  const handleBalanceClick = (value: string) => {
    setSwapState((state) => ({
      ...state,
      value,
    }));
  };

  return (
    <>
      <FromPanel
        inputValue={swapState.value}
        balanceReadings={
          swapState.mode === 'BAKE' ? daiBalanceReadings : breadBalanceReadings
        }
        tokenType={swapState.mode === 'BAKE' ? 'DAI' : 'BREAD'}
        handleBalanceClick={handleBalanceClick}
        handleInputChange={handleInputChange}
      />
      <SwapReverse onClick={handleSwapReverse} />
      <ToPanel
        inputValue={swapState.value}
        balanceReadings={
          swapState.mode === 'BAKE' ? breadBalanceReadings : daiBalanceReadings
        }
        tokenType={swapState.mode === 'BAKE' ? 'BREAD' : 'DAI'}
      />
      <div className="w-full px-4 pt-8 pb-12 text-xs text-neutral-300">
        Matic Balance <NativeBalance address={accountAddress} />
      </div>
      {daiAllowanceStatus === 'loading' && <CheckingApproval />}
      {daiAllowanceStatus === 'success' &&
        (() => {
          if (swapState.isContractApproved === null) {
            return null;
          }
          if (swapState.isContractApproved === true) {
            return (
              <BakeOrBurn
                mode={swapState.mode}
                value={swapState.value}
                balanceReadings={
                  swapState.mode === 'BAKE'
                    ? daiBalanceReadings
                    : breadBalanceReadings
                }
                accountAddress={accountAddress}
                chainConfig={chainConfig}
                clearInputValue={clearInputValue}
              />
            );
          }
          return <ApproveContract chainConfig={chainConfig} />;
        })()}

      {transactionDisplay && (
        <Transaction
          status={transactionDisplay.status}
          hash={transactionDisplay.hash}
        />
      )}
    </>
  );
}

export default SwapUI;
