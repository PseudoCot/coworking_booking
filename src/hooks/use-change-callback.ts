import { ChangeEvent, useCallback } from 'react';

export default function useInputChangeCallback(setValue: (value: React.SetStateAction<string>) => void) {
  return useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [setValue]);
}
