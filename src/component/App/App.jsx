import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import PageNotFound from '../PageNotFound/PageNotFound';
import PopupEditAvatar from '../PopupEditAvatar/PopupEditAvatar';
import {
  setPersons,
  getMorePersons,
  likePerson
} from '../../store/actionCreators/personsActions';
import {
  TOTAL_PAGES,
  LIMIT_PERSON_IN_PAGE,
  TOTAL_PERSONS,
} from '../../utils/constants';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persons = useSelector(store => store.persons.persons);
  const [isLogin, setIsLogin] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isButtonMoreDisabled, setIsButtonMoreDisabled] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const handleFormSignUp = (data) => {
    console.log(data)
  }

  const getPersons = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users?page=1');
      const data = res.data.data.map(el => {
        el.isLiked = false;
        return el;
      });
      dispatch(setPersons(data));
    } catch (err) {
      console.log(err);
    }
  }

  const increasePage = () => {
    if (pageNumber < TOTAL_PAGES) {
      if (pageNumber + 1 === TOTAL_PAGES) setIsButtonMoreDisabled(true);
      setPageNumber(pageNumber + 1);
    };
  }

  const handleGetMorePersons = async () => {
    if (pageNumber > 1 && pageNumber <= TOTAL_PAGES) {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
        const data = res.data.data.map(el => {
          el.isLiked = false;
          return el;
        });
        dispatch(getMorePersons(persons, data));
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleClickLikePerson = (id) => {
    dispatch(likePerson(persons, id));
  }

  const handleCardPersonClick = (id) => {
    const person = persons.find(el => el.id === id);
    setCurrentPerson(person);
    navigate(`/person/${id}`);
  }

  const handleClickGoBack = () => {
    navigate(-1);
  }

  const handleClosePopup = (evt) => {
    setIsOpenPopup(false);
  }

  const handleOpenPopup = () => {
    setIsOpenPopup(true);
  }
  const handleFormAvatar = (avatar) => {
    console.log(avatar)
  }

  const handleBackgroundClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      handleClosePopup();
    }
  }

  useEffect(() => {
    const data = localStorage.getItem('persons')
      && JSON.parse(localStorage.getItem('persons'));

    if (data === null) {
      getPersons();
    } else {
      dispatch(setPersons(data));
      setPageNumber(data.length / LIMIT_PERSON_IN_PAGE);
      if (pageNumber === TOTAL_PAGES) setIsButtonMoreDisabled(true);
    }

  }, []);

  useEffect(() => {
    persons.length !== TOTAL_PERSONS ? handleGetMorePersons() : setIsButtonMoreDisabled(true);
  }, [pageNumber]);

  useEffect(() => {
    if (persons.length > 0) localStorage.setItem('persons', JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        handleClosePopup();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  return (
    <div className='app' onClick={handleBackgroundClose}>
      <Routes>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/'
            element={
              <HomePage
                persons={persons}
                isButtonMoreDisabled={isButtonMoreDisabled}
                increasePage={increasePage}
                sendIdPerson={handleClickLikePerson}
                sendIdCardPerson={handleCardPersonClick}
              />
            }
          />
        </Route>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/person/:id'
            element={
              <PersonalPage
                currentPerson={currentPerson}
                handleClickGoBack={handleClickGoBack}
                handleOpenPopup={handleOpenPopup}
              />
            }
          />
        </Route>
        <Route
          path='/sign-up'
          element={
            <SignUp
              sendProperty={handleFormSignUp}
            />
          }
        />
        <Route
          path='*'
          element={
            <PageNotFound
              handleClickGoBack={handleClickGoBack}
            />
          }
        />
      </Routes>
      <PopupEditAvatar
        onClosePopup={handleClosePopup}
        isOpenPopup={isOpenPopup}
        sendNewAvatar={handleFormAvatar}
      />
    </div>
  );
}

export default App;
