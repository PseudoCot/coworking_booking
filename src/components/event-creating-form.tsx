import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { validateStringsLength } from '../shared/validate-strings-length';
import { postCoworkingEventAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import { DateTime } from 'luxon';
import useInputChangeCallback from '../hooks/use-change-callback';

type EventCreatingFormProps = {
  coworkingId: string;
};

export default function EventCreatingForm({ coworkingId }: EventCreatingFormProps): JSX.Element {
  const today = DateTime.local();
  const currentDate = today.toISODate();
  const nextMonthDate = today.plus({ month: 3 }).toISODate();

  const dispatch = useAppDispatch();

  const [date, setDate] = useState<string>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = useInputChangeCallback(setName);
  const handleDescriptionChange = useInputChangeCallback(setDescription);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (date) {
      dispatch(postCoworkingEventAction({
        coworkingId: coworkingId,
        event: {
          date: date,
          name,
          description
        }
      }));
    }
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([date, name, description]));
  }, [date, name, description]);

  return (
    <form className="event-form admin-form" action="#" onSubmit={handleSubmit}>
      <div className="event-form__wrapper admin-form-wrapper">
        <div className="event-form__top admin-form-top">
          <h2 className="event-form__title admin-form-title title-reset">Добавление мероприятия</h2>
        </div>
        <div className="event-form__bottom admin-form-bottom">
          <div className="event-form__date-input-group admin-form-input-group form-input-group--required">
            <label className="event-form__date-label admin-form-label" htmlFor="date">Дата</label>
            <input className="event-form__date-input admin-form-input" type="date" name="date" id="event-date"
              value={date} onChange={(e) => setDate(e.target.value)} min={currentDate} max={nextMonthDate}
            />
          </div>
          <FormInputGroup groupClasses='event-form__input-group' labelClasses='event-form__label' inputClasses='event-form__input'
            labelText='Название' name='event-name' type='text' autoComplete='event-name' adminFormStyles required
            value={name} onChange={handleNameChange}
          />
          <FormInputGroup groupClasses='event-form__input-group' labelClasses='event-form__label' inputClasses='event-form__input'
            labelText='Описание' name='description' type='text' adminFormStyles textarea
            value={description} onChange={handleDescriptionChange}
          />
          <button className="event-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
