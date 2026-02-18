import { IDivision } from "./divisions.types";
import { IMemberData } from "./member.type";

export interface IResource {
  id: string;
  name: string;
  url: string;
  type: "LINK";
  description: string;
  divisionId: string;
  ownerId: string;
  createdAt: string;
  division: IDivision;
  owner: IMemberData;
}
