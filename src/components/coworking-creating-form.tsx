import { useState, useCallback, ChangeEvent, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { postCoworkingAction, postCoworkingAvatarAction, postCoworkingImageAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import FileInput from './file-input';
import DragAndDropFileInput from './drag-and-drop-file-input';
// import validateFilesExtension from '../shared/validate-files-extension';
// import validateFilesMaxSize from '../shared/validate-files-max-size';
// import { ValidatorData } from '../types/validator-data';
import validateStringsLength from '../shared/validate-strings-length';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
// const REQUIRED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'];
// const IMAGE_INPUT_TOOLTIP_TEXT = 'Максимальный размер 10МБ; допустимые расширения: png, jpg, jpeg';

// const abc: ValidatorData<boolean>[] = [
//   {
//     validator: (value: FileList) => validateFilesMaxSize(value, MAX_IMAGE_SIZE),
//     tooltipText: 'Максимальный размер 10МБ',
//     errorText: 'Превышен максимально допустимый размер файла',
//   },
//   {
//     validator: (value: FileList) => validateFilesExtension(value, REQUIRED_IMAGE_EXTENSIONS),
//     tooltipText: 'допустимые расширения: png, jpg, jpeg',
//     errorText: 'Загружен файл с недопустимым расширением',
//   },
// ];

type CoworkingCreatingFormProps = {
  coworkingId: string;
}

export default function CoworkingCreatingForm({ coworkingId }: CoworkingCreatingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [institute, setInstitute] = useState('');
  const [address, setAddress] = useState('');

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
  const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value), []);
  const handleInstituteChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setInstitute(e.target.value), []);
  const handleAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value), []);

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    dispatch(postCoworkingAction({
      title,
      description,
      institute,
      address
    }));
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([title, description, institute, address]));
  }, [title, description, institute, address]);

  const [avatar, setAvatar] = useState<FileList>();
  useEffect(() => {
    if (avatar) {
      dispatch(postCoworkingAvatarAction({
        coworkingId: coworkingId,
        avatar: avatar[0]
      }));
    }
  }, [dispatch, avatar, coworkingId]);

  const [images, setImages] = useState<FileList>();
  useEffect(() => {
    if (images) {
      dispatch(postCoworkingImageAction({
        coworkingId: coworkingId,
        image: images[0]
      }));
    }
  }, [coworkingId, dispatch, images]);

  return (
    <form className="coworking-form" action="#" onSubmit={handleSubmit}>
      <div className="coworking-form__left">
        <DragAndDropFileInput areaClasses="coworking-form__avatar-area" maxFileSize={MAX_IMAGE_SIZE} files={avatar} setFiles={setAvatar} />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label' inputClasses='coworking-form__input'
          labelText='Название коворкинга' name='title' type='text' adminFormStyles required
          value={title} onChange={handleNameChange}
        />
        <div className="coworking-form__input-group admin-form-input-group">
          <h3 className="coworking-form__label admin-form-label title-reset">Изображения</h3>
          <FileInput maxFileSize={MAX_IMAGE_SIZE} files={images} setFiles={setImages} />
        </div>
      </div>
      <div className="coworking-form__right">
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label' inputClasses='coworking-form__textarea'
          labelText='Описание' name='description' type='text' adminFormStyles textarea
          value={description} onChange={handleDescriptionChange}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label' inputClasses='coworking-form__input'
          labelText='Институт' name='institute' type='text' autoComplete='institute' adminFormStyles required
          value={institute} onChange={handleInstituteChange}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label' inputClasses='coworking-form__input'
          labelText='Адрес' name='address' type='text' adminFormStyles required
          value={address} onChange={handleAddressChange}
        />
      </div>
      <div className="coworking-form__bottom">
        <button className="coworking-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
          Сохранить
        </button>
        <img src="img/coworking-default-image.png" alt="" />
      </div>
    </form>
  );
}
