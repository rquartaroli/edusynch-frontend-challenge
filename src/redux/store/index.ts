import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { UsersDTO } from '@/DTOs/fakeApiDTOs'

const userSlice = createSlice({
  name: 'user',
  initialState: {} = {} as UsersDTO,

  reducers: {
    add: (state, action) => {
      const { 
        id, 
        name, 
        email, 
        password, 
        avatar, 
        terms_accepted 
      } = action.payload.userFound
      state.id = id
      state.name = name
      state.email = email
      state.password = password
      state.avatar = avatar
      state.terms_accepted = terms_accepted
    }
  },
})

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
})

export const { add } = userSlice.actions

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector