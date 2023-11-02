//로그인 안 된 사람이 접근 시 로그인 페이지로 리다이렉트
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ( isAuth ) => {
  return (
    isAuth.isAuth ? <Outlet /> : <Navigate to={'login'} />
)}

export default ProtectedRoutes