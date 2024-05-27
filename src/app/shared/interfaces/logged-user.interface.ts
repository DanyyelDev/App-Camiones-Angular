export interface LoggedUser {
	userId: string
	token: string
	username: string
	email: string
	displayName: string
	photoUrl?: string
	loginMethod?: 'GOOGLE' | 'USER_PASSWORD'
	role:
		| 'HGIO_ADMIN'
		| 'ORG_ADMIN_RW'
		| 'ORG_ADMIN_RO'
		| 'ORG_ADMIN_RO'
		| 'ORG_MEMBER'
		| 'GUEST'
}
