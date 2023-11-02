import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, 
    REHYDRATE, persistReducer, persistStore}
     from 'redux-persist'

// 서로 다른 리듀싱 함수들을 값으로 가지는 객체를 받아서 createStore에 넘길 수 있는 하나의 리듀싱 함수로 변환
const rootReducer = combineReducers({
    user: userReducer,
    // post: postReducer (만약 있다면 합쳐줌)
})

const persistConfig = {
    key: 'root', // 저장할 때 key 이름
    storage,    // 데이터를 localStorage, sessionStorage등 어디 저장할지
                // 그냥 storage는 localStorage
    // whitelist: [],  // 여러 reducer 중에 해당 reducer만 localStorage에 저장.
    // blacklist: [].  // blacklist -> 그것만 제외.
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    
    reducer: persistedReducer,

    middleware: getDefaultMiddleware => getDefaultMiddleware({ 
        // 이 타입들의 액션이 오면 ignore하기
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }

    })
})

export const persistor = persistStore(store);