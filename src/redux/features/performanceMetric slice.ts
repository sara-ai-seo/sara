import { PerformanceMetrics } from "@/types/DashboardOverview";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface PerformanceState {
  metrics: PerformanceMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: PerformanceState = {
  metrics: null,
  loading: false,
  error: null,
};


const performanceSlice = createSlice({
    name: 'performance',
    initialState,
    reducers: {
      fetchPerformanceStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchPerformanceSuccess(state, action: PayloadAction<PerformanceMetrics>) {
        state.loading = false;
        state.metrics = action.payload;
      },
      fetchPerformanceFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
      resetPerformanceState(state) {
        return initialState
      }
    },
  });

  export const {
    fetchPerformanceStart,
    fetchPerformanceSuccess,
    fetchPerformanceFailure,
    resetPerformanceState
  } = performanceSlice.actions;
  
  
  export default performanceSlice.reducer;
  