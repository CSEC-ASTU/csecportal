export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  endDate: string;
  createdAt: string;
  status: string;
  visibility: string; // "PRIVATE" or "PUBLIC"
}
