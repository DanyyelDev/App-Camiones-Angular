export interface User {
    id: number;
    userType: 'CC' | 'CE';
    fullName: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}
