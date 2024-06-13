/* eslint-disable camelcase */
import { useState, FormEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postCoworkingScheduleAction } from '../store/api-actions';
import { WeekdayOptions } from '../consts';
import Select from './select';
import TimestampSelectGroup from './timestamp-select-group';
import { getCoworkingSchedule } from '../store/coworking-process/selectors';
import getScheduleOrDefault from '../shared/get-schedule-or-default';
import { WeekdayNumber } from '../types/weekday';
import { OptionToggles } from '../types/option-toggles';
import { ScheduleDto } from '../types/api-shared/schedule-dto';

type ScheduleEditingFormProps = {
  coworkingId: string;
};

export default function ScheduleEditingForm({ coworkingId }: ScheduleEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const scheduleData = useAppSelector(getCoworkingSchedule);
  const [newSchedule, setNewSchedule] = useState(scheduleData ?? []);

  const [selectedWeekday, setSelectedWeekday] = useState<number>(scheduleData?.[0].week_day ?? 0);
  const selectedWeekdayOption = WeekdayOptions.find((item) => item.value === selectedWeekday);

  const optionToggles = scheduleData?.reduce((res, elem) => {
    res[elem.week_day as number] = true;
    return res;
  }, {} as OptionToggles);
  const [weekdayToggles, setWeekdayToggles] = useState<OptionToggles>(optionToggles ?? {});

  const [firstStartHour, firstStartMinute, firstEndHour, firstEndMinute] = getScheduleOrDefault(scheduleData?.[selectedWeekday]);
  const [startHour, setStartHour] = useState(firstStartHour);
  const [startMinute, setStartMinute] = useState(firstStartMinute);
  const [endHour, setEndHour] = useState(firstEndHour);
  const [endMinute, setEndMinute] = useState(firstEndMinute);

  const updateWeekdaySchedule = (schedule: ScheduleDto[]) => {
    schedule[selectedWeekday] = {
      coworking_id: coworkingId,
      week_day: selectedWeekday as WeekdayNumber,
      start_time: `${startHour}:${startMinute}:00`,
      end_time: `${endHour}:${endMinute}:00`,
    };
  };

  const handleWeekdayChange = (weekday: number) => {
    const temp = [...newSchedule];
    updateWeekdaySchedule(temp);
    setNewSchedule(temp);

    const [newStartHour, newStartMinute, newEndHour, newEndMinute] = getScheduleOrDefault(newSchedule?.[weekday]);
    setStartHour(newStartHour);
    setStartMinute(newStartMinute);
    setEndHour(newEndHour);
    setEndMinute(newEndMinute);

    setSelectedWeekday(weekday);
  };

  const handleWeekdayToggle = (weekday: number) => {
    const temp = { ...weekdayToggles };
    temp[weekday] = !temp[weekday];
    setWeekdayToggles(temp);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    updateWeekdaySchedule(newSchedule);

    dispatch(postCoworkingScheduleAction({
      coworkingId: coworkingId,
      schedules: newSchedule.filter((elem) => weekdayToggles[elem.week_day])
    }));
  };

  return (
    <form className="event-form admin-form" action="#" onSubmit={handleSubmit}>
      <div className="event-form__wrapper admin-form-wrapper">
        <div className="event-form__top admin-form-top">
          <h2 className="event-form__title admin-form-title title-reset">Режим работы</h2>
        </div>
        <div className="event-form__bottom admin-form-bottom">
          <div className="event-form__input-group admin-form-input-group">
            <label className="event-form__label admin-form-label" htmlFor="type">День недели</label>
            <Select
              selectClasses='event-form__date-select'
              adminStyles
              options={WeekdayOptions}
              selectedOption={selectedWeekdayOption}
              optionToggles={weekdayToggles}
              onChange={handleWeekdayChange}
              onToggle={handleWeekdayToggle}
            />
          </div>
          <TimestampSelectGroup subLabelClasses='event-form__sub-label' timeGroupClasses='event-form__time-group'
            timeSelectClasses='event-form__time-select' selectOptionClasses='event-form__select-option'
            timesSeparatorClasses='event-form__time-separator' adminStyles
            startLabel='Время начала работы' endLabel='Время окончания работы'
            startHour={startHour} startMinute={startMinute} endHour={endHour} endMinute={endMinute}
            onStartHourChange={setStartHour} onStartMinuteChange={setStartMinute}
            onEndHourChange={setEndHour} onEndMinuteChange={setEndMinute}
          />
          <button className="event-form__submit-btn admin-form-btn white-btn btn-reset" type='submit'>
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
