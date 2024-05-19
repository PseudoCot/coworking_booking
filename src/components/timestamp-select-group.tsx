import { AVAILABLE_HOURS, AVAILABLE_MINUTES } from '../consts';

export type TimestampSelectGroupProps = {
  subLabelClasses?: string;
  timeGroupClasses?: string;
  timeSelectClasses?: string;
  selectOptionClasses?: string;
  timesSeparatorClasses?: string;

  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;

  onStartHourChange: (value: string) => void;
  onStartMinuteChange: (value: string) => void;
  onEndHourChange: (value: string) => void;
  onEndMinuteChange: (value: string) => void;
};

export default function TimestampSelectGroup({ subLabelClasses = '', timeGroupClasses = '', timeSelectClasses = '',
  selectOptionClasses = '', timesSeparatorClasses = '', startHour, startMinute, endHour, endMinute,
  onStartHourChange: handleStartHourChange, onStartMinuteChange: handleStartMinuteChange, onEndHourChange: handleEndHourChange,
  onEndMinuteChange: handleEndMinuteChange }: TimestampSelectGroupProps): JSX.Element {

  return (
    <>
      <span className={`${subLabelClasses} cb-form-sub-label`}>Начало:</span>
      <div className={`${timeGroupClasses} cb-form-input`}>
        <select className={timeSelectClasses} name="start-time-hours" id="start-time-hours"
          value={startHour} onChange={(e) => handleStartHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className={selectOptionClasses} value={hour}>{hour}</option>
          ))}
        </select>
        <span className={timesSeparatorClasses}>:</span>
        <select className={timeSelectClasses} name="start-time-min" id="start-time-min"
          value={startMinute} onChange={(e) => handleStartMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className={selectOptionClasses} value={min}>{min}</option>
          ))}
        </select>
      </div>
      <span className={`${subLabelClasses} cb-form-sub-label`}>Конец:</span>
      <div className={`${timeGroupClasses} cb-form-input`}>
        <select className={timeSelectClasses} name="end-time-hours" id="end-time-hours"
          value={endHour} onChange={(e) => handleEndHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className={selectOptionClasses} value={hour}>{hour}</option>
          ))}
        </select>
        <span className={timesSeparatorClasses}>:</span>
        <select className={timeSelectClasses} name="end-time-min" id="end-time-min"
          value={endMinute} onChange={(e) => handleEndMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className={selectOptionClasses} value={min}>{min}</option>
          ))}
        </select>
      </div>
    </>
  );
}
