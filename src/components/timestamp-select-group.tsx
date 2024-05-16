import { AVAILABLE_HOURS, AVAILABLE_MINUTES } from '../consts';

type TimestampSelectGroupProps = {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  onStartHourChange: (value: string) => void;
  onStartMinuteChange: (value: string) => void;
  onEndHourChange: (value: string) => void;
  onEndMinuteChange: (value: string) => void;
};

export default function TimestampSelectGroup({ startHour, startMinute, endHour, endMinute, onStartHourChange: handleStartHourChange,
  onStartMinuteChange: handleStartMinuteChange, onEndHourChange: handleEndHourChange, onEndMinuteChange: handleEndMinuteChange
}: TimestampSelectGroupProps): JSX.Element {

  return (
    <>
      <span className="booking__form-sub-label cb-form-sub-label">Начало:</span>
      <div className="booking__form-time-group  cb-form-input">
        <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours"
          value={startHour} onChange={(e) => handleStartHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className="booking__form-select-option" value={hour}>{hour}</option>
          ))}
        </select>
        <span className="booking__form-time-separator">:</span>
        <select className="booking__form-time-select" name="start-time-min" id="start-time-min"
          value={startMinute} onChange={(e) => handleStartMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className="booking__form-select-option" value={min}>{min}</option>
          ))}
        </select>
      </div>
      <span className="booking__form-sub-label cb-form-sub-label">Конец:</span>
      <div className="booking__form-time-group  cb-form-input">
        <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours"
          value={endHour} onChange={(e) => handleEndHourChange(e.target.value)}
        >
          {AVAILABLE_HOURS.map((hour) => (
            <option key={hour} className="booking__form-select-option" value={hour}>{hour}</option>
          ))}
        </select>
        <span className="booking__form-time-separator">:</span>
        <select className="booking__form-time-select" name="start-time-min" id="start-time-min"
          value={endMinute} onChange={(e) => handleEndMinuteChange(e.target.value)}
        >
          {AVAILABLE_MINUTES.map((min) => (
            <option key={min} className="booking__form-select-option" value={min}>{min}</option>
          ))}
        </select>
      </div>
    </>
  );
}
