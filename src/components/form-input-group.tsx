import { ChangeEventHandler, useEffect } from 'react';
import TipSVG from './svg/tip';
import { InputMode } from '../types/input-mode';
import { TimeoutId } from '../types/timeout-id';

const ERROR_SHOWING_TIME = 5000;

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
  errorText?: string;
  showError?: boolean;
  setShowError?: (value: boolean) => void;
};

export default function FormInputGroup({ groupClasses = '', labelClasses = '', inputClasses = '',
  tooltipClasses = '', errorClasses = '', required, labelText, name, type, inputMode, autoCapitalize, autoComplete,
  value, onChange: handleChange, tooltipText, errorText, showError, setShowError }: FormInputGroupProps): JSX.Element {

  // исчезновение сообщения об ошибке через некоторое количество секунд
  useEffect(() => {
    let timeoutId: TimeoutId;
    if (errorText && showError && setShowError) {
      timeoutId = setTimeout(() => {
        setShowError(false);
      }, ERROR_SHOWING_TIME);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorText, showError, setShowError]);

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
      {tooltipText &&
        <span className={`${tooltipClasses} cb-form-tooltip`}
          data-tip={tooltipText}
        >
          <TipSVG />
        </span>}
      {errorText &&
        <span className={`${errorClasses} ${showError ? 'cb-form-group-error--active' : ''} cb-form-group-error`}>
          {errorText}
        </span>}
    </div>
  );
}
