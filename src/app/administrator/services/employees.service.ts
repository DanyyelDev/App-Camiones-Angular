import { Injectable } from '@angular/core'
import { User } from '../interfaces/user'

@Injectable({ providedIn: 'root' })
export class EmployeesService {
	private readonly users: User[] = [
		{
			id: 1033820277,
			userType: 'CC',
			fullName: "Daniel Esteban Castañeda",
			email: "daniel@gmail.com",
			phone: "3228303371",
			address: "Cra 12 a #54 -07",
			status: "AVAILABLE",
		},
	]

	get getUsers() {
		return [...this.users]
	}
}
