export enum NotificationType {
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

export interface Notification {
    type: NotificationType;
    message: string;
    id?: string; 
}

export interface NotificationState {
    notifications: Notification[];
}
