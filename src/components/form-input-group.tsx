import { ChangeEventHandler } from 'react';
import TipSVG from './svg/tip';
import { InputMode } from '../types/input-mode';

type FormInputGroupProps = {
  groupClasses?: string;
  labelClasses?: string;
  inputClasses?: string;
  tooltipClasses?: string;
  errorClasses?: string;

  required?: boolean;

  labelText: string;
  name: string;
  type: string;
  inputMode?: InputMode;
  autoCapitalize?: string;
  autoComplete?: string;

  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;

  tooltipText?: string;
  showError?: boolean;
  errorText?: string;
};

export default function FormInputGroup({ groupClasses = '', labelClasses = '', inputClasses = '',
  tooltipClasses = '', errorClasses = '', required, labelText, name, type, inputMode, autoCapitalize, autoComplete,
  value, onChange: handleChange, tooltipText, showError, errorText }: FormInputGroupProps): JSX.Element {
  return (
    <div className={`${groupClasses} cb-form-group ${required ? 'cb-form-group--required' : ''}`}>
      <label className={`${labelClasses} cb-form-label`} htmlFor={name}>{labelText}</label>
      <input className={`${inputClasses} cb-form-input`}
        type={type}
        name={name}
        id={name}
        inputMode={inputMode}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        value={value}
        onChange={handleChange}
      />
      {tooltipText ??
        <span className={`${tooltipClasses} cb-form-tooltip`}
          data-tip={tooltipText}
        >
          <TipSVG />
        </span>}
      {showError &&
        <span className={`${errorClasses} cb-form-group-error`}
          data-tip={errorText}
        />}
    </div>
  );
}
