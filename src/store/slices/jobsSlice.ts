
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  status: 'active' | 'draft' | 'closed';
  applicants: number;
}

interface JobsState {
  jobs: JobPost[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    department: string;
    status: string;
    type: string;
  };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: JobsState = {
  jobs: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      postedDate: '2025-04-15',
      status: 'active',
      applicants: 24,
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      postedDate: '2025-04-20',
      status: 'active',
      applicants: 18,
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      postedDate: '2025-04-22',
      status: 'active',
      applicants: 12,
    },
    {
      id: '4',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Chicago, IL',
      type: 'Full-time',
      postedDate: '2025-04-25',
      status: 'active',
      applicants: 8,
    },
    {
      id: '5',
      title: 'Data Scientist',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      postedDate: '2025-04-26',
      status: 'active',
      applicants: 15,
    },
    {
      id: '6',
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Boston, MA',
      type: 'Full-time',
      postedDate: '2025-04-28',
      status: 'active',
      applicants: 6,
    },
    {
      id: '7',
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Contract',
      postedDate: '2025-05-01',
      status: 'active',
      applicants: 19,
    },
    {
      id: '8',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Seattle, WA',
      type: 'Full-time',
      postedDate: '2025-05-02',
      status: 'active',
      applicants: 7,
    },
    {
      id: '9',
      title: 'HR Specialist',
      department: 'Human Resources',
      location: 'Remote',
      type: 'Part-time',
      postedDate: '2025-05-05',
      status: 'draft',
      applicants: 0,
    },
    {
      id: '10',
      title: 'Content Writer',
      department: 'Marketing',
      location: 'Austin, TX',
      type: 'Contract',
      postedDate: '2025-05-08',
      status: 'active',
      applicants: 11,
    },
    {
      id: '11',
      title: 'Sales Development Representative',
      department: 'Sales',
      location: 'Denver, CO',
      type: 'Full-time',
      postedDate: '2025-05-10',
      status: 'active',
      applicants: 5,
    },
    {
      id: '12',
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      postedDate: '2025-05-11',
      status: 'active',
      applicants: 16,
    },
  ],
  loading: false,
  error: null,
  filters: {
    search: '',
    department: '',
    status: '',
    type: '',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 12,
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<JobPost[]>) => {
      state.jobs = action.payload;
      state.pagination.totalItems = action.payload.length;
    },
    addJob: (state, action: PayloadAction<JobPost>) => {
      state.jobs.push(action.payload);
      state.pagination.totalItems = state.jobs.length;
    },
    updateJob: (state, action: PayloadAction<JobPost>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      state.pagination.totalItems = state.jobs.length;
      
      // Adjust current page if necessary after deletion
      const maxPage = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
      if (state.pagination.currentPage > maxPage && maxPage > 0) {
        state.pagination.currentPage = maxPage;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filtering
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when changing items per page
    },
  },
});

export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
} = jobsSlice.actions;

export default jobsSlice.reducer;
