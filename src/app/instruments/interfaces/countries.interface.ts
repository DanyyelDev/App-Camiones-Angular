export interface State {
	name: string
	cities: string[]
}

export interface PayloadFormGuest {
	accountId: string
	email: string
	country?: string
	state?: string
	city?: string
	generalRole?: string
	businessSector?: string
	position?: string
	company?: string
}
