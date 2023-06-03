import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GraphQLState {
  query: string;
  variables: string;
  headers: string;
  response: string;
}

const initialState: GraphQLState = {
  query: `query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
  }
}`,
  variables: '',
  headers: '',
  response: '',
};

export const graphQLSlice = createSlice({
  name: 'headersField',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
  },
});

export const { setQuery, setVariables, setHeaders, setResponse } = graphQLSlice.actions;
export default graphQLSlice.reducer;
