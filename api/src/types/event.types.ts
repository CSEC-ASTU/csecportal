export const EventType = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;

export type EventType = typeof EventType[keyof typeof EventType];
