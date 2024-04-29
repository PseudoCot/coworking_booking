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
};
