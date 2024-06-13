import { useState, FormEventHandler, ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postCoworkingSeatsAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import MeetingRoomsEditingInputs from './meeting-rooms-editing-inputs';
import { getCoworkingSeats } from '../store/coworking-process/selectors';
import { PlaceTypes } from '../consts';
import { SeatDto } from '../types/api-shared/seat-dto';

type SeatsEditingFormProps = {
  coworkingId: string;
};

export default function SeatsEditingForm({ coworkingId }: SeatsEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const seatsData = useAppSelector(getCoworkingSeats);

  const initialReduceValue = { tableSeatsCount: 0, meetingRoomsData: [] as SeatDto[] };
  const { tableSeatsCount, meetingRoomsData } = seatsData?.reduce((res, elem) => {
    if (elem.place_type === PlaceTypes.MeetingRoom) {
      res.meetingRoomsData.push(elem);
    } else {
      res.tableSeatsCount += elem.seats_count;
    }
    return res;
  }, initialReduceValue) ?? initialReduceValue;

  const [newTableSeatsCount, setNewTableSeatsCount] = useState(tableSeatsCount);
  const [newMeetingRooms, setNewMeetingRooms] = useState(meetingRoomsData);

  const handleTableSeatsCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setNewTableSeatsCount(+e.target.value), [setNewTableSeatsCount]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (newTableSeatsCount) {
      dispatch(postCoworkingSeatsAction({
        coworkingId: coworkingId,
        tablePlaces: newTableSeatsCount,
        meetingRooms: newMeetingRooms
      }));
    }
  };

  return (
    <form className="seats-form admin-form" action="#" onSubmit={handleSubmit}>
      <div className="seats-form__wrapper admin-form-wrapper">
        <div className="seats-form__top admin-form-top">
          <h2 className="seats-form__title admin-form-title title-reset">Количество мест</h2>
        </div>
        <div className="seats-form__bottom admin-form-bottom">
          <h3 className="seats-form__label admin-form-label title-reset">Столы:</h3>
          <FormInputGroup groupClasses='seats-form__input-group' labelClasses='seats-form__label' inputClasses='seats-form__input'
            adminFormStyles labelText='Количество мест' name='table-places' type='number' inputMode='numeric' required
            min={0} max={1000} step={1}
            value={newTableSeatsCount} onChange={handleTableSeatsCountChange}
          />

          <MeetingRoomsEditingInputs meetingRooms={newMeetingRooms} setMeetingRooms={setNewMeetingRooms} />

          <button className="seats-form__submit-btn admin-form-btn white-btn btn-reset" type='submit'>
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
