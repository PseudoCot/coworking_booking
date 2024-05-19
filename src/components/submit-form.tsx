type SubmitFormProps = {
  title: string;
  question: string;
  dismissText: string;
  submitText: string;

  onDismiss: () => void;
  onSubmit: () => void;
};

export default function SubmitForm({ title, question, dismissText, submitText, onDismiss: handleDismiss,
  onSubmit: handleSubmit }: SubmitFormProps): JSX.Element {
  return (
    <div className="submit-form__wrapper">
      <form className="submit-form cb-form" action="#" onSubmit={handleSubmit}>
        <div className="submit-form__top cb-form-top">
          <h2 className="submit-form__title cb-form-title title-reset">{title}</h2>
        </div>
        <div className="submit-form__bottom cb-form-bottom">
          <h3 className="submit-form__sub-title">{question}</h3>
          <div className="submit-form__btns">
            <button className="submit-form__cancel-btn btn-reset" onClick={handleDismiss}>{dismissText}</button>
            <button className="submit-form__submit-btn btn-reset">{submitText}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
