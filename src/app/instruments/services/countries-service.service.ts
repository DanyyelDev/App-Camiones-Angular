import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { State } from '../interfaces/countries.interface'
import { CognitoService } from 'app/welcome/services/cognito.service'
import { environment } from '@environment/environment'
import { Observable, catchError, throwError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
	providedIn: 'root',
})
export class CountriesService {
	private readonly http = inject(HttpClient)
	private readonly cognitoService = inject(CognitoService)
	private readonly toastrService = inject(ToastrService)
	private readonly _baseUrl = environment.serviceHost
	private readonly _headers = this.cognitoService.getToken()

	getCountries(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this._baseUrl}/constants/countries`, {
				headers: this._headers,
			})
			.pipe(
				catchError(error => {
					this.toastrService.error('Ya existe una respuesta del instrumento')
					return throwError(error)
				})
			)
	}

	getStatesByCountry(name: string): Observable<State[]> {
		const country = encodeURIComponent(name)
		return this.http
			.get<State[]>(`${this._baseUrl}/constants/countries/${country}/states`, {
				headers: this._headers,
			})
			.pipe(
				catchError(error => {
					this.toastrService.error('Ya existe una respuesta del instrumento')
					return throwError(() => error)
				})
			)
	}
}
