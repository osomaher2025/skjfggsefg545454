
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  joinDate: string;
}

interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: {
    id: '1',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@company.com',
    role: 'HR Manager',
    department: 'Human Resources',
    avatar: 'https://i.pravatar.cc/150?img=32',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'HR professional with 8+ years of experience in talent acquisition and employee development.',
    joinDate: '2022-03-15',
  },
  isAuthenticated: true,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  updateProfile,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
