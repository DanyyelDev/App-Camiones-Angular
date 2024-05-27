export interface AuthResponse {
	id: string
	email: string
	role:
		| 'HGIO_ADMIN'
		| 'ORG_ADMIN_RW'
		| 'ORG_ADMIN_RO'
		| 'ORG_ADMIN_RO'
		| 'ORG_MEMBER'
		| 'GUEST'
}
