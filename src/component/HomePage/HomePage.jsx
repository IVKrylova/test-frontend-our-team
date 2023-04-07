import PersonCard from '../PersonCard/PersonCard';
import './HomePage.scss';

const HomePage = (props) => {
  return (
    <main className='home-page'>
      <section className='home-page__header'>
        <button
          className='home-page__button-exit'
          type='button'
          aria-label='Кнопка выйти из приложения'
        ></button>
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
          {props.persons && props.persons.map(el => {
            return (
              <PersonCard
                key={el.id}
                name={el.name}
                img={el.img}
              />
            );
          })}
        </ul>
        <button
          type='button'
          className='home-page__button-more'
        >
          Показать еще
        </button>
      </section>
    </main>
  );
}

export default HomePage;
