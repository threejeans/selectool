// 마이페이지
import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { UserInfoType } from 'types/userTypes'

// 유저 정보 조회
export const getUserInfoAPI = createAsyncThunk(
  'auth/mypage/getUserInfo',
  async () => {
    const userInfo: UserInfoType = {
      email: '',
      id: 0,
      image: '',
      name: '',
      type: '',
      subscribeEmail: '',
      subscribeActive: false,
    }

    const response = {
      statusCode: 200,
      data: userInfo,
    }

    await apiAxios
      .get('/member/info')
      .then(res => {
        response.data = res.data
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)
