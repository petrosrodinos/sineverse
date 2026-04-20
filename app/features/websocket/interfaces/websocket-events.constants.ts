export const WEBSOCKET_EVENTS = {
  CONNECTION: {
    CONNECT: "connection",
    DISCONNECT: "disconnect",
    ERROR: "error",
  },
} as const;

export type WebsocketEventCategory = keyof typeof WEBSOCKET_EVENTS;

export type WebsocketEventType<T extends WebsocketEventCategory> =
  (typeof WEBSOCKET_EVENTS)[T][keyof (typeof WEBSOCKET_EVENTS)[T]];
