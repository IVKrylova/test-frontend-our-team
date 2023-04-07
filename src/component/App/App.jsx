import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import { setPersons, getMorePersons } from '../../store/actionCreators/personsActions';
import { TOTAL_PAGES } from '../../utils/constants';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const persons = useSelector(store => store.persons.persons);
  const [isLogin, setIsLogin] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isButtonMoreDisabled, setIsButtonMoreDisabled] = useState(false);

  const handleFormSignUp = (data) => {
    console.log(data)
  }

  const getPersons = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users?page=1');
      dispatch(setPersons(res.data.data));
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
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      dispatch(getMorePersons(persons, res.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPersons();
  }, []);

  useEffect(() => {
    handleGetMorePersons();
  }, [pageNumber]);

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
              />
            }
          />
        </Route>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/person/:id'
            element={
              <PersonalPage
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
