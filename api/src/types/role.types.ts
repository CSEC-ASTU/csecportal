// Define RoleType as string literal union and const map to replace Prisma enum
export const RoleType = {
	PRESIDENT: 'PRESIDENT',
	CPD_HEAD: 'CPD_HEAD',
	CBD_HEAD: 'CBD_HEAD',
	CYBER_HEAD: 'CYBER_HEAD',
	DEV_HEAD: 'DEV_HEAD',
	DATA_SCIENCE_HEAD: 'DATA_SCIENCE_HEAD',
	MEMBER: 'MEMBER',
} as const;

export type RoleType = typeof RoleType[keyof typeof RoleType];
