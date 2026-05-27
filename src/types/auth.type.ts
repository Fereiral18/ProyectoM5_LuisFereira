export type Role = "customer" | "admin";

export type AuthUser = {
  uid: string;
  email: string;
  role: Role;
  displayName: string
};
export type Props = {
  allowedRoles?: ("admin" | "customer")[];
};
