import getDaysInMonth from './get-days-in-month';

export type DateObject = {
  date: number;
  month: number;
  year: number;
  jsDate: string;
}

const getDateObject = (date: number, month: number, year: number): DateObject => ({
  date,
  month,
  year,
  jsDate: new Date(year, month, date).toLocaleString(),
});

export type CalendarData = {
  startingDay: number;
  month: number;
  year: number;
  previousMonth: number;
  previousYear: number;
  nextMonth: number;
  nextYear: number;
  calendarDates: DateObject[][];
}

function checkStartingDate(data: CalendarData) {
  const { startingDay, month, previousMonth, previousYear, nextMonth, nextYear, calendarDates } = data;

  if (startingDay > 0 && startingDay < 7) {
    const dates = [];
    const newWeek = calendarDates[0].slice(0, startingDay);
    const loopLength = 7 - newWeek.length;

    if (newWeek[0].month !== month) {
      for (let i = 0; i < loopLength; i += 1) {
        newWeek.unshift(getDateObject(newWeek[0].date - 1, newWeek[0].month, newWeek[0].year));
      }
    } else {
      const previousMonthDays = getDaysInMonth(previousYear, previousMonth);
      for (let i = 0; i < loopLength; i += 1) {
        newWeek.unshift(getDateObject(previousMonthDays - i, previousMonth, previousYear));
      }
    }

    dates.push(newWeek);

    calendarDates.forEach((each, i) => {
      const cloneWeek = [...each];
      cloneWeek.splice(0, startingDay);
      let slice: DateObject[] = [];

      if (i + 1 < calendarDates.length) {
        slice = calendarDates[i + 1].slice(0, startingDay);
      }

      cloneWeek.push(...slice);
      dates.push(cloneWeek);
    });

    const lastIndex = dates.length - 1;

    if (dates[lastIndex].length < 7) {
      const leftOverDay = 7 - dates[lastIndex].length;
      const lastWeek = dates[lastIndex];

      if (lastWeek[lastWeek.length - 1].month !== month) {
        for (let i = 0; i < leftOverDay; i += 1) {
          dates[lastIndex].push(getDateObject(lastWeek[lastWeek.length - 1].date + 1, nextMonth, nextYear));
        }
      } else {
        for (let i = 0; i < leftOverDay; i += 1) {
          dates[lastIndex].push(getDateObject(i + 1, nextMonth, nextYear));
        }
      }
    }

    return dates;
  }

  return calendarDates;
}

export default function generateDates(data: Partial<{ year: number; month: number; startingDay: number }> = {}) {
  const presentDay = new Date();
  const {
    year = presentDay.getFullYear(),
    month = presentDay.getMonth(),
    startingDay = 0
  } = data;

  const previousYear = month === 0 ? year - 1 : year;
  const previousMonth = month === 0 ? 11 : month - 1;
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const calendarDates = [];
  const firstDay = (new Date(year, month)).getDay(); // 0 = 'Sunday', 6 = 'Saturday'
  const days = getDaysInMonth(year, month); // how many days in a month

  let x = 0;
  for (let i = 0; i < days; i += 1) {
    if (calendarDates.length === 0) {
      calendarDates.push([]);

      if (firstDay !== 0) {
        for (let y = 0; y < firstDay; y += 1) {
          const previousMonthDays = getDaysInMonth(previousYear, previousMonth);
          calendarDates[x].unshift(getDateObject(previousMonthDays - y, previousMonth, previousYear));
        }

        calendarDates[x].push(getDateObject(i + 1, month, year));
      } else {
        calendarDates[x].push(getDateObject(i + 1, month, year));
      }
    } else if (calendarDates.length !== 0) {
      if (calendarDates[x].length < 7) {
        calendarDates[x].push(getDateObject(i + 1, month, year));
      } else {
        calendarDates.push([getDateObject(i + 1, month, year)]);
        x += 1;
      }
    }
  }

  const lastIndex = calendarDates.length - 1;

  if (calendarDates[lastIndex].length < 7) {
    const leftOverDay = 7 - calendarDates[lastIndex].length;
    for (let i = 0; i < leftOverDay; i += 1) {
      calendarDates[lastIndex].push(getDateObject(i + 1, nextMonth, nextYear));
    }
  }

  const dates = checkStartingDate({ startingDay, month, year, previousMonth, previousYear, nextMonth, nextYear, calendarDates });

  const filterFirstWeekDates = dates[0].filter((each) => each.month === month);

  if (filterFirstWeekDates.length === 0) {
    dates.splice(0, 1);
  }

  const lastWeekIndex = dates.length - 1;
  const filterLasttWeekDates = dates[lastWeekIndex].filter((each) => each.month === month);

  if (filterLasttWeekDates.length === 0) {
    dates.splice(lastWeekIndex, 1);
  }

  return {
    dates,
    previousYear,
    previousMonth,
    nextYear,
    nextMonth,
  };
}
