import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postCoworkingAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import FileInput from './file-input';
import DragAndDropFileInput from './drag-and-drop-file-input';
import validateStringsLength from '../shared/validate-strings-length';
import useInputChangeCallback from '../hooks/use-change-callback';
import FileController from './file-controller';
import { FetchingStatuses, IMAGE_INPUT_TOOLTIP_TEXT, ImageValidatorsData, MAX_IMAGES_COUNT } from '../consts';
import { useAdminFetchingStatus } from '../hooks/use-admin-fetching-status';
import { getImagesFetchingStatuses } from '../store/admin-process/selectors';
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { getCoworkingId } from '../store/coworking-process/selectors';
import { resetAdminFetchingStatus } from '../store/admin-process/admin-process';

type CoworkingCreatingFormProps = {
  onSubmit?: () => void;
  onCancel: () => void;
};

export default function CoworkingCreatingForm({ onSubmit: handleSubmit, onCancel: handleCancel }
  : CoworkingCreatingFormProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const newCoworkingId = useAppSelector(getCoworkingId);
  const coworkingCreatingStatus = useAdminFetchingStatus('coworkingCreatingFetchingStatus');
  const avatarUploadingStatus = useAdminFetchingStatus('avatarUploadingFetchingStatus');
  const imagesUploadingStatuses = useAppSelector(getImagesFetchingStatuses);

  const [avatar, setAvatar] = useState<File[]>();
  const [images, setImages] = useState<File[]>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [institute, setInstitute] = useState('');
  const [address, setAddress] = useState('');

  const handleNameChange = useInputChangeCallback(setTitle);
  const handleDescriptionChange = useInputChangeCallback(setDescription);
  const handleInstituteChange = useInputChangeCallback(setInstitute);
  const handleAddressChange = useInputChangeCallback(setAddress);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(postCoworkingAction({
      avatar: avatar?.[0],
      images,
      title,
      description,
      institute,
      address
    }));

    handleSubmit?.();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([title, description, institute, address]));
  }, [title, description, institute, address]);

  useEffect(() => {
    if (coworkingCreatingStatus === FetchingStatuses.Fulfilled && avatarUploadingStatus === FetchingStatuses.Fulfilled
      && newCoworkingId) {
      navigate(newCoworkingId);
    }

    return () => {
      dispatch(resetAdminFetchingStatus('coworkingCreatingFetchingStatus'));
      dispatch(resetAdminFetchingStatus('avatarUploadingFetchingStatus'));
    };
  }, [avatarUploadingStatus, coworkingCreatingStatus, newCoworkingId, navigate, dispatch]);

  return (
    <form className="coworking-form" action="#" onSubmit={handleSubmitClick}>
      <div className="coworking-form__left">
        <DragAndDropFileInput areaClasses="coworking-form__avatar-area" imagePreview tooltipText={IMAGE_INPUT_TOOLTIP_TEXT}
          validatorsData={ImageValidatorsData} files={avatar} setFiles={setAvatar}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label'
          inputClasses='coworking-form__input' labelText='Название коворкинга'
          name='title' type='text' adminFormStyles required
          value={title} onChange={handleNameChange}
        />
        <div className="coworking-form__input-group admin-form-input-group">
          <h3 className="coworking-form__label admin-form-label title-reset">Изображения</h3>
          <div className="coworking-form__image-inputs">
            {Array.from({ length: Math.min((images?.length ?? 0) + 1, MAX_IMAGES_COUNT) }).map((_, index) => {
              const image = images?.[index];
              return image
                ? <FileController key={image.name} orderNumber={index} files={images} setFiles={setImages} />
                :
                <FileInput key="new-image-input" tooltipText={IMAGE_INPUT_TOOLTIP_TEXT}
                  validatorsData={ImageValidatorsData} orderNumber={index} files={images} setFiles={setImages}
                />;
            })}
          </div>
        </div>
      </div>
      <div className="coworking-form__right">
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label'
          inputClasses='coworking-form__textarea' labelText='Описание'
          name='description' type='text' adminFormStyles textarea maxLenght={1500}
          value={description} onChange={handleDescriptionChange}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label'
          inputClasses='coworking-form__input' labelText='Институт'
          name='institute' type='text' autoComplete='institute' adminFormStyles required maxLenght={100}
          value={institute} onChange={handleInstituteChange}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label'
          inputClasses='coworking-form__input' labelText='Адрес'
          name='address' type='text' adminFormStyles required maxLenght={100}
          value={address} onChange={handleAddressChange}
        />
      </div>
      <div className="coworking-form__bottom admin-form-btns">
        <button className="coworking-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
          {coworkingCreatingStatus === FetchingStatuses.Pending || avatarUploadingStatus === FetchingStatuses.Pending
            || Object.values(imagesUploadingStatuses).includes(FetchingStatuses.Pending)
            ? <Loader alignCenter small />
            : 'Сохранить'}
        </button>
        <button className="coworking-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
          Отменить
        </button>
      </div>
    </form>
  );
}
