
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [
    {
      id: '1',
      type: 'info',
      title: 'New applicant',
      message: 'New application received for Senior Software Engineer',
      read: false,
      createdAt: '2025-05-11T09:15:00Z',
    },
    {
      id: '2',
      type: 'success',
      title: 'Job post published',
      message: 'Your job post for Product Manager has been published',
      read: false,
      createdAt: '2025-05-11T08:30:00Z',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Job post expiring',
      message: 'UX Designer job post will expire in 3 days',
      read: true,
      createdAt: '2025-05-10T14:45:00Z',
    },
    {
      id: '4',
      type: 'error',
      title: 'Security alert',
      message: 'Unusual login attempt from new device',
      read: true,
      createdAt: '2025-05-09T11:20:00Z',
    },
  ],
  unreadCount: 2,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'read' | 'createdAt'>>) => {
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
        read: false,
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notificationIndex = state.notifications.findIndex(n => n.id === action.payload);
      if (notificationIndex !== -1) {
        const wasUnread = !state.notifications[notificationIndex].read;
        state.notifications.splice(notificationIndex, 1);
        if (wasUnread) {
          state.unreadCount -= 1;
        }
      }
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
