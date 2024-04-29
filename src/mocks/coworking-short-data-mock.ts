import { CoworkingShortData } from '../types/coworking-short-data';

export const coworkingShortDataMock: CoworkingShortData[] = [
  {
    id: 'irit',
    imgUrl: 'img/cow-irit.jpg',
    title: 'ИРИТ - РТФ',
    openingTime: '10:00',
    closingTime: '16:00',
  },
  {
    id: 'terr',
    imgUrl: 'img/idea-terr.jpg',
    title: 'Территория идей',
    openingTime: '8:00',
    closingTime: '18:00',
  },
  {
    id: 'ant',
    imgUrl: 'img/antresoli_1.jpg',
    title: 'Антресоли',
    openingTime: '10:00',
    closingTime: '16:00',
    optionalText: 'по&nbsp;заявкам',
  }
];
