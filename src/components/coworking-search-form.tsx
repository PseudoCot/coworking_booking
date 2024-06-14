import { useState, FormEventHandler, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import classNames from 'classnames';
import { fetchCoworkingsBySearchAction } from '../store/api-actions';
import { getCoworkingsSearchParams } from '../store/coworkings-process/selectors';
import { resetCoworkingSearchParams, setCoworkingSearchParams } from '../store/coworkings-process/coworkings-process';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';

export type CoworkingSearchFormProps = {
  inMainScreen?: boolean;
};

export default function CoworkingSearchForm({ inMainScreen = false }: CoworkingSearchFormProps): JSX.Element {
  const formClasses = classNames('searching', {
    'hero__searching': inMainScreen,
    'coworkings__searching': !inMainScreen
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const coworkingSearchParams = useAppSelector(getCoworkingsSearchParams);

  const [title, setTitle] = useState(coworkingSearchParams?.title);
  const [institute, setInstitute] = useState(coworkingSearchParams?.institute);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(fetchCoworkingsBySearchAction({
      title,
      institute,
    }));
    dispatch(setCoworkingSearchParams({
      title,
      institute,
    }));

    if (inMainScreen) {
      navigate(AppRoutes.Coworkings.FullPath);
    }
  };

  const handleShowAllClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setTitle('');
    setInstitute('');

    dispatch(fetchCoworkingsBySearchAction({
      title: '',
      institute: '',
    }));
    dispatch(resetCoworkingSearchParams());
  };

  return (
    <form className={formClasses} action='#' onSubmit={handleSubmit}>
      <div className={classNames('searching__coworking', { 'searching__coworking--unfilled': !title || title.length < 16 })}>
        <input className="searching__coworking-input" type="search" name="title" id="title" maxLength={100}
          inputMode="search" autoComplete="coworking" placeholder={inMainScreen ? 'Название коворкинга' : 'Коворкинг'}
          value={title} onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <span className="searching__separator-line"></span>
      <div className={classNames('searching__institute', { 'searching__institute--unfilled': !institute || institute.length < 16 })}>
        <input className="searching__institute-input" type="search" name="institute" id="institute" maxLength={100}
          inputMode="search" autoComplete="institute" placeholder="Институт"
          value={institute} onChange={(e) => setInstitute(e.target.value)}
        />
      </div>
      <span className="searching__separator-line"></span>
      <button className="searching__submit-btn blue-btn btn-reset" type="submit">Поиск</button>
      {!inMainScreen &&
        <>
          <span className="searching__separator-line"></span>
          <button className="searching__show-all-btn white-btn btn-reset" onClick={handleShowAllClick}>Показать все</button>
        </>}
    </form>
  );
}
