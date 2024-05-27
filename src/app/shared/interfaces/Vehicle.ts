export interface Vehicle {
	id?: number;
	plateNumber: string;
	brand: string;
	model: string;
	cargoCapacity: number;
	bodyType: string;
	idOwner: number;
	driver: number;
	location: string;
	status: 'AVAILABLE' | 'UNAVAILABLE';
}
