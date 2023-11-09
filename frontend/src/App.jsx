import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/NavBar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'
import HistoryPage from './pages/HistoryPage'
import CartPage from './pages/CartPage'
import UploadProductPage from './pages/UploadProductPage'
import DetailProductPage from './pages/DetailProductPage'

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  // 리덕스 스토어에 state 가져오기
  // user.isAuth가 true인 사람(로그인 똑바로 한 사람)만 authUser인지 확인
  const isAuth = useSelector(state => state.user?.isAuth);
  const {pathname} = useLocation(); // a에 담는다면, a.pathname에 경로 들어있음 => destructure

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]) // 이것들이 바뀔 때 호출 (새로고침때도)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<LandingPage />} />

{/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={ isAuth } />}>
          <Route path="/protected" element={<ProtectedPage/>} />
          <Route path="/product/upload" element={<UploadProductPage/>} />
          <Route path="/product/:productId" element={<DetailProductPage/>} />
          <Route path="/user/cart" element={<CartPage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Route>

{/* 로그인 한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={ isAuth } />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>      
        
      </Route>
    </Routes>
  )
}

export default App
