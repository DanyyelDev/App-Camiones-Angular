import { Component, OnInit, inject } from '@angular/core'
import { InstrumentsService } from 'app/instruments/services/instruments-service.service'
import { Vehicle } from 'app/shared/interfaces/Vehicle'

@Component({
	selector: 'app-vehicles-list-reports',
	templateUrl: './vehicles-request.component.html',
	styleUrls: ['../../administrator-options.styles.css'],
})
export class VehiclesRequestComponent implements OnInit {
	public vehicles!: Vehicle[]
	private readonly instrumentService = inject(InstrumentsService)

	ngOnInit(): void {
		this.vehicles = this.instrumentService.getVehicles()
	}
}
