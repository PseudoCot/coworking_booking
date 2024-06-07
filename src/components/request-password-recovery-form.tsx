import { useState, FormEventHandler, useEffect, ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import { validateEmail as emailValidator } from '../shared/validate-email';
import FormInputGroup from './form-input-group';
import { requestPasswordRecoveryAction } from '../store/api-actions';

export default function RequestPasswordRecoveryForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [email, setEmail, emailError, setEmailError, validateEmail] = useInput<string>(emailValidator, '');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (email && validateEmail()) {
      dispatch(requestPasswordRecoveryAction({
        email
      }));
    }
  };

  useEffect(() => {
    setSubmitEnabled(!!email);
  }, [email]);

  return (
    <form className="password-recovery__form password-recovery-form form" action="#" onSubmit={handleSubmit}>
      <div className="password-recovery-form__wrapper form-wrapper">
        <div className="password-recovery-form__top form-top">
          <h2 className="password-recovery-form__title form-title title-reset">Восстановить пароль</h2>
        </div>
        <div className="password-recovery-form__bottom form-bottom">
          <FormInputGroup groupClasses='password-recovery-form__input-group' labelClasses='password-recovery-form__label' inputClasses='password-recovery-form__input'
            labelText='Укажите почту' name='email' type='email' inputMode='email' autoComplete='email current-login current-email' required
            value={email} onChange={handleEmailChange} showError={emailError} setShowError={setEmailError}
            tooltipClasses='password-recovery-form__tooltip' tooltipText='Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me'
            errorClasses='password-recovery-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <button className="password-recovery-form__submit-btn form-btn light-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Восстановить пароль
          </button>
        </div>
      </div>
    </form>
  );
}
