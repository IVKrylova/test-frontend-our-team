import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import './App.scss';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSignUp = (data) => {
    console.log(data)
  }

  return (
    <div className='app'>
      <Routes>
        <Route element={ <ProtectedRoute isLogin={isLogin} /> }>
          <Route
            path='/'
            element={
              <HomePage

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
