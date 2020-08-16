import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import loginSlice from './login'
import trendsSlice from './trends'

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        trends: trendsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
