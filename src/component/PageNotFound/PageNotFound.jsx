import ButtonGoBack from '../ButtonGoBack/ButtonGoBack';
import './PageNotFound.scss';

const PageNotFound = (props) => {
  return (
    <main className='page-not-found'>
      <ButtonGoBack
        handleClickGoBack={props.handleClickGoBack}
      />
      <p className='page-not-found__message'>
        Такой страницы не существует
      </p>
      <p className='page-not-found__message'>
        Вернитесь, пожалуйста, назад
      </p>
    </main>
  );
}

export default PageNotFound;
