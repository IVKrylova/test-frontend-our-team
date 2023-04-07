import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignUp from '../SignUp/SignUp';
import PersonalPage from '../PersonalPage/PersonalPage';
import HomePage from '../HomePage/HomePage';
import './App.scss';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

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
            path='/:id'
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
