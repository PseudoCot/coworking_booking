import { useState } from 'react';

export default function useInput(validationChecker: (value: string) => boolean | RegExpMatchArray | null, initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const processValueValidation = () => {
    const isValueCorrect = validationChecker(value);
    setError(!!isValueCorrect);
    return !!isValueCorrect;
  };
  return [value, setValue, error, processValueValidation] as const;
}
