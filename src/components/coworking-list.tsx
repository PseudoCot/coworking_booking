import CoworkingMiniCard from './coworking-mini-card';

export default function CoworkingList(): JSX.Element {

  return (
    <ul className="coworkings__list list-reset">
      <CoworkingMiniCard imgUrl='img/cow-irit.jpg' title='ИРИТ - РТФ' openingTime='10:00' closingTime='16:00' />
    </ul>
  );
}
