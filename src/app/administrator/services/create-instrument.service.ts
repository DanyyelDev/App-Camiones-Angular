import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
//import { Observable } from 'rxjs/internal/Observable'
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs/internal/observable/throwError'
import { ToastrService } from 'ngx-toastr'


import { CognitoService } from 'app/welcome/services/cognito.service'
import { environment } from '@environment/environment'
import { Vehicle } from 'app/shared/interfaces/Vehicle'
import { CargoRequest } from 'app/shared/interfaces/CargoRequest'

@Injectable({
	providedIn: 'root',
})
export class CreateInstrumentService {
	private readonly _baseUrl = environment.serviceHost
	private readonly _headers = this.cognitoService.getToken()

	constructor(
		private readonly http: HttpClient,
		private readonly toastr: ToastrService,
		private readonly cognitoService: CognitoService
	) { }

	registerVehicleDef(vehicle: Vehicle) {

		return this.http
			.post<Vehicle>(`${this._baseUrl}/instruments`, vehicle, {
				headers: this._headers,
			})
			.pipe(
				tap(() => {
					this.toastr.success('Instrumento cadastrado com sucesso!')
				}),
				catchError((error) => {
					this.toastr.error('Erro ao cadastrar instrumento!')
					return throwError(error)
				})
			)
	}

	

	registerCargoRequestDef(cargoRequest: CargoRequest) {

		return this.http
			.post<CargoRequest>(`${this._baseUrl}/instruments`, cargoRequest, {
				headers: this._headers,
			})
			.pipe(
				tap(() => {
					this.toastr.success('Instrumento cadastrado com sucesso!')
				}),
				catchError((error) => {
					this.toastr.error('Erro ao cadastrar instrumento!')
					return throwError(error)
				})
			)
	}
	/* 
		getInstrumentOnCreate(instrumentId: string): Observable<InstrumentState> {
			return this.http
				.get<InstrumentState>(`${this._baseUrl}/${instrumentId}/instrument-state`)
				.pipe(
					catchError(error => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		}
	
		getInstrument() {
			if (!this.instrumentInfo) {
				return
			}
	
			return this.instrumentInfo
		}
	
		createInstrumentDef(
			instrument: BaseInstrumentDef
		): Observable<BaseInstrumentDef> {
			const payload: BaseInstrumentDef = instrument
	
			return this.http
				.put<BaseInstrumentDef>(`${this._baseUrl}/instruments`, payload, {
					headers: this._headers,
				})
				.pipe(
					tap(() => {
						this.instrumentInfo = instrument
					}),
					catchError((error: HttpErrorResponse) => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		}
	
		createCategories(
			arrayCategories: Categories[],
			depthLevels: number,
			instrumentId: string
		): Observable<PayloadCategories> {
			const payload: PayloadCategories = {
				depthLevels,
				categories: arrayCategories,
			}
	
			return this.http
				.put<PayloadCategories>(
					`${this._baseUrl}/instruments/${instrumentId}/categories`,
					payload,
					{
						headers: this._headers,
					}
				)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		}
	
		createScales(
			arrayScales: Scale[],
			instrumentId: string
		): Observable<PayloadScales> {
			const payload: PayloadScales = {
				scale: arrayScales,
			}
	
			return this.http
				.put<PayloadScales>(
					`${this._baseUrl}/instruments/${instrumentId}/scale`,
					payload,
					{
						headers: this._headers,
					}
				)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		}
	
		async getScalesAndPrintJson(instrumentId: string) {
			const response = await this.http
				.get<Response>(`${this._baseUrl}/instruments/${instrumentId}/scale`, {
					headers: this._headers,
				})
				.toPromise()
			return JSON.stringify(response)
		}
	
		async getCategoriesAndPrintJson(instrumentId: string) {
			const response = await this.http
				.get<Response>(
					`${this._baseUrl}/instruments/${instrumentId}/categories?children=true`,
					{
						headers: this._headers,
					}
				)
				.toPromise()
			return JSON.stringify(response)
		}
	
		sendFormQuestions(body: Body, instrumentId: string): Observable<Body> {
			const payload: Body = {
				questions: body.questions,
			}
			console.log(payload)
	
			return this.http
				.put<Body>(
					`${this._baseUrl}/instruments/${instrumentId}/questions`,
					payload,
					{
						headers: this._headers,
					}
				)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		}
	
		sendFormMaturityLevel(
			maturityLevels: MaturityLevel[],
			instrumentId: string
		): Observable<PayloadMaturityLevels> {
			const payload: PayloadMaturityLevels = {
				maturityLevels,
			}
	
			return this.http
				.put<PayloadMaturityLevels>(
					`${this._baseUrl}/instruments/${instrumentId}/maturity-levels`,
					payload,
					{
						headers: this._headers,
					}
				)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						this.toastr.error('Ha ocurrido un error')
						return throwError(error)
					})
				)
		} */
}
