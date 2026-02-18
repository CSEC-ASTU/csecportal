/*   */
export interface Division {
  id: string;
  name: string;
  description: string;
  headId: string;
  createdAt: string;
}

export interface ISession {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  divisionId: string;
  location: string;
  division: Division;
  userMemberships: any[];
}
