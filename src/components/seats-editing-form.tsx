import { useState, FormEventHandler, ChangeEvent, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { postCoworkingSeatsAction } from '../store/api-actions';
import FormInputGroup from './form-input-group';
import MeetingRoomsEditingInputs from './meeting-rooms-editing-inputs';
import { FetchingStatuses, PlaceTypes } from '../consts';
import { SeatDto } from '../types/api-shared/seat-dto';
import { useAdminFetchingStatus } from '../hooks/use-admin-fetching-status';
import Loader from './loader';
import { resetAdminFetchingStatus } from '../store/admin-process/admin-process';

type SeatsEditingFormProps = {
  coworkingId: string;
  seats?: SeatDto[];

  onSubmit: () => void;
  onCancel: () => void;
};

export default function SeatsEditingForm({ coworkingId, seats,
  onSubmit: handleSubmit, onCancel: handleCancel }: SeatsEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAdminFetchingStatus('seatsEditingFetchingStatus');

  const initialReduceValue = { tableSeatsCount: 0, meetingRoomsData: [] as SeatDto[] };
  const { tableSeatsCount, meetingRoomsData } = seats?.reduce((res, elem) => {
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

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();

    if (newTableSeatsCount) {
      dispatch(postCoworkingSeatsAction({
        coworkingId: coworkingId,
        tablePlaces: newTableSeatsCount,
        meetingRooms: newMeetingRooms
      }));
    }

    handleSubmit();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  useEffect(() => {
    dispatch(resetAdminFetchingStatus('seatsEditingFetchingStatus'));

    return () => {
      dispatch(resetAdminFetchingStatus('seatsEditingFetchingStatus'));
    };
  }, [dispatch]);

  return (
    <form className="seats-form admin-form" action="#" onSubmit={handleSubmitClick}>
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

          <div className="admin-form-btns">
            <button className="seats-form__submit-btn admin-form-btn white-btn btn-reset" type='submit'>
              {fetchingStatus === FetchingStatuses.Pending
                ? <Loader alignCenter small />
                : 'Сохранить'}
            </button>
            <button className="seats-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
