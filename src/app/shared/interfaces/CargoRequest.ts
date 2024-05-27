export interface CargoRequest {
    id: number;
    requestDate: Date;
    cargoOwnerId: number;
    origin: string;
    destination: string;
    dimensions: string;
    weight: number;
    insuredValue: number;
    packaging: string;
    state: 'AVAILABLE' | 'INPROCESS' | 'COMPLETED'
}
