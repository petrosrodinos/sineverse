export const WEBSOCKET_ROOMS = {
    ADMIN: 'admin',
    GLOBAL: 'global',
} as const;

export type WebsocketRoomType =
    | typeof WEBSOCKET_ROOMS.ADMIN
    | typeof WEBSOCKET_ROOMS.GLOBAL;
