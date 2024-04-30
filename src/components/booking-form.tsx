import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';

export default function BookingForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [seatType, setSeatType] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(bookAction({
      seatType,
      date,
      startTime,
      endTime,
    }));
  };

  useEffect(() => {
    setSubmitEnabled(false);
  }, [email, password, processEmailValidation]);

  return (
    <form className="booking__form cb-form" action="#" onSubmit={handleSubmit}>
      <div className="booking__form-wrapper cb-form-wrapper">
        <div className="booking__form-top cb-form-top">
          <h2 className="booking__form-title cb-form-title title-reset">Форма бронирования</h2>
        </div>
        <div className="booking__form-bottom cb-form-bottom">
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="type">Тип места:</label>
            <div className="booking__form-select-wrapper">
              <select className="booking__form-select cb-form-input" name="type" id="booking-type">
                <option className="booking__form-select-option" value="" selected disabled hidden></option>
                <option className="booking__form-select-option" value="Столы">Столы</option>
                <option className="booking__form-select-option" value="Переговорные">Переговорные</option>
              </select>
            </div>
          </div>
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="date">Дата:</label>
            <input className="booking__form-input cb-form-input" type="date" name="date" id="booking-date" />
          </div>
          <div className="booking__form-group cb-form-group">
            <label className="booking__form-label cb-form-label" htmlFor="time">Время:</label>
            <span className="booking__form-sub-label cb-form-sub-label">Начало:</span>
            <div className="booking__form-time-group  cb-form-input">
              <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours">
                <option value="08" className="booking__form-select-option">08</option>
                <option value="09" className="booking__form-select-option">09</option>
                <option value="10" className="booking__form-select-option">10</option>
                <option value="11" className="booking__form-select-option">11</option>
                <option value="12" className="booking__form-select-option">12</option>
                <option value="13" className="booking__form-select-option">13</option>
                <option value="14" className="booking__form-select-option">14</option>
                <option value="15" className="booking__form-select-option">15</option>
                <option value="16" className="booking__form-select-option">16</option>
                <option value="17" className="booking__form-select-option">17</option>
                <option value="18" className="booking__form-select-option">18</option>
                <option value="19" className="booking__form-select-option">19</option>
                <option value="20" className="booking__form-select-option">20</option>
              </select>
              <span className="booking__form-time-separator">:</span>
              <select className="booking__form-time-select" name="start-time-min" id="start-time-min">
                <option value="00" className="booking__form-select-option">00</option>
                <option value="05" className="booking__form-select-option">05</option>
                <option value="10" className="booking__form-select-option">10</option>
                <option value="15" className="booking__form-select-option">15</option>
                <option value="20" className="booking__form-select-option">20</option>
                <option value="25" className="booking__form-select-option">25</option>
                <option value="30" className="booking__form-select-option">30</option>
                <option value="35" className="booking__form-select-option">35</option>
                <option value="40" className="booking__form-select-option">40</option>
                <option value="45" className="booking__form-select-option">45</option>
                <option value="50" className="booking__form-select-option">50</option>
                <option value="55" className="booking__form-select-option">55</option>
              </select>
            </div>
            <span className="booking__form-sub-label cb-form-sub-label">Конец:</span>
            <div className="booking__form-time-group  cb-form-input">
              <select className="booking__form-time-select" name="start-time-hours" id="start-time-hours">
                <option value="08" className="booking__form-select-option">08</option>
                <option value="09" className="booking__form-select-option">09</option>
                <option value="10" className="booking__form-select-option">10</option>
                <option value="11" className="booking__form-select-option">11</option>
                <option value="12" className="booking__form-select-option">12</option>
                <option value="13" className="booking__form-select-option">13</option>
                <option value="14" className="booking__form-select-option">14</option>
                <option value="15" className="booking__form-select-option">15</option>
                <option value="16" className="booking__form-select-option">16</option>
                <option value="17" className="booking__form-select-option">17</option>
                <option value="18" className="booking__form-select-option">18</option>
                <option value="19" className="booking__form-select-option">19</option>
                <option value="20" className="booking__form-select-option">20</option>
              </select>
              <span className="booking__form-time-separator">:</span>
              <select className="booking__form-time-select" name="start-time-min" id="start-time-min">
                <option value="00" className="booking__form-select-option">00</option>
                <option value="05" className="booking__form-select-option">05</option>
                <option value="10" className="booking__form-select-option">10</option>
                <option value="15" className="booking__form-select-option">15</option>
                <option value="20" className="booking__form-select-option">20</option>
                <option value="25" className="booking__form-select-option">25</option>
                <option value="30" className="booking__form-select-option">30</option>
                <option value="35" className="booking__form-select-option">35</option>
                <option value="40" className="booking__form-select-option">40</option>
                <option value="45" className="booking__form-select-option">45</option>
                <option value="50" className="booking__form-select-option">50</option>
                <option value="55" className="booking__form-select-option">55</option>
              </select>
            </div>
          </div>
          <button className="booking__form-submit-btn cb-form-btn btn-reset"
            type="submit" disabled={!submitEnabled}
          >
            Забронировать
          </button>
        </div>
      </div>
    </form>
  );
}
