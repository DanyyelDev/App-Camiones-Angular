export interface Demographic {
	readonly name: string
	readonly options?: string[]
	readonly type: DemographicType
	current: string
}

export enum DemographicType {
	NUMBER = 'NUMBER',
	STRING = 'STRING',
	DATE = 'DATE',
	PLACE = 'PLACE',
	FINAL = 'FINAL',
}
