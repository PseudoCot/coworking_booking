import { useState } from 'react';
import { DateTime, Interval } from 'luxon';
import classnames from 'classnames';

// const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] as const;
const MONTHS = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
  'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'] as const;
const HOLIDAYS = [[1, 2, 3, 4, 5, 6, 7, 8], [23], [8], [], [1, 9], [12], [], [], [], [], [4], [31]];

// export type CalendarProps = {

// };

export default function Calendar(): JSX.Element {
  const today = DateTime.local();
  const [activeDay, setActiveDay] = useState<DateTime>();
  const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(today.startOf('month'));
  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  )
    .splitBy({ day: 1 })
    .map((day) => day.start) as DateTime[];

  const handlePreviousMonthClick = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({ month: 1 }));
  };
  const handleNextMonthClick = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({ month: 1 }));
  };
  const handleResetMonthClick = () => {
    setFirstDayOfActiveMonth(today.startOf('month'));
  };

  return (
    <div className="calendar__self">
      <div className="calendar__self-controls">
        <button className="calendar__self-controls-left-btn btn-reset" onClick={() => handlePreviousMonthClick()} />
        <button className="calendar__self-controls-today-btn btn-reset" onClick={() => handleResetMonthClick()}>
          {MONTHS[firstDayOfActiveMonth.month - 1]} {firstDayOfActiveMonth.year}
        </button>
        <button className="calendar__self-controls-right-btn btn-reset" onClick={() => handleNextMonthClick()} />
      </div>
      <div className="calendar__self-grid">
        {/* {WEEKDAYS.map((weekDay) => (
          <div key={weekDay} className="calendar__self-grid-weekday-cell">
            {weekDay}
          </div>
        ))} */}
        {daysOfMonth.map((dayOfMonth, index) => {
          const isDayHoliday = HOLIDAYS[dayOfMonth.month - 1].includes(dayOfMonth.day);
          return (
            <button
              key={`${dayOfMonth.day}/${dayOfMonth.month}`}
              className={classnames('calendar__self-grid-cell btn-reset', {
                'calendar__self-grid-cell--inactive': dayOfMonth.month !== firstDayOfActiveMonth.month,
                'calendar__self-grid-cell--active': dayOfMonth.toISODate() === activeDay?.toISODate(),
              })}
              onClick={() => setActiveDay(dayOfMonth)}
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
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
