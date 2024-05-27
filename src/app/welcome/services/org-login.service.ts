import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from '@environment/environment'
import { Observable, map } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class OrgLoginService {
	private readonly http = inject(HttpClient)

	private readonly _baseUrl = environment.serviceHost

	getOrgName = (orgCode: string): Observable<string> =>
		this.http
			.get<{ name: string }>(`${this._baseUrl}/organizations/${orgCode}/name`)
			.pipe(map(it => it.name))

	buildUsername = (params: {
		orgCode: string
		docType: string
		docNumber: number
	}): string => `${params.orgCode}_${params.docType}_${params.docNumber}`
}
