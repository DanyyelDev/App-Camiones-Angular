import { Component, signal } from '@angular/core'
import { CreateInstrumentFormComponent } from 'app/administrator/components/create-instrument-form/create-instrument-form.component'

@Component({
	templateUrl: './admin-page.component.html',
	styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
	public addCardRoot = signal(false)

	onActivate(component: object) {
		if (component instanceof CreateInstrumentFormComponent) {
			this.addCardRoot.set(true)
		} else {
			this.addCardRoot.set(false)
		}
	}
}
