import { useState, FormEventHandler, useEffect, ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../hooks';
import useInput from '../hooks/use-input';
import emailValidationChecker from '../shared/email-validation-checker';
import FormInputGroup from './form-input-group';
import { changePasswordAction } from '../store/api-actions';

export default function InputEmailForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [email, setEmail, emailError, setEmailError, checkEmailValidity] = useInput(emailValidationChecker);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (checkEmailValidity()) {
      dispatch(changePasswordAction(email));
    }
  };

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [setEmail]);

  useEffect(() => {
    setSubmitEnabled(!!email);
  }, [email]);

  return (
    <form className="new-password__form new-password-form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="new-password-form__wrapper cb-form-wrapper">
        <div className="new-password-form__top cb-form-top">
          <h2 className="new-password-form__title cb-form-title title-reset">Восстановить пароль</h2>
        </div>
        <div className="new-password-form__bottom cb-form-bottom">
          <FormInputGroup groupClasses='new-password-form__input-group' labelClasses='new-password-form__label' inputClasses='new-password-form__input'
            labelText='Укажите почту' name='email' type='text' inputMode='email' autoComplete='email current-login current-email' required
            value={email} onChange={handleEmailChange} showError={emailError} setShowError={setEmailError}
            tooltipClasses='new-password-form__tooltip' tooltipText='Используйте адрес электронной почты, который содержит домен urfu.ru или ufru.me'
            errorClasses='new-password-form__group-error' errorText='Адрес электронной почты не соответствует домену urfu.ru или ufru.me'
          />
          <button className="new-password-form__set-password-btn cb-form-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Восстановить пароль
          </button>
        </div>
      </div>
    </form>
  );
}
