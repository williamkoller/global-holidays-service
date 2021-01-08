export enum UserRoles {
  SYSTEM = 'system',
  ADMIN = 'admin',
}

export const RolesOrdination = {
  [UserRoles.SYSTEM]: 0,
  [UserRoles.ADMIN]: 1,
}
