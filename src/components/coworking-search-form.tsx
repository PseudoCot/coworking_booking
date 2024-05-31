import { useState, FormEventHandler, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import classNames from 'classnames';
import { fetchCoworkingsBySearchAction } from '../store/api-actions';
import { getCoworkingsSearchParams } from '../store/coworkings-process/selectors';
import { resetCoworkingSearchParams, setCoworkingSearchParams } from '../store/coworkings-process/coworkings-process';

export type CoworkingSearchFormProps = {
  inMainScreen?: boolean;
};

export default function CoworkingSearchForm({ inMainScreen = false }: CoworkingSearchFormProps): JSX.Element {
  const formClasses = classNames('searching', {
    'hero__searching': inMainScreen,
    'coworkings__searching': !inMainScreen
  });

  const dispatch = useAppDispatch();
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
  };

  const handleShowAllClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setTitle(undefined);
    setInstitute(undefined);

    dispatch(fetchCoworkingsBySearchAction({
      title: undefined,
      institute: undefined,
    }));
    dispatch(resetCoworkingSearchParams());
  };

  return (
    <form className={formClasses} action='#' onSubmit={handleSubmit}>
      <div className="searching__coworking">
        <input className="searching__coworking-input" type="text" name="title" id="title" autoComplete="coworking"
          placeholder={inMainScreen ? 'Название коворкинга' : 'Коворкинг'}
          value={title} onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <span className="searching__separator-line"></span>
      <div className="searching__institute">
        <input className="searching__institute-input" type="text" name="institute" id="institute"
          autoComplete="institute" placeholder="Институт"
          value={institute} onChange={(e) => setInstitute(e.target.value)}
        />
      </div>
      <span className="searching__separator-line"></span>
      <button className="searching__submit-btn cb-blue-btn btn-reset" type="submit">Поиск</button>
      {!inMainScreen &&
        <>
          <span className="searching__separator-line"></span>
          <button className="searching__show-all-btn cb-white-btn btn-reset" onClick={handleShowAllClick}>Показать все</button>
        </>}
    </form>
  );
}
