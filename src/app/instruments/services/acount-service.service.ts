import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PayloadFormGuest } from '../interfaces/countries.interface'
import { CognitoService } from 'app/welcome/services/cognito.service'
import { ToastrService } from 'ngx-toastr'
import { environment } from '@environment/environment'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private readonly cognitoService = inject(CognitoService)
	private readonly http = inject(HttpClient)
	private readonly router = inject(Router)
	private readonly toastrService = inject(ToastrService)
	private readonly _baseUrl = environment.serviceHost
	private readonly _headers = this.cognitoService.getToken()

	sendDataGuest(payload: PayloadFormGuest) {
		return this.http
			.put(`${this._baseUrl}/accounts/me`, payload, {
				headers: this._headers,
			})
			.pipe(
				tap(() => {
					this.router.navigate(['/instrumentos'])
					this.toastrService.info('Sus datos se registraron correctamente')
				}),
				catchError(error => {
					this.toastrService.error('Error al registrar datos de la cuenta')
					return throwError(error)
				})
			)
	}

	getDataGuest(): Observable<PayloadFormGuest> {
		return this.http
			.get<PayloadFormGuest>(`${this._baseUrl}/accounts/me`, {
				headers: this._headers,
			})
			.pipe(
				catchError(error => {
					console.log(error)
					return throwError(error)
				})
			)
	}
}
