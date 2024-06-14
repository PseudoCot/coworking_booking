import { useState } from 'react';
import CoworkingList from '../components/coworking-list';
import CoworkingSearchForm from '../components/coworking-search-form';
import Layout from '../components/layout';
import { useAppSelector } from '../hooks';
import { isUserAdmin } from '../store/user-process/selectors';
import ModalWindow from '../components/modal-window';
import CoworkingCreatingForm from '../components/coworking-creating-form';

export default function CoworkingsScreen(): JSX.Element {
  const isAdmin = useAppSelector(isUserAdmin);

  const [creatingCoworking, setCreatingCoworking] = useState(false);
  const handleAddCoworkingClick = () => {
    setCreatingCoworking((prev) => !prev);
  };

  return (
    <Layout>
      <article className="coworkings">
        <h1 className="coworkings__title title title-reset">Коворкинги</h1>

        {isAdmin &&
          <button className="coworkings__add-new-btn white-btn btn-reset" onClick={handleAddCoworkingClick}>
            Добавить коворкинг
          </button>}

        <CoworkingSearchForm />

        <CoworkingList />

        <ModalWindow show={creatingCoworking}>
          <CoworkingCreatingForm onSubmit={handleAddCoworkingClick} onCancel={handleAddCoworkingClick} />
        </ModalWindow>
      </article>
    </Layout>
  );
}
