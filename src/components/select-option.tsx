import { useRef, useEffect } from 'react';
import { SelectOption as SelectOptionType } from '../types/select-option';

export type SelectOptionProps = {
  classes: string;

  option: SelectOptionType;
  onClick: (value: SelectOptionType['value']) => void;
};

export default function SelectOption({ classes = '', option: { value, title }, onClick: handleClick }: SelectOptionProps): JSX.Element {
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const option = optionRef.current;
    if (!option) {
      return;
    }

    const handleEnterKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === option && e.key === 'Enter') {
        handleClick(value);
      }
    };

    option.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      option.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [value, handleClick]);

  return (
    <li className={`${classes} select__option`} ref={optionRef}
      value={value} onClick={() => handleClick(value)} tabIndex={0}
    >
      {title}
    </li>
  );
}
