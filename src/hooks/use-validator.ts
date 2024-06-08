import { useEffect, useState } from 'react';
import { ValidatorData } from '../types/validator-data';
import { TimeoutId } from '../types/timeout-id';

export default function useValidator<T>(validatorsData?: ValidatorData<boolean | RegExpMatchArray | null, T>[]) {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>();
  const [errorTimeoutId, setErrorTimeoutId] = useState<TimeoutId>();

  const validateValue = (value: T) => validatorsData
    ? validatorsData.every((validatorData) => {
      if (validatorData.validate(value)) {
        setError(false);
        setErrorText(undefined);
        return true;
      }

      setError(true);
      setErrorText(validatorData.errorText);
      if (validatorData.showErrorTime) {
        setErrorTimeoutId(setTimeout(() => {
          setError(false);
        }, validatorData.showErrorTime));
      }
      return false;
    })
    : true;

  useEffect(() => () => {
    clearTimeout(errorTimeoutId);
  }, [errorTimeoutId]);

  return [error, errorText, validateValue] as const;
}
