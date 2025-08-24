import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationState } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState: NotificationState = {
    notifications: []
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const notification = {
                ...action.payload,
                id: uuidv4() // Generate a unique ID for each notification
            };
            state.notifications.push(notification);
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        }
    }
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
