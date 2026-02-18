export interface Credentials {
  id: string;
  freeName: string;
  email: string;
  role: "MEMBER" | "ADMIN" | string;
  divisionId: string;
  password: string;
  otp: string;
}
