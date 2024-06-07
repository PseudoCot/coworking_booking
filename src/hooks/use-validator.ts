import { useState } from 'react';
import { Validator } from '../types/validator';

// const ERROR_SHOWING_TIME = 5000;

export default function useValidator<T>(validate: Validator<boolean, T>) {
  const [error, setError] = useState(false);

  const validateValue = (value: T) => {
    const isValueCorrect = validate(value);
    setError(!isValueCorrect);
    return !!isValueCorrect;
  };

  // const [errorTimeoutId, setErrorTimeoutId] = useState<TimeoutId>();
  // setFilesError(true);
  // setErrorTimeoutId(setTimeout(() => {
  //   setFilesError(false);
  // }, ERROR_SHOWING_TIME));
  // useEffect(() => () => {
  //   clearTimeout(errorTimeoutId);
  // }, [errorTimeoutId]);

  return [error, setError, validateValue] as const;
}
