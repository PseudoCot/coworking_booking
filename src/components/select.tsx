import { useState, useRef, useEffect, MouseEventHandler, KeyboardEventHandler, Key } from 'react';
import { SelectOption as SelectOptionType } from '../types/select-option';
import SelectOption from './select-option';
import { OptionToggles } from '../types/option-toggles';

export type SelectProps<V> = {
  selectClasses?: string;
  placeholderClasses?: string;
  optionListClasses?: string;
  optionClasses?: string;
  optionToggleClasses?: string;

  adminStyles?: boolean;
  placeholder?: string;

  options: SelectOptionType<V>[];
  selectedOption?: SelectOptionType<V>;
  optionToggles?: OptionToggles;
  onChange?: (selectedOption: SelectOptionType<V>['value']) => void;
  onToggle?: (selectedOption: SelectOptionType<V>['value']) => void;
};

export default function Select<V extends Key = string | number>({ selectClasses = '', placeholderClasses = '',
  optionListClasses = '', optionClasses = '', optionToggleClasses = '', adminStyles = false, placeholder,
  options, selectedOption, optionToggles, onChange: handleChange, onToggle: handleOptionToggle }: SelectProps<V>): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  const [isOpened, setIsOpened] = useState(false);

  const handlePlaceholderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpened((prev) => !prev);
  };
  const handleOptionClick = (value: SelectOptionType<V>['value']) => {
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
    <div className={`${selectClasses} ${adminStyles ? 'admin-select' : 'select'}`} ref={rootRef} data-is-active={isOpened}>
      <div className={`${placeholderClasses} ${adminStyles ? 'admin-select-placeholder' : 'select-placeholder'}`}
        data-selected={!!selectedOption?.value} role="button" tabIndex={0}
        onKeyDown={handleEnterKeyDown} onClick={handlePlaceholderClick}
      >
        {selectedOption?.title || placeholder}
      </div>
      {isOpened && (
        <ul className={`${optionListClasses} ${adminStyles ? 'admin-select-option-list' : 'select-option-list'} list-reset`}>
          {options.map((option) => (
            <SelectOption<V>
              key={option.value}
              optionClasses={optionClasses}
              optionToggleClasses={optionToggleClasses}
              adminStyles={adminStyles}
              option={option}
              toggled={optionToggles?.[option.value]}
              onClick={handleOptionClick}
              onToggle={handleOptionToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
