export interface PayloadCategories {
	orgCode: string
	instrumentId: string
	categories: Categories[]
}

export interface Categories {
	shortName: string
	name: string
	subCategories: Categories[]
}
