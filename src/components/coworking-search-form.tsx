import { useState, FormEventHandler, useEffect, MouseEventHandler } from 'react';
import { useAppDispatch } from '../hooks';
import classNames from 'classnames';
import { fetchCoworkingsBySearchAction } from '../store/api-actions';

export type CoworkingSearchFormProps = {
  inMainScreen?: boolean;
};

export default function CoworkingSearchForm({ inMainScreen = false }: CoworkingSearchFormProps): JSX.Element {
  const formClasses = classNames('searching', {
    'hero__searching': inMainScreen,
    'coworkings__searching': !inMainScreen
  });

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [institute, setInstitute] = useState('');

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(fetchCoworkingsBySearchAction({
      title,
      institute,
    }));
  };

  const handleShowAllClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setTitle('');
    setInstitute('');

    dispatch(fetchCoworkingsBySearchAction({
      title,
      institute,
    }));
  };

  useEffect(() => {
    setSubmitEnabled(title.length > 0 || institute.length > 0);
  }, [title, institute]);

  return (
    <form className={formClasses} action='#' onSubmit={handleSubmit}>
      <div className="searching__coworking">
        <input className="searching__coworking-input"
          type="text"
          name="title"
          id="title"
          placeholder={inMainScreen ? 'Название коворкинга' : 'Коворкинг'}
          autoComplete="coworking"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <button className="searching__submit-btn cb-blue-btn btn-reset" type="submit" disabled={!submitEnabled}>Поиск</button>
      {!inMainScreen &&
        <>
          <span className="searching__separator-line"></span>
          <button className="searching__show-all-btn cb-white-btn btn-reset" onClick={handleShowAllClick}>Показать все</button>
        </>}
    </form>
  );
}
