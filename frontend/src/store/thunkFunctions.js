import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../utils/axios"

// createAsyncThunk => 비동기 액션 생성
export const registerUser = createAsyncThunk( 
    "user/registerUser",   // 타입프리픽스 for 액션크리에이터 생성 
    // payload creater
    async (body, thunkAPI) => {
        try { 
            // 백엔드에 post요청
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )
            console.log('리스폰스데이터: ' + response.data);
            return response.data;   // 이게 payload
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || error.response.data);
        }
    }
)

export const loginUser = createAsyncThunk( 
    "user/loginUser",   // 타입프리픽스 for 액션크리에이터 생성 
    // payload creater
    async (body, thunkAPI) => {
        try { 
            // 백엔드에 post요청
            const response = await axiosInstance.post(
                `/users/login`,
                body
            )
            return response.data;   // 이게 payloadj
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || error.response.data);
        }
    }
)

export const authUser = createAsyncThunk( 
    "user/authUser",
    async (_, thunkAPI) => {    // body에 뭐 없더라도 thukAPI는 두번째 매개변수여야됨 
        try { 
            const response = await axiosInstance.get(
                `/users/auth`  // endpoint: 접근하는 url
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || error.response.data);
        }
    }
)

export const logoutUser = createAsyncThunk( 
    "user/logoutUser",
    async (_, thunkAPI) => {    // body에 뭐 없더라도 thukAPI는 두번째 매개변수여야됨 
        try { 
            const response = await axiosInstance.post(
                `/users/logout`  // endpoint: 접근하는 url
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.message || error.response.data);
        }
    }
)