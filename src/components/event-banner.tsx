import { DateTime } from 'luxon';
import { EventDto } from '../types/api-shared/event-dto';

type EventBannerProps = {
  events?: EventDto[];
};

export default function EventBanner({ events }: EventBannerProps): JSX.Element | undefined {
  const randomEvent = events?.[Math.ceil(Math.random() * events.length) - 1];
  const eventDate = randomEvent &&
    DateTime.fromISO(randomEvent.date).toLocaleString(undefined, { locale: 'en-gb' }).replaceAll('/', '.');

  return randomEvent && (
    <div className='event-banner'>
      <h2 className="event-banner__title title-reset">{randomEvent.name}</h2>
      <span className="event-banner__title-underline" />
      <span className="event-banner__date">{eventDate}</span>
      <p className="event-banner__desc paragraph-reset">{randomEvent.description}</p>
    </div>
  );
}
