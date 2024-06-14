import { useState, FormEventHandler, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { postCoworkingAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import FileInput from './file-input';
import DragAndDropFileInput from './drag-and-drop-file-input';
import validateStringsLength from '../shared/validate-strings-length';
import useInputChangeCallback from '../hooks/use-change-callback';
import FileController from './file-controller';
import { IMAGE_INPUT_TOOLTIP_TEXT, ImageValidatorsData, MAX_IMAGES_COUNT } from '../consts';

type CoworkingCreatingFormProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

export default function CoworkingCreatingForm({ onSubmit: handleSubmit, onCancel: handleCancel }
  : CoworkingCreatingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

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

    handleSubmit();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([title, description, institute, address]));
  }, [title, description, institute, address]);

  return (
    <form className="coworking-form" action="#" onSubmit={handleSubmitClick}>
      <div className="coworking-form__left">
        <DragAndDropFileInput areaClasses="coworking-form__avatar-area" imagePreview tooltipText={IMAGE_INPUT_TOOLTIP_TEXT}
          validatorsData={ImageValidatorsData} files={avatar} setFiles={setAvatar}
        />
        <FormInputGroup groupClasses='coworking-form__input-group' labelClasses='coworking-form__label' inputClasses='coworking-form__input'
          labelText='Название коворкинга' name='title' type='text' adminFormStyles required
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
      <div className="coworking-form__bottom admin-form-btns">
        <button className="coworking-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
          Сохранить
        </button>
        <button className="coworking-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
          Отменить
        </button>
      </div>
    </form>
  );
}
