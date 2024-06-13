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
  min?: number;
  max?: number;
  step?: number;
  minLenght?: number;
  maxLenght?: number;

  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  tooltipText?: string;
  errorText?: string;
  showError?: boolean;
  setShowError?: (value: boolean) => void;
};

export default function FormInputGroup({ groupClasses = '', labelClasses = '', inputClasses = '', tooltipClasses = '',
  errorClasses = '', required, textarea, adminFormStyles, labelText, name, type, inputMode, autoCapitalize, autoComplete,
  min, max, step, value, minLenght, maxLenght, tooltipText, errorText, showError, onChange: handleChange,
  setShowError }: FormInputGroupProps): JSX.Element {

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
    <div className={`${groupClasses} ${adminFormStyles ? 'admin-form-input-group' : 'form-input-group'}
      ${required ? 'form-input-group--required' : ''}`}
    >
      <label className={`${labelClasses} ${adminFormStyles ? 'admin-form-label' : 'form-label'}`} htmlFor={name}>
        {labelText}
      </label>

      {textarea
        ?
        <textarea className={`${inputClasses} ${adminFormStyles ? 'admin-form-textarea' : 'form-textarea'}`}
          name={name}
          id={name}
          minLength={minLenght}
          maxLength={maxLenght}
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
          min={min}
          max={max}
          step={step}
          minLength={minLenght}
          maxLength={maxLenght}
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
        <span className={`${errorClasses} ${showError ? 'form-input-group-error--active' : ''} form-input-group-error`}>
          {errorText}
        </span>}
    </div>
  );
}
