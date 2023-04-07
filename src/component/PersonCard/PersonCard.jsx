import './PersonCard.scss';

const PersonCard = (props) => {
  return (
    <li className='person-card'>
      <img src={props.person.avatar} alt={`${props.person.first_name} ${props.person.last_name}`} className='person-card__img' />
      <p className='person-card__name'>
        {`${props.person.first_name} ${props.person.last_name}`}
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
