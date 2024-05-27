import { Component, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateInstrumentService } from 'app/administrator/services/create-instrument.service'
import { CargoRequest } from 'app/shared/interfaces/CargoRequest'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-create-cargo-request',
	templateUrl: './create-cargo-request.component.html',
	styleUrls: ['./create-cargo.request.component.css'],
})
export class CreateCargoRequestComponent implements OnInit {
	requestForm!: FormGroup

	private readonly createInstrumentService = inject(CreateInstrumentService)
	private readonly toastrService = inject(ToastrService)

	ngOnInit(): void {
		this.requestForm = new FormGroup({
			requestDate: new FormControl('', Validators.required),
			cargoOwnerId: new FormControl('', Validators.required),
			origin: new FormControl('', Validators.required),
			destination: new FormControl('', Validators.required),
			dimensions: new FormControl('', Validators.required),
			weight: new FormControl('', Validators.required),
			insuredValue: new FormControl('', Validators.required),
			packaging: new FormControl('', Validators.required),
		})
	}

	onSubmit() {
		if (this.requestForm.valid) {
			const { requestDate, cargoOwnerId, origin, destination, dimensions, weight, insuredValue, packaging } = this.requestForm.value

			const cargoRequestDef: CargoRequest = {
				id: 0,
				requestDate,
				cargoOwnerId,
				origin,
				destination,
				dimensions,
				weight,
				insuredValue,
				packaging,
				state: 'AVAILABLE'
			}

			console.log(cargoRequestDef);
			

			this.createInstrumentService
				.registerCargoRequestDef(cargoRequestDef)
				.subscribe({
					next: response => {
						this.toastrService.success('Solicitud de carga creada' + response)
					},
					error: error => {
						this.toastrService.error('Error al crear solicitud de carga:', error)
					},
				})
		}
	}
}
