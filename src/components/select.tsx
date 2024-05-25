import { useState, useRef, useEffect, MouseEventHandler } from 'react';
import { SelectOption as SelectOptionType } from '../types/select-option';
import SelectOption from './select-option';

export type SelectProps = {
  selectClasses?: string;
  placeholderClasses?: string;
  optionListClasses?: string;
  optionClasses?: string;

  placeholder?: string;

  options: SelectOptionType[];
  selectedOption?: SelectOptionType;
  onChange?: (selectedOption: SelectOptionType['value']) => void;
  onClose?: () => void;
};

export default function Select({ selectClasses = '', placeholderClasses = '',
  optionListClasses = '', optionClasses = '', placeholder,
  options, selectedOption, onChange, onClose }: SelectProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };
  const handleOptionClick = (value: SelectOptionType['value']) => {
    setIsOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
        if (isOpen) {
          onClose?.();
        }
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // пустой, чтобы не перепривязывать обработчик при каждом изменении isOpen

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) {
      return;
    }

    const handleEnterKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);

  return (
    <div className={`${selectClasses} select`} ref={rootRef} data-is-active={isOpen}>
      <div className={`${placeholderClasses} select__placeholder`} ref={placeholderRef}
        data-selected={!!selectedOption?.value} onClick={handlePlaceholderClick} role="button" tabIndex={0}
      >
        {selectedOption?.title || placeholder}
      </div>
      {isOpen && (
        <ul className={`${optionListClasses} select__option-list list-reset`}>
          {options.map((option) => (
            <SelectOption
              key={option.value}
              classes={optionClasses}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
