import { Component, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateInstrumentService } from '../../services/create-instrument.service'
import { ToastrService } from 'ngx-toastr'
import { Vehicle } from 'app/shared/interfaces/Vehicle'

@Component({
	selector: 'app-create-instrument-form',
	templateUrl: './create-instrument-form.component.html',
	styleUrls: ['./create-instrument-form.component.css'],
})
export class CreateInstrumentFormComponent implements OnInit {
	vehicleForm!: FormGroup

	private readonly createInstrumentService = inject(CreateInstrumentService)
	private readonly toastrService = inject(ToastrService)

	ngOnInit(): void {
		this.vehicleForm = new FormGroup({
			plateNumber: new FormControl('', Validators.required),
			brand: new FormControl('', Validators.required),
			model: new FormControl('', Validators.required),
			cargoCapacity: new FormControl('', Validators.required),
			bodyType: new FormControl('', Validators.required),
			idOwner: new FormControl('', Validators.required),
			driver: new FormControl('', Validators.required),
			location: new FormControl('', Validators.required),
		})
	}

	onSubmit() {
		if (this.vehicleForm.valid) {
			const { plateNumber, brand, model, cargoCapacity, bodyType, idOwner, driver, location } = this.vehicleForm.value

			const vehicleDef: Vehicle = {
				id: 0,
				plateNumber,
				brand,
				model,
				cargoCapacity,
				bodyType,
				idOwner,
				driver,
				location,
				status: 'AVAILABLE'
			}

			console.log(vehicleDef);
			

			this.createInstrumentService
				.registerVehicleDef(vehicleDef)
				.subscribe({
					next: response => {
						this.toastrService.success('Instrumento creado' + response)
					},
					error: error => {
						this.toastrService.error('Error al crear el instrumento:', error)
					},
				})
		}
	}
}
