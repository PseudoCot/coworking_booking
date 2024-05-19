import { AVAILABLE_HOURS, AVAILABLE_MINUTES } from '../consts';

export type TimestampSelectGroupProps = {
  subLabelClassNames?: string;
  timeGroupClassNames?: string;
  timeSelectClassNames?: string;
  selectOptionClassNames?: string;
  timesSeparatorClassNames?: string;

  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;

  onStartHourChange: (value: string) => void;
  onStartMinuteChange: (value: string) => void;
  onEndHourChange: (value: string) => void;
  onEndMinuteChange: (value: string) => void;
};

export default function TimestampSelectGroup({ subLabelClassNames = '', timeGroupClassNames = '', timeSelectClassNames = '',
  selectOptionClassNames = '', timesSeparatorClassNames = '', startHour, startMinute, endHour, endMinute,
  onStartHourChange: handleStartHourChange, onStartMinuteChange: handleStartMinuteChange, onEndHourChange: handleEndHourChange,
  onEndMinuteChange: handleEndMinuteChange }: TimestampSelectGroupProps): JSX.Element {

  return (
    <>
      <span className={`${subLabelClassNames} cb-form-sub-label`}>Начало:</span>
      <div className={`${timeGroupClassNames} cb-form-input`}>
        <select className={timeSelectClassNames} name="start-time-hours" id="start-time-hours"
          value={startHour} onChange={(e) => handleStartHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className={selectOptionClassNames} value={hour}>{hour}</option>
          ))}
        </select>
        <span className={timesSeparatorClassNames}>:</span>
        <select className={timeSelectClassNames} name="start-time-min" id="start-time-min"
          value={startMinute} onChange={(e) => handleStartMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className={selectOptionClassNames} value={min}>{min}</option>
          ))}
        </select>
      </div>
      <span className={`${subLabelClassNames} cb-form-sub-label`}>Конец:</span>
      <div className={`${timeGroupClassNames} cb-form-input`}>
        <select className={timeSelectClassNames} name="end-time-hours" id="end-time-hours"
          value={endHour} onChange={(e) => handleEndHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className={selectOptionClassNames} value={hour}>{hour}</option>
          ))}
        </select>
        <span className={timesSeparatorClassNames}>:</span>
        <select className={timeSelectClassNames} name="end-time-min" id="end-time-min"
          value={endMinute} onChange={(e) => handleEndMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className={selectOptionClassNames} value={min}>{min}</option>
          ))}
        </select>
      </div>
    </>
  );
}
