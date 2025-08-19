import { describe, it, expect } from 'vitest'
import { NotificationType } from '../types'
import {
  selectAllNotifications,
  selectNotificationById,
  selectNotificationsByType,
  selectNotificationCount,
  selectNotificationCountsByType,
  selectHasErrorNotifications,
  selectMostRecentNotification
} from '../selectors'

describe('notification selectors', () => {
  const mockNotifications = [
    { id: '1', type: NotificationType.Info, message: 'Info notification' },
    { id: '2', type: NotificationType.Warning, message: 'Warning notification' },
    { id: '3', type: NotificationType.Error, message: 'Error notification' },
    { id: '4', type: NotificationType.Info, message: 'Another info' }
  ];

  const mockState = {
    notification: {
      notifications: mockNotifications
    }
  };

  it('selectAllNotifications returns all notifications', () => {
    const result = selectAllNotifications(mockState);
    expect(result).toEqual(mockNotifications);
  });

  it('selectNotificationById returns correct notification', () => {
    const result = selectNotificationById('2')(mockState);
    expect(result).toEqual(mockNotifications[1]);
  });

  it('selectNotificationById returns undefined for non-existent id', () => {
    const result = selectNotificationById('999')(mockState);
    expect(result).toBeUndefined();
  });

  it('selectNotificationsByType returns notifications of specified type', () => {
    const result = selectNotificationsByType(NotificationType.Info)(mockState);
    expect(result).toHaveLength(2);
    expect(result.every(n => n.type === NotificationType.Info)).toBe(true);
  });

  it('selectNotificationCount returns correct count', () => {
    const result = selectNotificationCount(mockState);
    expect(result).toBe(4);
  });

  it('selectNotificationCountsByType returns correct counts', () => {
    const result = selectNotificationCountsByType(mockState);
    expect(result).toEqual({
      [NotificationType.Error]: 1,
      [NotificationType.Warning]: 1,
      [NotificationType.Info]: 2
    });
  });

  it('selectHasErrorNotifications returns true when errors exist', () => {
    const result = selectHasErrorNotifications(mockState);
    expect(result).toBe(true);
  });

  it('selectHasErrorNotifications returns false when no errors exist', () => {
    const stateWithoutErrors = {
      notification: {
        notifications: mockNotifications.filter(n => n.type !== NotificationType.Error)
      }
    };
    const result = selectHasErrorNotifications(stateWithoutErrors);
    expect(result).toBe(false);
  });

  it('selectMostRecentNotification returns the last notification', () => {
    const result = selectMostRecentNotification(mockState);
    expect(result).toEqual(mockNotifications[mockNotifications.length - 1]);
  });

  it('selectMostRecentNotification returns undefined for empty notifications', () => {
    const emptyState = {
      notification: {
        notifications: []
      }
    };
    const result = selectMostRecentNotification(emptyState);
    expect(result).toBeUndefined();
  });
});
