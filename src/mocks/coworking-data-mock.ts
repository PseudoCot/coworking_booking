import { CoworkingData } from '../types/coworking-data';

export const coworkingDataMock: CoworkingData[] = [
  {
    id: 'irit',
    imgUrl: 'img/cow-irit.jpg',
    title: 'ИРИТ - РТФ',
    openingTime: '10:00',
    closingTime: '16:00',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, delectus nobis repellat aliquid illum recusandae, officia assumenda maiores aut iste cum laboriosam hic consequuntur minus odio, rem ipsum incidunt voluptatibus sit sunt ab eligendi beatae!',
    address: 'ул. Пушкина, дом Колотушкина',
    seatCapacity: {
      Переговорные: 3,
      Столы: 6,
    },
    techCapability: [
      'проектор наивысшего качества для просмотра кино всей радиофаковской семьёй',
      '3 доски и нестираемые маркеры разных цветов',
      'Wi-Fi',
    ],
  },
  {
    id: 'terr',
    imgUrl: 'img/idea-terr.jpg',
    title: 'Территория идей',
    openingTime: '8:00',
    closingTime: '18:00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea ducimus eos, ad porro laudantium non!',
    address: 'ул. Мира 666, этаж - преисподняя',
    seatCapacity: {
      Столы: 25,
    },
    techCapability: [
      'котлы с маслом разной степени подогрева',
      '6 железных дев и 2 гильотины',
      'Wi-Fi с адской пропускной способностью',
    ],
  },
  {
    id: 'ant',
    imgUrl: 'img/antresoli_1.jpg',
    title: 'Антресоли',
    openingTime: '10:00',
    closingTime: '16:00',
    optionalText: 'по&nbsp;заявкам',
    description: '"Антресоли" - это комфортное, уютное пространство для студентов, где любой желающий может провести время за работой или учебой. Студенты, приходящие в коворкинг, могут подготовиться к занятиям и обсудить свои проекты.',
    address: 'ул. Мира 19, 4 этаж',
    seatCapacity: {
      Переговорные: 2,
      Столы: 40,
    },
    techCapability: [
      'стационарная и мобильная мебель как для индивидуальной, так и для груповой работы',
      '6 маркерных досок',
      'Wi-Fi',
    ],
  }
];
