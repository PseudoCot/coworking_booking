import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import TimestampSelectGroup from './timestamp-select-group';
import { AVAILABLE_MINUTES, FIRST_AVAILABLE_HOUR, FIRST_AVAILABLE_MINUTE, FetchingStatuses, PlaceTypeOptions } from '../consts';
import Select from './select';
import { DateTime } from 'luxon';
import { postBookedCoworkingAction } from '../store/api-actions';
import { getCoworkingId } from '../store/coworking-process/selectors';
import createISODate from '../shared/create-iso-date';
import { getBookFetchingStatus } from '../store/booking-process/selectors';
import { resetBookFetchingStatus } from '../store/booking-process/booking-process';
import Loader from './loader';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import generateTimeArray from '../shared/generate-time-array';

const DEFAULT_FIELDS_VALUES = {
  PlaceType: undefined,
  StartHour: FIRST_AVAILABLE_HOUR,
  StartMinute: FIRST_AVAILABLE_MINUTE,
  EndHour: FIRST_AVAILABLE_HOUR,
  EndMinute: FIRST_AVAILABLE_MINUTE,
};

type BookingFormProps = {
  schedule?: ScheduleDto;
};

export default function BookingForm({ schedule }: BookingFormProps): JSX.Element {
  const today = DateTime.local();
  const currentDate = today.toISODate();
  const nextMonthDate = today.plus({ month: 1 }).toISODate();

  const dispatch = useAppDispatch();
  const coworkingId = useAppSelector(getCoworkingId);
  const fetchingStatus = useAppSelector(getBookFetchingStatus);

  const availableHours = schedule && generateTimeArray(+schedule.start_time.substring(0, 2),
    +schedule.end_time.substring(0, 2), 1);

  const [placeType, setPlaceType] = useState<string | number | undefined>(DEFAULT_FIELDS_VALUES.PlaceType);
  const [date, setDate] = useState<string | undefined>(currentDate);
  const [startHour, setStartHour] = useState(availableHours?.[0] ?? DEFAULT_FIELDS_VALUES.StartHour);
  const [startMinute, setStartMinute] = useState(DEFAULT_FIELDS_VALUES.StartMinute);
  const [endHour, setEndHour] = useState(availableHours?.[0] ?? DEFAULT_FIELDS_VALUES.EndHour);
  const [endMinute, setEndMinute] = useState(DEFAULT_FIELDS_VALUES.EndMinute);

  const selectedPlaceType = PlaceTypeOptions.find((item) => item.value === placeType);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (coworkingId && placeType && date) {
      dispatch(postBookedCoworkingAction({
        coworkingId: coworkingId,
        placeType: placeType.toString(),
        from: createISODate(date, startHour, startMinute),
        to: createISODate(date, endHour, endMinute),
      }));
    }
  };

  useEffect(() => {
    setSubmitEnabled(!!placeType);
  }, [placeType]);

  useEffect(() => {
    dispatch(resetBookFetchingStatus());

    return () => {
      dispatch(resetBookFetchingStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (fetchingStatus === FetchingStatuses.Fulfilled) {
      setPlaceType(DEFAULT_FIELDS_VALUES.PlaceType);
      setDate(currentDate);
      setStartHour(DEFAULT_FIELDS_VALUES.StartHour);
      setStartMinute(DEFAULT_FIELDS_VALUES.StartMinute);
      setEndHour(DEFAULT_FIELDS_VALUES.EndHour);
      setEndMinute(DEFAULT_FIELDS_VALUES.EndMinute);
    }
  }, [currentDate, fetchingStatus]);

  return (
    <form className="booking__form form" action="#" onSubmit={handleSubmit}>
      <div className="booking__form-wrapper form-wrapper">
        <div className="booking__form-top form-top">
          <h2 className="booking__form-title form-title title-reset">Форма бронирования</h2>
        </div>
        <div className="booking__form-bottom form-bottom">
          <div className="booking__form-input-group form-input-group form-input-group--required">
            <label className="booking__form-label form-label" htmlFor="type">Тип места</label>
            <Select
              options={PlaceTypeOptions}
              selectedOption={selectedPlaceType}
              onChange={setPlaceType}
            />
          </div>
          <div className="booking__form-input-group form-input-group form-input-group--required">
            <label className="booking__form-label form-label" htmlFor="date">Дата</label>
            <input className="booking__form-input form-input" type="date" name="date" id="booking-date"
              value={date} onChange={(e) => setDate(e.target.value)} min={currentDate} max={nextMonthDate}
            />
          </div>
          <div className="booking__form-input-group form-input-group form-input-group--required">
            <label className="booking__form-label form-label" htmlFor="time">Время</label>
            <TimestampSelectGroup subLabelClasses='booking__form-sub-label' timeGroupClasses='booking__form-time-group'
              timeSelectClasses='booking__form-time-select' selectOptionClasses='booking__form-select-option'
              timesSeparatorClasses='booking__form-time-separator'
              availableHours={availableHours} availableMinutes={AVAILABLE_MINUTES}
              startHour={startHour} startMinute={startMinute} endHour={endHour} endMinute={endMinute}
              onStartHourChange={setStartHour} onStartMinuteChange={setStartMinute}
              onEndHourChange={setEndHour} onEndMinuteChange={setEndMinute}
            />
          </div>
          <button className="booking__form-submit-btn form-btn light-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            {fetchingStatus === FetchingStatuses.Pending ? <Loader alignCenter /> : 'Забронировать'}
          </button>
        </div>
      </div>
    </form>
  );
}
