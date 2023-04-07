import './PersonCard.scss';

const PersonCard = (props) => {
  const classButtonLike = `person-card__button-like ${props.person.isLiked ? 'person-card__button-like_pressed' : ''}`;

  const handleLikeClick = () => {
    props.sendIdPerson(props.person.id);
  }

  const handleCardClick = (evt) => {
    if (!evt.target.closest(`.person-card__button-like`)) props.sendIdCardPerson(props.person.id);
  }

  return (
    <li className='person-card' onClick={handleCardClick}>
      <img
        src={props.person.avatar}
        alt={`${props.person.first_name} ${props.person.last_name}`}
        className='person-card__img'
      />
      <p className='person-card__name'>
        {`${props.person.first_name} ${props.person.last_name}`}
      </p>
      <button
        className={classButtonLike}
        aria-label='Кнопка лайк'
        type='button'
        onClick={handleLikeClick}
      ></button>
    </li>
  );
}

export default PersonCard;
