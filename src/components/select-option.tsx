import { useRef, useEffect, MouseEvent } from 'react';
import { SelectOption as SelectOptionType } from '../types/select-option';
import classNames from 'classnames';
import WhiteCheckmark from './svg/white-checkmark';

export type SelectOptionProps<V> = {
  optionClasses?: string;
  optionToggleClasses?: string;

  adminStyles?: boolean;

  option: SelectOptionType<V>;
  toggled?: boolean;
  onClick: (value: SelectOptionType<V>['value']) => void;
  onToggle?: (value: SelectOptionType<V>['value']) => void;
};

export default function SelectOption<V = string | number>({ optionClasses = '', optionToggleClasses = '', adminStyles = false,
  option: { value, title }, toggled, onClick: handleClick, onToggle: handleToggle }: SelectOptionProps<V>): JSX.Element {
  const optionRef = useRef<HTMLLIElement>(null);

  const handleToggleClick = (e: MouseEvent, newValue: V) => {
    e.preventDefault();
    e.stopPropagation();

    handleToggle?.(newValue);
  };

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
    <li className={`${optionClasses} ${adminStyles ? 'admin-select-option' : 'select-option'}`} ref={optionRef}
      onClick={() => handleClick(value)} tabIndex={0}
    >
      {title}
      {handleToggle &&
        <button className={classNames(optionToggleClasses, 'btn-reset', {
          'admin-select-option-toggle': adminStyles,
          'select-option-toggle': !adminStyles,
          'admin-select-option-toggle--toggled': adminStyles && toggled,
          'select-option-toggle--toggled': !adminStyles && toggled,
        })} onClick={(e) => handleToggleClick(e, value)}
        >
          {toggled &&
            <WhiteCheckmark classes={`${adminStyles ? 'admin-select-option-toggle-icon' : 'select-option-toggle-icon'}`} />}
        </button>}
    </li>
  );
}
