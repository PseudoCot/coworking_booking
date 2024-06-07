import { useState } from 'react';

type Validator<T> = (value: T) => boolean | RegExpMatchArray | null;

export default function useInput<T>(validator: Validator<T>, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const validateValue = () => {
    const isValueCorrect = validator(value);
    setError(!isValueCorrect);
    return !!isValueCorrect;
  };

  return [value, setValue, error, setError, validateValue] as const;
}
