import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider> 
  </BrowserRouter>,
)

// 페이지가 리프레쉬됨 => 리덕스 스토어의 값들이 초기화됨
// 그거를 rehydrate 함 (로컬 스토리지에서 가져와 넣어준다)
// rehydrate되기 전에 ui가 렌더링이 되어버리면 id, email등의 값이 없다
// PersistGate => 데이터를 다시 사용할 수 있기까지 앱의 렌더링을 지연시킴