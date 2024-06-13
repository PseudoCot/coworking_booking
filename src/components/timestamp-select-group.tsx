import { AVAILABLE_HOURS, AVAILABLE_MINUTES } from '../consts';

export type TimestampSelectGroupProps = {
  subLabelClasses?: string;
  timeGroupClasses?: string;
  timeSelectClasses?: string;
  selectOptionClasses?: string;
  timesSeparatorClasses?: string;

  adminStyles?: boolean;
  startLabel?: string;
  endLabel?: string;

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
  selectOptionClasses = '', timesSeparatorClasses = '', adminStyles = false, startLabel, endLabel,
  startHour, startMinute, endHour, endMinute, onStartHourChange: handleStartHourChange,
  onStartMinuteChange: handleStartMinuteChange, onEndHourChange: handleEndHourChange,
  onEndMinuteChange: handleEndMinuteChange }: TimestampSelectGroupProps): JSX.Element {

  return (
    <>
      <div> {/* external containers to support a horizontally consistent layout in grid */}
        <span className={`${subLabelClasses} ${adminStyles ? 'admin-form-sub-label' : 'form-sub-label'}`}>
          {startLabel ?? 'Начало'}
        </span>
        <div className={`${timeGroupClasses} ${adminStyles ? 'admin-form-input' : 'form-input'}`}>
          <select className={timeSelectClasses} name="start-time-hours" id="start-time-hours"
            value={startHour} onChange={(e) => handleStartHourChange(e.target.value)}
          >
            {AVAILABLE_HOURS.map((hour) => (
              <option key={hour} className={selectOptionClasses} value={hour}>{hour}</option>
            ))}
          </select>
          <span className={timesSeparatorClasses}>:</span>
          <select className={timeSelectClasses} name="start-time-mins" id="start-time-mins"
            value={startMinute} onChange={(e) => handleStartMinuteChange(e.target.value)}
          >
            {AVAILABLE_MINUTES.map((min) => (
              <option key={min} className={selectOptionClasses} value={min}>{min}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <span className={`${subLabelClasses} ${adminStyles ? 'admin-form-sub-label' : 'form-sub-label'}`}>
          {endLabel ?? 'Конец'}
        </span>
        <div className={`${timeGroupClasses} ${adminStyles ? 'admin-form-input' : 'form-input'}`}>
          <select className={timeSelectClasses} name="end-time-hours" id="end-time-hours"
            value={endHour} onChange={(e) => handleEndHourChange(e.target.value)}
          >
            {AVAILABLE_HOURS.map((hour) => (
              <option key={hour} className={selectOptionClasses} value={hour}>{hour}</option>
            ))}
          </select>
          <span className={timesSeparatorClasses}>:</span>
          <select className={timeSelectClasses} name="end-time-mins" id="end-time-mins"
            value={endMinute} onChange={(e) => handleEndMinuteChange(e.target.value)}
          >
            {AVAILABLE_MINUTES.map((min) => (
              <option key={min} className={selectOptionClasses} value={min}>{min}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
