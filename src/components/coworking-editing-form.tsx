import { Link, generatePath } from 'react-router-dom';
import { IMAGE_INPUT_TOOLTIP_TEXT, ImageValidatorsData, MAX_IMAGES_COUNT, PlaceTypeOptions } from '../consts';
import getImageURL from '../shared/get-image-url';
import getRoundedTime from '../shared/get-rounded-time';
import { CoworkingDto } from '../types/coworking/coworking-dto';
import PenInCircleSVG from './svg/pen-in-circle';
import { AppRoutes } from '../routes';
import { useState } from 'react';
import DragAndDropFileInput from './drag-and-drop-file-input';
import FileController from './file-controller';
import FileInput from './file-input';
import ImageCarousel from './image-carousel';

type CoworkingEditingFormProps = CoworkingDto & {
  onEditCapabilitiesClick: () => void;
  onCreateEventClick: () => void;
  onEditSeatsClick: () => void;
  onEditScheduleClick: () => void;
};

export default function CoworkingEditingForm({ id, avatar, title, description, institute, address, seats,
  working_schedules: workingSchedule, images, technical_capabilities: technicalCapabilities,
  onEditCapabilitiesClick: handleEditCapabilitiesClick, onCreateEventClick: handleCreateEventClick,
  onEditSeatsClick: handleEditSeatsClick, onEditScheduleClick: handleEditScheduleClick
}: CoworkingEditingFormProps): JSX.Element {
  const [avatarFile, setAvatarFile] = useState<File[]>();
  const [imageFiles, setImageFiles] = useState<File[]>();

  const [editingAvatar, setEditingAvatar] = useState(false);

  const [openingTime, endingTime] = workingSchedule?.length
    ? [getRoundedTime(workingSchedule[0].start_time), getRoundedTime(workingSchedule[0].end_time)]
    : ['08:00', '20:00'];

  const seatsTotalInfo = seats?.reduce((result, seatDto) => {
    result[seatDto.place_type] = (result[seatDto.place_type] ?? 0) + seatDto.seats_count;
    return result;
  }, {} as { [key: string]: number });

  // const handleImageUpload = (isAvatar = false) => {
  //   if (isAvatar && avatarFile) {
  //     dispatch(postCoworkingAvatarAction({ coworkingId: id, avatar: avatarFile[0] }));
  //   } else if (imageFiles) {
  //     imageFiles.forEach((imageFile) => {
  //       dispatch(postCoworkingImageAction({ coworkingId: id, image: imageFile }));
  //     });
  //   }
  // };

  return (
    <div className="coworking-editing__wrapper">
      <div className="coworking-editing__top">
        <div className="coworking-editing__top-left">
          <div className="coworking-editing__avatar">
            {editingAvatar
              ?
              <DragAndDropFileInput areaClasses="coworking-editing__avatar-area" imagePreview tooltipText={IMAGE_INPUT_TOOLTIP_TEXT}
                validatorsData={ImageValidatorsData} files={avatarFile} setFiles={setAvatarFile}
              />
              :
              <ImageCarousel wrapperClasses='coworking-editing__images-carousel'
                imageAlt={title} mainImage={avatar}
                images={images?.map((imageData) => imageData.image_filename) ?? []}
              />}
            <button className="coworking-editing__avatar-btn btn-reset" onClick={() => setEditingAvatar((prev) => !prev)}>
              <PenInCircleSVG />
            </button>
          </div>
          <h2 className="coworking-editing__header title-reset">{title}</h2>
          <div className="coworking-editing__schedule">
            <span className="coworking-editing__title">Режим работы:</span>
            <span className="coworking-editing__text">
              с&nbsp;{openingTime} до&nbsp;{endingTime}
            </span>
            <button className="coworking-editing__schedule-btn btn-reset" onClick={handleEditScheduleClick}>
              <PenInCircleSVG />
            </button>
          </div>
        </div>

        <div className="coworking-editing__top-right">
          <h3 className="coworking-editing__title title-reset">Изображения:</h3>
          <ul className="coworking-editing__image-list list-reset">
            {images?.map((imageData) => (
              <li className="coworking-editing__image-item" key={imageData.image_filename}>
                <img className="coworking-editing__image" src={getImageURL(imageData.image_filename)} alt={imageData.image_filename} />
              </li>))}
            {images?.length && images.length < 6 &&
              <span className='coworking-editing__image-item-template' />}
          </ul>
          <div className="coworking-editing__image-inputs">
            {Array.from({ length: Math.min((imageFiles?.length ?? 0) + 1, MAX_IMAGES_COUNT) }).map((_, index) => {
              const image = imageFiles?.[index];
              return image
                ? <FileController key={image.name} orderNumber={index} files={imageFiles} setFiles={setImageFiles} />
                :
                <FileInput key="new-image-input" tooltipText={IMAGE_INPUT_TOOLTIP_TEXT}
                  validatorsData={ImageValidatorsData} orderNumber={index} files={imageFiles} setFiles={setImageFiles}
                />;
            })}
          </div>
        </div>
      </div>

      <div className="coworking-editing__middle">
        <div className="coworking-editing__middle-left">
          <div className="coworking-editing__group">
            <h3 className="coworking-editing__title title-reset">Описание:</h3>
            <p className="coworking-editing__text paragraph-reset">
              {description}
            </p>
          </div>
          <div className="coworking-editing__group">
            <h3 className="coworking-editing__title title-reset">
              Технические возможности:
              <button className="coworking-editing__capabilities-btn btn-reset" onClick={handleEditCapabilitiesClick}>
                <PenInCircleSVG />
              </button>
            </h3>
            {technicalCapabilities?.length
              ?
              <ul className="coworking-editing__info-list list-reset">
                {technicalCapabilities.map((capabilityData) => (
                  <li className="coworking-editing__info-point" key={capabilityData.capability}>{capabilityData.capability}</li>
                ))}
              </ul>
              : <span className='coworking-editing__empty-info-text'>Пусто</span>}
          </div>
        </div>

        <div className="coworking-editing__middle-right">
          <div className="coworking-editing__group">
            <h3 className="coworking-editing__title title-reset">Институт:</h3>
            <address className="coworking-editing__text">{institute}</address>
          </div>
          <div className="coworking-editing__group">
            <h3 className="coworking-editing__title title-reset">Адрес:</h3>
            <address className="coworking-editing__text">{address}</address>
          </div>
          <div className="coworking-editing__group">
            <h3 className="coworking-editing__title title-reset">
              Количество мест:
              <button className="coworking-editing__seats-btn btn-reset" onClick={handleEditSeatsClick}>
                <PenInCircleSVG />
              </button>
            </h3>
            {seats?.length && seatsTotalInfo
              ?
              Object.entries(seatsTotalInfo).map(([seatType, seatCount]) => (
                <span className="coworking-editing__text" key={seatType}>
                  {PlaceTypeOptions.find((option) => option.value === seatType)?.title}: {seatCount}
                </span>
              ))
              : <span className='coworking-editing__empty-info-text'>Пусто</span>}
          </div>
        </div>
      </div>

      <div className="coworking-editing__bottom admin-form-btns">
        <Link to={generatePath(AppRoutes.Coworkings.FullPath, { id: id })}
          className="coworking-editing__submit-btn admin-form-btn white-btn"
        >
          Сохранить
        </Link>
      </div>

      <button className="coworking-editing__event-btn admin-form-btn white-btn btn-reset" onClick={handleCreateEventClick}>
        Добавить мероприятие
      </button>
    </div>
  );
}
