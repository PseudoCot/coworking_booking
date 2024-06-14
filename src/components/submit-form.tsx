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
    <div className="submit-form-wrapper">
      <form className="submit-form form" action="#" onSubmit={handleSubmit}>
        <div className="submit-form-top form-top">
          <h2 className="submit-form-title form-title title-reset">{title}</h2>
        </div>
        <div className="submit-form-bottom form-bottom">
          <h3 className="submit-form-question">{question}</h3>
          <div className="submit-form-btns">
            <button className="submit-form-submit-btn light-btn btn-reset">{submitText}</button>
            <button className="submit-form-cancel-btn light-btn btn-reset" onClick={handleDismiss}>{dismissText}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
