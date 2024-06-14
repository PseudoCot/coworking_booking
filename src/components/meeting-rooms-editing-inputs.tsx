/* eslint-disable camelcase */
import { useState, useEffect, MouseEvent, ChangeEvent, useCallback } from 'react';
import { validateStringsLength } from '../shared/validate-strings-length';
import FormInputGroup from './form-input-group';
import PenSVG from './svg/pen';
import useInputChangeCallback from '../hooks/use-change-callback';
import { SeatDto } from '../types/api-shared/seat-dto';
import { PlaceTypes } from '../consts';
import classNames from 'classnames';
import WhiteCheckmark from './svg/white-checkmark';
import MiniCloseCrossSVG from './svg/mini-close-cross';

const DEFAULT_VALUES = {
  name: '',
  description: '',
  seatsCount: 0,
};

const findRoomIndex = (meetingRooms: SeatDto[], id?: number) => meetingRooms.findIndex((elem) => elem.id === id);

type MeetingRoomsEditingInputsProps = {
  meetingRooms: SeatDto[];
  setMeetingRooms: (newMeetingRooms: SeatDto[]) => void;
};

export default function MeetingRoomsEditingInputs({ meetingRooms, setMeetingRooms }
  : MeetingRoomsEditingInputsProps): JSX.Element {
  const [selectedRoomId, setSelectedRoomId] = useState<number>();

  const [name, setName] = useState(DEFAULT_VALUES.name);
  const [description, setDescription] = useState(DEFAULT_VALUES.description);
  const [seatsCount, setSeatsCount] = useState<number | undefined>(DEFAULT_VALUES.seatsCount);

  const handleNameChange = useInputChangeCallback(setName);
  const handleDescriptionChange = useInputChangeCallback(setDescription);
  const handleSeatsCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setSeatsCount(+e.target.value), [setSeatsCount]);

  const updateStates = (meetingRoom?: SeatDto) => {
    setSelectedRoomId(meetingRoom?.id);
    setName(meetingRoom?.label ?? DEFAULT_VALUES.name);
    setDescription(meetingRoom?.description ?? DEFAULT_VALUES.description);
    setSeatsCount(meetingRoom?.seats_count ?? DEFAULT_VALUES.seatsCount);
  };

  const handleRoomToggle = (e: MouseEvent, id: number) => {
    e.preventDefault();

    const temp = [...meetingRooms];
    const roomIndex = findRoomIndex(temp, id);
    temp[roomIndex].active = !temp[roomIndex].active;
    setMeetingRooms(temp);
  };

  const handleRoomSelect = (e: MouseEvent, id: number) => {
    e.preventDefault();

    const selectedMeetingRoom = meetingRooms.find((elem) => elem.id === id);
    if (!selectedMeetingRoom) {
      return;
    }

    updateStates(selectedMeetingRoom);
  };

  const handleRoomDelete = (e: MouseEvent, id: number) => {
    e.preventDefault();

    const temp = [...meetingRooms];
    temp.splice(findRoomIndex(temp, id), 1);
    setMeetingRooms(temp);
  };

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmitClick = (e: MouseEvent) => {
    e.preventDefault();

    if (!seatsCount) {
      return;
    }

    const temp = [...meetingRooms];
    const roomIndex = findRoomIndex(temp, selectedRoomId);

    temp[roomIndex < 0 ? temp.length : roomIndex] = {
      id: selectedRoomId ?? Math.random() * 10e7,
      coworking_id: '123',
      label: name,
      description: description,
      seats_count: seatsCount,
      place_type: PlaceTypes.MeetingRoom
    };
    setMeetingRooms(temp);

    updateStates();
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength([name, description]) && !!seatsCount);
  }, [name, description, seatsCount]);

  return (
    <>
      <h3 className="seats-form__label admin-form-label title-reset">Переговорные комнаты:</h3>
      <ul className="seats-form__meetings-list list-reset">
        {meetingRooms.length
          ? meetingRooms.map((meetingRoom) => (
            <li className="seats-form__meeting" key={meetingRoom.id}>
              <button className={classNames('seats-form__meeting-toggle btn-reset', {
                'seats-form__meeting-toggle--toggled': !meetingRoom.active,
              })} onClick={(e) => handleRoomToggle(e, meetingRoom.id)}
              >
                {!meetingRoom.active &&
                  <WhiteCheckmark classes='seats-form__meeting-toggle-icon' />}
              </button>
              <span className="seats-form__meeting-name">{meetingRoom.label}</span>
              <button className="seats-form__meeting-edit-btn btn-reset" onClick={(e) => handleRoomSelect(e, meetingRoom.id)}>
                <PenSVG />
              </button>
              <button className="seats-form__meeting-delete-btn btn-reset" onClick={(e) => handleRoomDelete(e, meetingRoom.id)}>
                <MiniCloseCrossSVG />
              </button>
            </li>))
          : <span className='seats-form__empty-meetings-list-text'>Пусто</span>}
      </ul>
      <h3 className="seats-form__label admin-form-label title-reset">
        {selectedRoomId ? `Редактирование "${name}":` : 'Добавление переговорной:'}
      </h3>
      <FormInputGroup groupClasses='seats-form__input-group' labelClasses='seats-form__label' inputClasses='seats-form__input'
        adminFormStyles labelText='Название' name='meeting-name' type='text' required maxLenght={40}
        value={name} onChange={handleNameChange}
      />
      <FormInputGroup groupClasses='seats-form__input-group' labelClasses='seats-form__label' inputClasses='seats-form__textarea'
        adminFormStyles labelText='Описание' name='meeting-description' type='text' textarea maxLenght={500}
        value={description} onChange={handleDescriptionChange}
      />
      <FormInputGroup groupClasses='seats-form__input-group' labelClasses='seats-form__label' inputClasses='seats-form__input'
        adminFormStyles labelText='Количество мест' name='meeting-places' type='number' inputMode='numeric' required
        min={0} max={1000} step={1}
        value={seatsCount} onChange={handleSeatsCountChange}
      />
      <button className="seats-form__add-meeting-btn admin-form-btn white-btn btn-reset"
        disabled={!submitEnabled} onClick={handleSubmitClick}
      >
        Сохранить
      </button>
    </>
  );
}
