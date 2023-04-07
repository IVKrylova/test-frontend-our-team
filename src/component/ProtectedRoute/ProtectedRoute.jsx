import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
  return (
    props.isLogin ? <Outlet /> : <Navigate to='/sign-up' replace/>
)}

export default ProtectedRoute;
