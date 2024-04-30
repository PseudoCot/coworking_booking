import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import classNames from 'classnames';

type CoworkingSearshingFormProps = {
  inMainScreen?: boolean;
};

export default function CoworkingSearshingForm({ inMainScreen = false }: CoworkingSearshingFormProps): JSX.Element {
  const formClasses = classNames('searching', {
    'hero__searching': inMainScreen,
    'coworkings__searching': !inMainScreen
  });

  const dispatch = useAppDispatch();

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [coworkingName, setCoworkingName] = useState('');
  const [institute, setInstitute] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(someAction({
      coworkingName,
      institute,
    }));
  };

  useEffect(() => {
    setSubmitEnabled(coworkingName.length > 0 || institute.length > 0);
  }, [coworkingName, institute]);

  return (
    <>
      <form className={formClasses} action='#' onSubmit={handleSubmit}>
        <div className="searching__coworking">
          <input className="searching__coworking-input"
            type="text"
            name="coworking"
            id="coworking"
            placeholder={inMainScreen ? 'Название коворкинга' : 'Коворкинг'}
            autoComplete="coworking"
            value={coworkingName}
            onChange={(e) => setCoworkingName(e.target.value)}
          />
        </div>
        <span className="searching__separator-line"></span>
        <div className="searching__institute">
          <input className="searching__institute-input"
            type="text"
            name="institute"
            id="institute"
            placeholder="Институт"
            autoComplete="institute"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />
        </div>
        <span className="searching__separator-line"></span>
        <button className="searching__submit-btn btn-reset" type="submit" disabled={!submitEnabled}>Поиск</button>
        {!inMainScreen &&
          <>
            <span className="searching__separator-line"></span>
            <button className="searching__show-all-btn btn-reset">Показать все</button>
          </>}
      </form>

      {/* <form className="coworkings__searching searching">
        <span className="searching__institute">
          <input className="searching__institute-input" type="text" name="institute" id="institute" placeholder="Институт"
            autoComplete="institute"
          />
        </span>
        <span className="searching__separator-line"></span>
        <span className="searching__audience">
          <input className="searching__audience-input" type="text" name="coworking" id="coworking" placeholder="Коворкинг"
            autoComplete="coworking"
          />
        </span>
        <span className="searching__separator-line"></span>
        <button className="searching__submit-btn btn-reset" type="submit">Поиск</button>
        <span className="searching__separator-line"></span>
        <button className="searching__show-all-btn btn-reset">Показать все</button>
      </form> */}
    </>
  );
}
