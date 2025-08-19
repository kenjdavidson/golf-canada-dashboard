import { createSelector } from '@reduxjs/toolkit';
import { NotificationType } from './types';
import type { Notification, NotificationState } from './types';

const selectNotificationState = (state: { notification: NotificationState }) => state.notification;

export const selectAllNotifications = createSelector(
  selectNotificationState,
  (state) => state.notifications
);

export const selectNotificationById = (id: string) => createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => notifications.find((notification: Notification) => notification.id === id)
);

export const selectNotificationsByType = (type: NotificationType) => createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => notifications.filter((notification: Notification) => notification.type === type)
);

export const selectNotificationCount = createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => notifications.length
);

export const selectNotificationCountsByType = createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => {
    const counts: Record<NotificationType, number> = {
      [NotificationType.Error]: 0,
      [NotificationType.Warning]: 0,
      [NotificationType.Info]: 0
    };
    
    return notifications.reduce((acc: Record<NotificationType, number>, notification: Notification) => {
      acc[notification.type]++;
      return acc;
    }, counts);
  }
);

export const selectHasErrorNotifications = createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => notifications.some((notification: Notification) => notification.type === NotificationType.Error)
);

export const selectMostRecentNotification = createSelector(
  selectAllNotifications,
  (notifications: Notification[]) => notifications[notifications.length - 1]
);
