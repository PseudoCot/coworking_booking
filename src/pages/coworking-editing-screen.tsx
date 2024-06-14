import { useParams } from 'react-router-dom';
import CoworkingEditingForm from '../components/coworking-editing-form';
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchCoworkingAction } from '../store/api-actions';
import { getCoworkingDto, isCoworkingFetching } from '../store/coworking-process/selectors';
import Loader from '../components/loader';
import CapabilitiesEditingForm from '../components/capabilities-editing-form';
import EventCreatingForm from '../components/event-creating-form';
import SeatsEditingForm from '../components/seats-editing-form';
import ScheduleEditingForm from '../components/schedule-editing-form';
import ModalWindow from '../components/modal-window';

export default function CoworkingEditingScreen(): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();

  const coworkingData = useAppSelector(getCoworkingDto);
  const coworkingFetching = useAppSelector(isCoworkingFetching);

  const [editingCapabilities, setEditingCapabilities] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [editingSeats, setEditingSeats] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(false);

  const toggleEditingCapabilities = () => setEditingCapabilities((prev) => !prev);
  const toggleCreatingEvent = () => setCreatingEvent((prev) => !prev);
  const toggleEditingSeats = () => setEditingSeats((prev) => !prev);
  const toggleEditingSchedule = () => setEditingSchedule((prev) => !prev);

  useEffect(() => {
    if (!coworkingData && urlParams.id) {
      dispatch(fetchCoworkingAction(urlParams.id));
    }
  }, [dispatch, coworkingData, urlParams.id]);

  // const temp = ['coworking.jpg', 'coworking.jpg', 'coworking.jpg'];
  // const aRef = useRef<HTMLAnchorElement>(null);
  // const imgRef = useRef<HTMLImageElement>(null);
  // const [images, setImages] = useRemoteImages(temp);
  // useEffect(() => {
  //   if (imgRef.current && aRef.current) {
  //     const url = window.URL.createObjectURL(new Blob([(images as File[])[0]]));
  //     aRef.current.href = url;
  //     imgRef.current.src = url;

  // }, [images]);

  return (
    <Layout>
      <article className="coworking-editing">
        <h1 className="title title-reset">Редактирование коворкинга</h1>

        {/* <a ref={aRef} href='#' download={coworkingData?.avatar}>LOL</a>
        <img ref={imgRef} src="" alt="KEK" /> */}

        {coworkingData
          ?
          <>
            <CoworkingEditingForm {...coworkingData}
              onEditCapabilitiesClick={toggleEditingCapabilities} onCreateEventClick={toggleCreatingEvent}
              onEditSeatsClick={toggleEditingSeats} onEditScheduleClick={toggleEditingSchedule}
            />

            <ModalWindow show={editingCapabilities}>
              <CapabilitiesEditingForm coworkingId={coworkingData.id} capabilities={coworkingData.technical_capabilities}
                onSubmit={toggleEditingCapabilities} onCancel={toggleEditingCapabilities}
              />
            </ModalWindow>

            <ModalWindow show={creatingEvent}>
              <EventCreatingForm coworkingId={coworkingData.id}
                onSubmit={toggleCreatingEvent} onCancel={toggleCreatingEvent}
              />
            </ModalWindow>

            <ModalWindow show={editingSeats}>
              <SeatsEditingForm coworkingId={coworkingData.id} seats={coworkingData.seats}
                onSubmit={toggleEditingSeats} onCancel={toggleEditingSeats}
              />
            </ModalWindow>

            <ModalWindow show={editingSchedule}>
              <ScheduleEditingForm coworkingId={coworkingData.id} schedule={coworkingData.working_schedules}
                onSubmit={toggleEditingSchedule} onCancel={toggleEditingSchedule}
              />
            </ModalWindow>
          </>
          : coworkingFetching && <Loader horizontalAlignCenter />}
      </article>
    </Layout>
  );
}
