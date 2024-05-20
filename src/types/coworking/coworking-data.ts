export type CoworkingData = {
  id: string;
  imgUrl: string;
  title: string;
  openingTime: string;
  closingTime: string;
  optionalText?: string;
  description: string;
  address: string;
  seatCapacity: { [key: string]: number };
  techCapability: string[];

  // id: string;
  // avatar: string;
  // title: string;
  // institute: string;
  // description: string;
  // address: string;
  // seats: SeatDto[];
  // working_schedules: ScheduleDto[];
  // images: CoworkingImageDto[];
  // days_of: DayOfDto[];
};
