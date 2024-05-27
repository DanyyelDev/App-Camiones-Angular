import { Injectable, inject } from '@angular/core'
import { Vehicle } from 'app/shared/interfaces/Vehicle'
/* import { Observable, catchError, of, tap, throwError } from 'rxjs' */
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { CognitoService } from 'app/welcome/services/cognito.service'
import { environment } from '@environment/environment'

@Injectable({
	providedIn: 'root',
})
export class InstrumentsService {
	private readonly cognitoService = inject(CognitoService)
	private readonly http = inject(HttpClient)
	private readonly toastrService = inject(ToastrService)
	private readonly _baseUrl = environment.serviceHost
	private readonly _headers = this.cognitoService.getToken()

	private readonly vehicles: Vehicle[] = [
		{
			id: 1,
			plateNumber: 'TYF123',
			brand: 'Toyota',
			model: 'Hilux',
			cargoCapacity: 1500.00,
			bodyType: 'Camioneta Pickup',
			idOwner: 1,
			driver: 2,
			location: 'Colombia',
			status: 'AVAILABLE',
		},
		{
			id: 1,
			plateNumber: 'TYF123',
			brand: 'Toyota',
			model: 'Hilux',
			cargoCapacity: 1500.00,
			bodyType: 'Camioneta Pickup',
			idOwner: 1,
			driver: 2,
			location: 'Colombia',
			status: 'AVAILABLE',
		},
	]

	getVehicles() {
		return this.vehicles
	}

	/* getResultInstrumentSurvey() {
		return this.http
			.get<ResultInstrument>(
				`${this._baseUrl}/instruments/${this.instrumentSelected?.id}/result`,
				{
					headers: this._headers,
				}
			)
			.pipe(
				catchError(error => {
					this.toastrService.info('No hay respuesta registrada del instrumento')
					return throwError(error)
				})
			)
	}

	getResultInstruments() {
		return this.http
			.get<ResultInstrument>(
				`${this._baseUrl}/instruments/${this.instrumentSelected?.id}/result`,
				{
					headers: this._headers,
				}
			)
			.pipe(
				catchError(error => {
					this.toastrService.info('No hay respuesta registrada del instrumento')
					return throwError(error)
				})
			)
	}

	getInstrumentsComplete(): Observable<string[]> {
		return this.http
			.get<string[]>(`${this._baseUrl}/instruments/all/responses/completed`, {
				headers: this._headers,
			})
			.pipe(
				catchError(error => {
					this.toastrService.info('No hay respuesta registrada del instrumento')
					return throwError(error)
				})
			)
	}

	getSurveyJson(): Observable<SurveyResponse> {
		return this.http
			.get<SurveyResponse>(
				`${this._baseUrl}/instruments/${this.instrumentSelected?.id}/surveyJs`,
				{
					headers: this._headers,
				}
			)
			.pipe(
				catchError(error => {
					this.toastrService.error('Hubo un error al obtener el instrumento')
					return throwError(error)
				})
			)
	}

	

	async getResultEchartsAndPrintJson(
		instrumentId: string
	): Promise<DataEchartReport> {
		const response = await this.http
			.get<DataEchartReport>(
				`${this._baseUrl}/instruments/${instrumentId}/result/echarts`,
				{
					headers: this._headers,
				}
			)
			.toPromise()
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return response!
	} */
}
