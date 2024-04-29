import { useState } from 'react';

export default function useInput(validationChecker: (value: string) => boolean | RegExpMatchArray | null, errorMessage = '') {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const processValueValidation = () => {
    const isValueCorrect = validationChecker(value);
    setValueError(isValueCorrect ? '' : errorMessage);
    return !!isValueCorrect;
  };
  return [value, setValue, valueError, processValueValidation] as const;
}
