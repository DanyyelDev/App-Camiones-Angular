import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminPageComponent } from './page/admin-page/admin-page.component'
import { AdministratorRoutingModule } from './administrator-routing.module'
import { OrganizationMenuComponent } from './components/organization-menu/organization-menu.component'
import { MaterialModule } from '../material/material.module'
import { VehiclesCardComponent } from './components/vehicles-card/vehicles-card.component'
import { VehiclesRequestComponent } from './components/vehicles-request/vehicles-request.component'
import { EmployeeListCardComponent } from './components/employee-list-card/employee-list-card.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateInstrumentFormComponent } from './components/create-instrument-form/create-instrument-form.component'
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { RegisterVehicleComponent } from './components/register-vehicle/register-vehicle.component'
import { CreateCargoRequestComponent } from './components/createCargoRequest/create-cargo-request.component'

@NgModule({
	declarations: [
		AdminPageComponent,
		OrganizationMenuComponent,
		VehiclesCardComponent,
		VehiclesRequestComponent,
		EmployeeListCardComponent,
		CreateCargoRequestComponent,
		CreateInstrumentFormComponent,
		RegisterVehicleComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		AdministratorRoutingModule,
		FormsModule,
		CdkDropList,
		CdkDrag,
	],
	providers: [],
})
export class AdministratorModule { }
