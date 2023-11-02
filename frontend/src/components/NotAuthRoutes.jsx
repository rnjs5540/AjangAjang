//로그인 한 사람이 접근 시 메인페이지로 리다이렉트
import { Navigate, Outlet } from 'react-router-dom'

const NotAuthRoutes = ( isAuth ) => {
  return (
    isAuth.isAuth ? <Navigate to={'/'} /> : <Outlet />
)}

export default NotAuthRoutes