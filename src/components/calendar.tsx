import { useEffect, useState } from 'react';
import { DateTime, Interval } from 'luxon';
import classnames from 'classnames';
import HingeSVG from './svg/hinge';
import TimestampSelectGroup from './timestamp-select-group';
import { FIRST_AVAILABLE_HOUR, FIRST_AVAILABLE_MINUTE } from '../consts';
import { useAppDispatch } from '../hooks';
import { fetchCoworkingsByTimestampAction } from '../store/api-actions';
import createISODate from '../shared/create-iso-date';

// const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] as const;
const MONTHS = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
  'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'] as const;
const HOLIDAYS = [[1, 2, 3, 4, 5, 6, 7, 8], [23], [8], [], [1, 9], [12], [], [], [], [], [4], [31]];

// export type CalendarProps = {

// };

export default function Calendar(): JSX.Element {
  const dispatch = useAppDispatch();

  const today = DateTime.local();
  const [selectedDayISOFormat, setSelectedDayISOFormat] = useState('');
  const [selectedDay, setSelectedDay] = useState<DateTime>();
  const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(today.startOf('month'));
  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  )
    .splitBy({ day: 1 })
    .map((day) => day.start) as DateTime[];

  const [startHour, setStartHour] = useState(FIRST_AVAILABLE_HOUR);
  const [startMinute, setStartMinute] = useState(FIRST_AVAILABLE_MINUTE);
  const [endHour, setEndHour] = useState(FIRST_AVAILABLE_HOUR);
  const [endMinute, setEndMinute] = useState(FIRST_AVAILABLE_MINUTE);

  const handlePreviousMonthClick = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({ month: 1 }));
  };
  const handleNextMonthClick = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({ month: 1 }));
  };
  const handleResetMonthClick = () => {
    setFirstDayOfActiveMonth(today.startOf('month'));
  };

  const handleCalendarDayClick = (dayOfMonth: DateTime<true>, isDayHoliday: boolean, isDayInactive: boolean) => {
    if (isDayHoliday || isDayInactive) {
      return;
    }

    setSelectedDayISOFormat(dayOfMonth.toISODate());
    setSelectedDay(dayOfMonth);
  };

  useEffect(() => {
    if (selectedDay) {
      const selectedDate = selectedDay.toISODate() as string;
      dispatch(fetchCoworkingsByTimestampAction({
        from: createISODate(selectedDate, startHour, startMinute),
        to: createISODate(selectedDate, endHour, endMinute),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, endHour, endMinute]);

  return (
    <div className="calendar__self">
      <div className="calendar__self-controls">
        <button className="calendar__self-controls-left-btn btn-reset" onClick={() => handlePreviousMonthClick()} />
        <h2 className="calendar__self-controls-month-title title-reset">
          {MONTHS[firstDayOfActiveMonth.month - 1]} {firstDayOfActiveMonth.year}
        </h2>
        <button className="calendar__self-controls-right-btn btn-reset" onClick={() => handleNextMonthClick()} />
        <button className="calendar__self-controls-reset-btn btn-reset" onClick={() => handleResetMonthClick()}>
          <HingeSVG />
        </button>
      </div>
      <div className="calendar__self-grid">
        {/* {WEEKDAYS.map((weekDay) => (
          <div key={weekDay} className="calendar__self-grid-weekday-cell">
            {weekDay}
          </div>
        ))} */}
        {daysOfMonth.map((dayOfMonth, index) => {
          const dayISOFormat = dayOfMonth.toISODate();
          const isDayHoliday = HOLIDAYS[dayOfMonth.month - 1].includes(dayOfMonth.day);
          const isDayInactive = dayOfMonth.month !== firstDayOfActiveMonth.month;
          return (
            <button
              key={`${dayOfMonth.day}/${dayOfMonth.month}`}
              className={classnames('calendar__self-grid-cell btn-reset', {
                'calendar__self-grid-cell--inactive': isDayInactive,
                'calendar__self-grid-cell--selected': dayISOFormat === selectedDay?.toISODate() && !isDayInactive,
                'calendar__self-grid-cell--current': dayISOFormat === today.toISODate(),
              })}
              onClick={() => handleCalendarDayClick(dayOfMonth, isDayHoliday, isDayInactive)}
            >
              <div className="calendar__self-grid-cell-top">
                {(dayOfMonth.day === 1 || index === 0) &&
                  <span className='calendar__self-grid-cell-month'>{MONTHS[dayOfMonth.month - 1]}</span>}
                <span className={classnames({ 'calendar__self-grid-cell-holiday': isDayHoliday })}>
                  {dayOfMonth.day}
                </span>
              </div>
              <div className="calendar__self-grid-cell-bottom">
                {isDayHoliday &&
                  <div className="calendar__self-grid-cell-message">Нет доступных слотов<br /> для бронирования</div>}
                {dayISOFormat === selectedDayISOFormat &&
                  <TimestampSelectGroup subLabelClasses='calendar__form-sub-label' timeGroupClasses='calendar__form-time-group'
                    timeSelectClasses='calendar__form-time-select' selectOptionClasses='calendar__form-select-option'
                    timesSeparatorClasses='calendar__form-time-separator' startHour={startHour} startMinute={startMinute}
                    endHour={endHour} endMinute={endMinute} onStartHourChange={setStartHour} onStartMinuteChange={setStartMinute}
                    onEndHourChange={setEndHour} onEndMinuteChange={setEndMinute}
                  />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
