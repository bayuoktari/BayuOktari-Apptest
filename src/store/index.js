import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducers/contactSlice';
export default configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
