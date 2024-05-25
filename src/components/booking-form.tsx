import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import TimestampSelectGroup from './timestamp-select-group';
import { FIRST_AVAILABLE_HOUR, FIRST_AVAILABLE_MINUTE, PlaceTypeOptions } from '../consts';
import Select from './select';

export default function BookingForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [placeType, setPlaceType] = useState('');
  const [date, setDate] = useState('');
  const [startHour, setStartHour] = useState(FIRST_AVAILABLE_HOUR);
  const [startMinute, setStartMinute] = useState(FIRST_AVAILABLE_MINUTE);
  const [endHour, setEndHour] = useState(FIRST_AVAILABLE_HOUR);
  const [endMinute, setEndMinute] = useState(FIRST_AVAILABLE_MINUTE);

  const selectedPlaceType = PlaceTypeOptions.find((item) => item.value === placeType);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    // dispatch(bookAction({
    //   seatType,
    //   date,
    //   startTime,
    //   endTime,
    // }));
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
              selectClasses=''
              placeholderClasses=''
              optionListClasses=''
              optionClasses=''
              options={PlaceTypeOptions}
              selectedOption={selectedPlaceType}
              onChange={setPlaceType}
            />
          </div>
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="date">Дата:</label>
            <input className="booking__form-input cb-form-input" type="date" name="date" id="booking-date" />
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
