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
  textarea?: boolean;
  adminFormStyles?: boolean;

  labelText: string;
  name: string;
  type: string;
  inputMode?: InputMode;
  autoCapitalize?: string;
  autoComplete?: string;

  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  tooltipText?: string;
  errorText?: string;
  showError?: boolean;
  setShowError?: (value: boolean) => void;
};

export default function FormInputGroup({ groupClasses = '', labelClasses = '', inputClasses = '', tooltipClasses = '',
  errorClasses = '', required, textarea, adminFormStyles, labelText, name, type, inputMode, autoCapitalize, autoComplete,
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
    <div className={`${groupClasses} ${adminFormStyles ? 'admin-form-input-group' : 'form-group'} ${required ? 'form-group--required' : ''}`}>
      <label className={`${labelClasses} ${adminFormStyles ? 'admin-form-label' : 'form-label'}`} htmlFor={name}>{labelText}</label>
      {textarea
        ?
        <textarea className={`${inputClasses} ${adminFormStyles ? 'admin-form-textarea' : 'form-textarea'}`}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
        />
        :
        <input className={`${inputClasses} ${adminFormStyles ? 'admin-form-input' : 'form-input'}`}
          type={type}
          name={name}
          id={name}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
        />}
      {tooltipText &&
        <span className={`${tooltipClasses} form-tooltip`}
          data-tip={tooltipText}
        >
          <TipSVG />
        </span>}
      {errorText &&
        <span className={`${errorClasses} ${showError ? 'form-group-error--active' : ''} form-group-error`}>
          {errorText}
        </span>}
    </div>
  );
}
