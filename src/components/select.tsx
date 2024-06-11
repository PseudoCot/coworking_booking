import { useState, useRef, useEffect, MouseEventHandler, KeyboardEventHandler } from 'react';
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
};

export default function Select({ selectClasses = '', placeholderClasses = '',
  optionListClasses = '', optionClasses = '', placeholder,
  options, selectedOption, onChange: handleChange }: SelectProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);

  const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpened((prev) => !prev);
  };
  const handleOptionClick = (value: SelectOptionType['value']) => {
    setIsOpened(false);
    handleChange?.(value);
  };
  const handleEnterKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      setIsOpened((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
        setIsOpened(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty to avoid rebinding the handler every time isMenuOpen is changed

  return (
    // <div className={`${selectClasses} select`} ref={rootRef} data-is-active={isOpened} onClick={handlePlaceholderClick}>
    <div className={`${selectClasses} select`} ref={rootRef} data-is-active={isOpened}>
      <div className={`${placeholderClasses} select-placeholder`} data-selected={!!selectedOption?.value}
        role="button" tabIndex={0} onKeyDown={handleEnterKeyDown} onClick={handlePlaceholderClick}
      >
        {selectedOption?.title || placeholder}
      </div>
      {isOpened && (
        <ul className={`${optionListClasses} select-option-list list-reset`}>
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
