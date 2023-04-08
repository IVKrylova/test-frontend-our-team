import ButtonExit from '../ButtonExit/ButtonExit';
import ButtonGoBack from '../ButtonGoBack/ButtonGoBack';
import './PersonalPage.scss';

const PersonalPage = (props) => {
  return (
    props.currentPerson &&
      <main className='personal-page'>
        <section className='personal-page__header'>
          <ul className='personal-page__button-list'>
            <li className='personal-page__button-item'>
              <ButtonGoBack
                handleClickGoBack={props.handleClickGoBack}
              />
            </li>
            <li className='personal-page__button-item'>
              <ButtonExit />
            </li>
          </ul>
          <div className='personal-page__about-person'>
            <h1 className='personal-page__name'>
              {`${props.currentPerson.first_name} ${props.currentPerson.last_name}`}
            </h1>
            <p className='personal-page__position'>
              Партнер
            </p>
            <img
              src={props.currentPerson.avatar}
              alt={`${props.currentPerson.first_name} ${props.currentPerson.last_name}`}
              className='personal-page__img'
            />
          </div>
        </section>
        <section className='personal-page__content'>
          <ul className='personal-page__contacts-list'>
            <li>
              <a
                className='personal-page__link personal-page__link_phone'
                href='tel:+79543334455'
              >
                +7 (954) 333-44-55
              </a>
            </li>
            <li>
              <a
                className='personal-page__link personal-page__link_email'
                href={`mailto:${props.currentPerson.email}`}
              >
                {props.currentPerson.email}
              </a>
            </li>
          </ul>
          <div className='personal-page__description'>
            <p className='personal-page__text'>
              Клиенты видят в нем эксперта по вопросам разработки комплексных
              решений финансовых продуктов, включая такие аспекты, как
              организационная структура, процессы, аналитика и ИТ-компоненты.
              Он помогает клиентам лучше понимать структуру рисков их бизнеса,
              улучшать процессы за счет применения новейших технологий и увеличивать
              продажи, используя самые современные аналитические инструменты.
            </p>
            <p className='personal-page__text'>
              В работе с клиентами недостаточно просто решить конкретную проблему
              или помочь справиться с трудностями. Не менее важно уделять внимание
              обмену знаниями: "Один из самых позитивных моментов — это осознание
              того, что ты помог клиенту перейти на совершенно новый уровень
              компетентности, уверенность в том, что после окончания проекта у клиента
              есть все необходимое, чтобы дальше развиваться самостоятельно".
            </p>
            <p className='personal-page__text'>
              Помимо разнообразных проектов для клиентов финансового сектора, Сорин
              ведет активную предпринимательскую деятельность. Он является совладельцем
              сети клиник эстетической медицины в Швейцарии, предлагающей инновационный
              подход к красоте, а также инвестором других бизнес-проектов.
            </p>
          </div>
        </section>
      </main>
  );
}

export default PersonalPage;
