import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

export const getContactList = createAsyncThunk(
  'contacts/getContactLists',
  async () => {
    const { data } = await axios.get('/contact');
    return data.data;
  },
);
export const getContactDetail = createAsyncThunk(
  'contacts/getContactDetail',
  async id => {
    const { data } = await axios.get('/contact/' + id);
    return data.data;
  },
);

export const constactSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    loading: {
      list: false,
      detail: false,
    },
    error: null,
    contactDetail: {
      firstName: '',
      lastName: '',
      photo: '',
      age: 0,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getContactList.pending, (state, action) => {
      state.loading.list = true;
    });
    builder.addCase(getContactList.fulfilled, (state, action) => {
      state.loading.list = false;
      state.data = action.payload;
    });
    builder.addCase(getContactList.rejected, (state, action) => {
      state.loading.list = false;
      state.data = [];
      state.error = 'Error When Fetch Data';
    });
    builder.addCase(getContactDetail.pending, (state, action) => {
      state.loading.detail = true;
    });
    builder.addCase(getContactDetail.rejected, (state, action) => {
      state.loading.detail = false;
      state.contactDetail = { firstName: '', lastName: '', photo: '', age: 0 };
      state.error = 'Error When Fetch Data';
    });
    builder.addCase(getContactDetail.fulfilled, (state, action) => {
      state.loading.detail = false;
      state.contactDetail = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: action.payload.age,
        photo: action.payload.photo,
      };
    });
  },
});

export default constactSlice.reducer;
