import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import {
  setPersons,
  getMorePersons,
  likePerson
} from '../../store/actionCreators/personsActions';
import { TOTAL_PAGES } from '../../utils/constants';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persons = useSelector(store => store.persons.persons);
  const [isLogin, setIsLogin] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isButtonMoreDisabled, setIsButtonMoreDisabled] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

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
    if (pageNumber > 1) {
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

  useEffect(() => {
    const data = localStorage.getItem('persons')
      && JSON.parse(localStorage.getItem('persons'));

    data === null ? getPersons() : dispatch(setPersons(data));
  }, []);

  useEffect(() => {
    handleGetMorePersons();
  }, [pageNumber]);

  useEffect(() => {
    if (persons.length > 0) localStorage.setItem('persons', JSON.stringify(persons));
  }, [persons]);

  return (
    <div className='app'>
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
      </Routes>
    </div>
  );
}

export default App;
