export interface CategoryResult {
	shortName: string
	name: string
}

export interface ResultByCategory {
	category: CategoryResult
	subCategories: CategoryResult[]
	sum: number
	weightedMean: number
}

export interface ResultGeneral {
	maturityLevel: number | null
	sum: number
	weightedMean: number
}

export interface ResultInstrument {
	byCategory: ResultByCategory[]
	general: ResultGeneral
}
