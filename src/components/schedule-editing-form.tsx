/* eslint-disable camelcase */
import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { postCoworkingScheduleAction } from '../store/api-actions';
import { FetchingStatuses, WeekdayOptions } from '../consts';
import Select from './select';
import TimestampSelectGroup from './timestamp-select-group';
import getScheduleOrDefault from '../shared/get-schedule-or-default';
import { WeekdayNumber } from '../types/weekday';
import { OptionToggles } from '../types/option-toggles';
import { ScheduleDto } from '../types/api-shared/schedule-dto';
import sortedArrayByElementField from '../shared/sorted-array-by-element-field';
import { useAdminFetchingStatus } from '../hooks/use-admin-fetching-status';
import Loader from './loader';
import { resetAdminFetchingStatus } from '../store/admin-process/admin-process';

type ScheduleEditingFormProps = {
  coworkingId: string;
  schedule?: ScheduleDto[];

  onSubmit: () => void;
  onCancel: () => void;
};

export default function ScheduleEditingForm({ coworkingId, schedule, onSubmit: handleSubmit,
  onCancel: handleCancel }: ScheduleEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAdminFetchingStatus('scheduleEditingFetchingStatus');

  const [newSchedule, setNewSchedule] = useState(schedule ? sortedArrayByElementField<ScheduleDto>(schedule, 'week_day') : []);

  const [selectedWeekday, setSelectedWeekday] = useState<number>(schedule?.[0]?.week_day ?? 0);
  const selectedWeekdayOption = WeekdayOptions.find((item) => item.value === selectedWeekday);

  const optionToggles = schedule?.reduce((res, elem) => {
    res[elem.week_day as number] = true;
    return res;
  }, {} as OptionToggles);
  const [weekdayToggles, setWeekdayToggles] = useState<OptionToggles>(optionToggles ?? {});

  const [firstStartHour, firstStartMinute, firstEndHour, firstEndMinute] = getScheduleOrDefault(schedule?.[selectedWeekday]);
  const [startHour, setStartHour] = useState(firstStartHour);
  const [startMinute, setStartMinute] = useState(firstStartMinute);
  const [endHour, setEndHour] = useState(firstEndHour);
  const [endMinute, setEndMinute] = useState(firstEndMinute);

  const updateWeekdaySchedule = (scheduleData: ScheduleDto[]) => {
    scheduleData[selectedWeekday] = {
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

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();

    updateWeekdaySchedule(newSchedule);

    dispatch(postCoworkingScheduleAction({
      coworkingId: coworkingId,
      schedules: newSchedule.filter((elem) => weekdayToggles[elem.week_day])
    }));

    handleSubmit();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  useEffect(() => {
    dispatch(resetAdminFetchingStatus('scheduleEditingFetchingStatus'));

    return () => {
      dispatch(resetAdminFetchingStatus('scheduleEditingFetchingStatus'));
    };
  }, [dispatch]);

  return (
    <form className="schedule-form admin-form" action="#" onSubmit={handleSubmitClick}>
      <div className="schedule-form__wrapper admin-form-wrapper">
        <div className="schedule-form__top admin-form-top">
          <h2 className="schedule-form__title admin-form-title title-reset">Режим работы</h2>
        </div>
        <div className="schedule-form__bottom admin-form-bottom">
          <div className="schedule-form__input-group admin-form-input-group">
            <label className="schedule-form__label admin-form-label" htmlFor="type">День недели</label>
            <Select
              selectClasses='schedule-form__date-select'
              adminStyles
              options={WeekdayOptions}
              selectedOption={selectedWeekdayOption}
              optionToggles={weekdayToggles}
              onChange={handleWeekdayChange}
              onToggle={handleWeekdayToggle}
            />
          </div>
          <TimestampSelectGroup subLabelClasses='schedule-form__sub-label' timeGroupClasses='schedule-form__time-group'
            timeSelectClasses='schedule-form__time-select' selectOptionClasses='schedule-form__select-option'
            timesSeparatorClasses='schedule-form__time-separator' adminStyles
            startLabel='Время начала работы' endLabel='Время окончания работы'
            startHour={startHour} startMinute={startMinute} endHour={endHour} endMinute={endMinute}
            onStartHourChange={setStartHour} onStartMinuteChange={setStartMinute}
            onEndHourChange={setEndHour} onEndMinuteChange={setEndMinute}
          />
          <div className="schedule-form__btns admin-form-btns">
            <button className="schedule-form__submit-btn admin-form-btn white-btn btn-reset" type='submit'>
              {fetchingStatus === FetchingStatuses.Pending
                ? <Loader alignCenter small />
                : 'Сохранить'}
            </button>
            <button className="schedule-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
