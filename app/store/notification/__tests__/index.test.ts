import notificationReducer, { addNotification, removeNotification } from '../index';
import { NotificationType, type NotificationState } from '../types';

describe('notification slice', () => {
  const initialState: NotificationState = {
    notifications: []
  };

  it('should handle initial state', () => {
    expect(notificationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addNotification', () => {
    const notification = {
      type: NotificationType.Info,
      message: 'Test notification'
    };

    const state = notificationReducer(initialState, addNotification(notification));
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0]).toEqual({
      ...notification,
      id: expect.any(String)
    });
  });

  it('should handle multiple addNotification calls', () => {
    let state = initialState;

    state = notificationReducer(state, addNotification({
      type: NotificationType.Info,
      message: 'First notification'
    }));

    state = notificationReducer(state, addNotification({
      type: NotificationType.Warning,
      message: 'Second notification'
    }));

    expect(state.notifications).toHaveLength(2);
    expect(state.notifications[0].message).toBe('First notification');
    expect(state.notifications[1].message).toBe('Second notification');
  });

  it('should handle removeNotification', () => {
    const notification = {
      type: NotificationType.Info,
      message: 'Test notification'
    };

    let state = notificationReducer(initialState, addNotification(notification));
    const id = state.notifications[0].id;

    state = notificationReducer(state, removeNotification(id!));
    expect(state.notifications).toHaveLength(0);
  });

  it('should only remove the specified notification', () => {
    let state = initialState;

    state = notificationReducer(state, addNotification({
      type: NotificationType.Info,
      message: 'Keep this'
    }));

    state = notificationReducer(state, addNotification({
      type: NotificationType.Warning,
      message: 'Remove this'
    }));

    const idToRemove = state.notifications[1].id;
    state = notificationReducer(state, removeNotification(idToRemove!));

    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0].message).toBe('Keep this');
  });
});
