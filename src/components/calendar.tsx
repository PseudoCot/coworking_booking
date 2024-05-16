import { useState } from 'react';
import { DateTime, Interval } from 'luxon';
import classnames from 'classnames';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// const MONTHS = {
//   ''
// }

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
    <div className="calendar-container">
      <div className="calendar-it">
        <div className="calendar-controls">
          <button className="calendar-controls btn-reset" onClick={() => handlePreviousMonthClick()}>
            «
          </button>
          <button className="calendar-controls calendar-controls-today btn-reset" onClick={() => handleResetMonthClick()}>
            {firstDayOfActiveMonth.monthShort} {firstDayOfActiveMonth.year}
          </button>
          <button className="calendar-controls btn-reset" onClick={() => handleNextMonthClick()}>
            »
          </button>
        </div>
        <div className="calendar-weeks-grid">
          {WEEKDAYS.map((weekDay) => (
            <div key={weekDay} className="calendar-weeks-grid-cell">
              {weekDay}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {daysOfMonth.map((dayOfMonth) => (
            <button
              key={`${dayOfMonth.day}/${dayOfMonth.month}`}
              className={classnames({
                'calendar-grid-cell': true,
                'calendar-grid-cell-inactive': dayOfMonth.month !== firstDayOfActiveMonth.month,
                'calendar-grid-cell-active': activeDay?.toISODate() === dayOfMonth.toISODate(),
              })}
              onClick={() => setActiveDay(dayOfMonth)}
            >
              {dayOfMonth.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
