export interface IResource {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string | null;
  divisionId?: string;
  userId?: string;
}
