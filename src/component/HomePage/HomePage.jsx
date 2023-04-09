import { useSelector } from 'react-redux';
import ButtonExit from '../ButtonExit/ButtonExit';
import PersonCard from '../PersonCard/PersonCard';
import './HomePage.scss';

const HomePage = (props) => {
  const persons = useSelector(store => store.persons.persons);
  const classButtonMore = `home-page__button-more ${props.isButtonMoreDisabled ? 'home-page__button-more_disabled' : ''}`;

  return (
    <main className='home-page'>
      <section className='home-page__header'>
        <ButtonExit
          handleExit={props.handleExit}
        />
        <h1 className='home-page__title'>
          Наша команда
        </h1>
        <p className='home-page__description'>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах,
          которые ложатся на их плечи, и умеющие находить выход из любых,
          даже самых сложных ситуаций.
        </p>
      </section>
      <section className='home-page__content'>
        <ul className='home-page__persons-list'>
          {persons && persons.map(el => {
            return (
              <PersonCard
                key={el.id}
                person={el}
                sendIdPerson={props.sendIdPerson}
                sendIdCardPerson={props.sendIdCardPerson}
              />
            );
          })}
        </ul>
        <button
          type='button'
          className={classButtonMore}
          disabled={props.isButtonMoreDisabled}
          onClick={props.increasePage}
        >
          Показать еще
        </button>
      </section>
    </main>
  );
}

export default HomePage;
