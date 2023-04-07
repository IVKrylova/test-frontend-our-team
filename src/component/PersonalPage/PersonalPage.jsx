import './PersonalPage.scss';

const PersonalPage = (props) => {
  return (
    <main className='personal-page'>
      {props.currentPerson.id}
    </main>
  );
}

export default PersonalPage;
