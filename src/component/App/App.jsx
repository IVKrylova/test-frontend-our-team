import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import { setPersons } from '../../store/actionCreators/personsActions';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const persons = useSelector(store => store.persons.persons);
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSignUp = (data) => {
    console.log(data)
  }

  const getPersons = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      dispatch(setPersons(res.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/'
            element={
              <HomePage
                persons={persons}
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
