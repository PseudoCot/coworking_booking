import { FIRST_AVAILABLE_HOUR, FIRST_AVAILABLE_MINUTE } from '../consts';
import { ScheduleDto } from '../types/api-shared/schedule-dto';

export default function getScheduleOrDefault(schedule?: ScheduleDto) {
  const startTouple = schedule?.start_time.split(':');
  const endTouple = schedule?.end_time.split(':');
  return [
    startTouple?.[0] ?? FIRST_AVAILABLE_HOUR,
    startTouple?.[1] ?? FIRST_AVAILABLE_MINUTE,
    endTouple?.[0] ?? FIRST_AVAILABLE_HOUR,
    endTouple?.[1] ?? FIRST_AVAILABLE_MINUTE
  ];
}
