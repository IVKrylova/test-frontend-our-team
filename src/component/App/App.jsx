import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
  likePerson,
  editAvatar,
  clearPersons,
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
  let location = useLocation();
  const persons = useSelector(store => store.persons.persons);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isButtonMoreDisabled, setIsButtonMoreDisabled] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const authorize = async (email, password) => {
    try {
      const res = await axios.post(`https://reqres.in/api/login`,
        {
          email: email,
          password: 'cityslicka',
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (res.status === 200) {
        setIsLogin(true);
        localStorage.setItem('token', res.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleFormSignUp = async ({ email, name, password }) => {
    try {
      const res = await axios.post(`https://reqres.in/api/register`,
        {
          email: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (res.status === 200) {
        setIsRegister(true);
        authorize(email, password);
      }
    } catch (err) {
      console.log(err);
    }
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

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  }

  const handleOpenPopup = () => {
    setIsOpenPopup(true);
  }
  const handleFormAvatar = async ({ avatar, id }) => {
    try {
      const res = await axios.patch(`https://reqres.in/api/users/${id}`,
        {
          avatar: avatar,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (res.status === 200) {
        dispatch(editAvatar(persons, Number(id), avatar));
        handleClosePopup();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleBackgroundClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      handleClosePopup();
    }
  }

  const handleExit = () => {
    setIsLogin(false);
    localStorage.clear();
    dispatch(clearPersons());
  }

  useEffect(() => {
    const data = localStorage.getItem('persons')
      && JSON.parse(localStorage.getItem('persons'));

    if (data === null || data.length === 0) {
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

  useEffect(() => {
    if (currentPerson === null && location.pathname.startsWith('/person/') && localStorage.getItem('persons')) {
      const id = location.pathname.slice(8);
      const person = JSON.parse(localStorage.getItem('persons')).find(el => el.id === Number(id));
      setCurrentPerson(person);
    } else if (currentPerson === null && location.pathname.startsWith('/person/') && !localStorage.getItem('persons')) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('persons')
      && JSON.parse(localStorage.getItem('persons'));

    if (isLogin) navigate('/');
    if (isLogin && (data === null || data.length === 0)) {
      getPersons();
      setPageNumber(1);
    }
  }, [isLogin]);

  useEffect(() => {
    if (localStorage.getItem('token')) setIsLogin(true);
  }, []);

  return (
    <div className='app' onClick={handleBackgroundClose}>
      <Routes>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/test-frontend-our-team/'
            element={
              <HomePage
                isButtonMoreDisabled={isButtonMoreDisabled}
                increasePage={increasePage}
                sendIdPerson={handleClickLikePerson}
                sendIdCardPerson={handleCardPersonClick}
                handleExit={handleExit}
              />
            }
          />
        </Route>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/test-frontend-our-team/person/:id'
            element={
              <PersonalPage
                currentPerson={currentPerson}
                setCurrentPerson={setCurrentPerson}
                handleClickGoBack={handleClickGoBack}
                handleOpenPopup={handleOpenPopup}
                location={location}
                handleExit={handleExit}
              />
            }
          />
        </Route>
        <Route
          path='/test-frontend-our-team/sign-up'
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
        location={location}
      />
    </div>
  );
}

export default App;
