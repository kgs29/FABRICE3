// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: null | {
    id: string
    email: string
    userType: 'buyer' | 'vendor' | 'admin'
    isVerified: boolean
  }
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Inscription
    signUpStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    signUpSuccess: (state, action: PayloadAction<{ user: AuthState['user']; token: string }>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    
    // Vérification OTP
    verifyOTPStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    verifyOTPSuccess: (state) => {
      state.isLoading = false
      if (state.user) {
        state.user.isVerified = true
      }
    },
    verifyOTPFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    
    // Connexion
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: AuthState['user']; token: string }>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    
    // Déconnexion
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  verifyOTPStart,
  verifyOTPSuccess,
  verifyOTPFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions

export default authSlice.reducer