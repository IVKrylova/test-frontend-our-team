import './PersonCard.scss';

const PersonCard = (props) => {
  return (
    <li className='person-card'>
      <img src={props.img} alt={props.name} className='person-card__img' />
      <p className='person-card__name'>
        {props.name}
      </p>
      <button
        className={`person-card__button-like`}
        aria-label='Кнопка лайк'
        type='button'
      ></button>
    </li>
  );
}

export default PersonCard;
