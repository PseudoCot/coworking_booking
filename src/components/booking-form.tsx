import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import TimestampSelectGroup from './timestamp-select-group';
import { FIRST_AVAILABLE_HOUR, FIRST_AVAILABLE_MINUTE, PlaceTypeOptions } from '../consts';
import Select from './select';
import { DateTime } from 'luxon';
import { bookCoworkingAction } from '../store/api-actions';
import { getCoworkingId } from '../store/coworking-process/selectors';
import createISODate from '../shared/create-iso-date';

export default function BookingForm(): JSX.Element {
  const today = DateTime.local();
  const currentDate = today.toISODate();
  const nextMonthDate = today.plus({ month: 1 }).toISODate();

  const dispatch = useAppDispatch();
  const coworkingId = useAppSelector(getCoworkingId);

  const [placeType, setPlaceType] = useState<string>();
  const [date, setDate] = useState<string>();
  const [startHour, setStartHour] = useState(FIRST_AVAILABLE_HOUR);
  const [startMinute, setStartMinute] = useState(FIRST_AVAILABLE_MINUTE);
  const [endHour, setEndHour] = useState(FIRST_AVAILABLE_HOUR);
  const [endMinute, setEndMinute] = useState(FIRST_AVAILABLE_MINUTE);

  const selectedPlaceType = PlaceTypeOptions.find((item) => item.value === placeType);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (coworkingId && placeType && date) {
      dispatch(bookCoworkingAction({
        coworkingId: coworkingId,
        placeType: placeType,
        from: createISODate(date, startHour, startMinute),
        to: createISODate(date, endHour, endMinute),
      }));
    }
  };

  useEffect(() => {
    setSubmitEnabled(false);
  }, [placeType, date]);

  return (
    <form className="booking__form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="booking__form-wrapper cb-form-wrapper">
        <div className="booking__form-top cb-form-top">
          <h2 className="booking__form-title cb-form-title title-reset">Форма бронирования</h2>
        </div>
        <div className="booking__form-bottom cb-form-bottom">
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="type">Тип места:</label>
            <Select
              options={PlaceTypeOptions}
              selectedOption={selectedPlaceType}
              onChange={setPlaceType}
            />
          </div>
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="date">Дата:</label>
            <input className="booking__form-input cb-form-input" type="date" name="date" id="booking-date"
              value={date} onChange={(e) => setDate(e.target.value)} min={currentDate} max={nextMonthDate}
            />
          </div>
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="time">Время:</label>
            <TimestampSelectGroup subLabelClasses='booking__form-sub-label' timeGroupClasses='booking__form-time-group'
              timeSelectClasses='booking__form-time-select' selectOptionClasses='booking__form-select-option'
              timesSeparatorClasses='booking__form-time-separator' startHour={startHour} startMinute={startMinute}
              endHour={endHour} endMinute={endMinute} onStartHourChange={setStartHour} onStartMinuteChange={setStartMinute}
              onEndHourChange={setEndHour} onEndMinuteChange={setEndMinute}
            />
          </div>
          <button className="booking__form-submit-btn cb-form-btn cb-light-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Забронировать
          </button>
        </div>
      </div>
    </form>
  );
}
