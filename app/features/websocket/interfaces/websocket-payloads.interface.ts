export interface BaseWebsocketPayload {
    timestamp: string;
    event_id: string;
}

export interface SystemPayload extends BaseWebsocketPayload {
    message: string;
    severity: 'info' | 'warning' | 'critical';
    action_required?: boolean;
}

export type WebsocketPayload =
    | SystemPayload;
