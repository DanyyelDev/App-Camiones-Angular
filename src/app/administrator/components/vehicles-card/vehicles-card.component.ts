import { Component, OnInit, inject } from '@angular/core'
import { InstrumentsService } from 'app/instruments/services/instruments-service.service'
import { Vehicle } from 'app/shared/interfaces/Vehicle'

@Component({
	selector: 'app-paid-instruments-card',
	templateUrl: './vehicles-card.component.html',
	styleUrls: ['../../administrator-options.styles.css'],
})
export class VehiclesCardComponent implements OnInit {
	public vehicles: Vehicle[] = []
	private readonly instrumentService = inject(InstrumentsService)

	ngOnInit(): void {
		this.vehicles = this.instrumentService.getVehicles()
	}
}
