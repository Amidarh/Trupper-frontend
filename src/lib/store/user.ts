// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@/types/user.types'

interface UserState {
  profile: IUser | null
}

const initialState: UserState = {
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IUser>) {
      state.profile = action.payload
    },
    clearProfile(state) {
      state.profile = null
    },
  },
})

export const { setProfile, clearProfile } = userSlice.actions
export default userSlice.reducer
