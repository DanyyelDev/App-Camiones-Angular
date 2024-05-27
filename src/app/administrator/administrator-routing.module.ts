import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminPageComponent } from './page/admin-page/admin-page.component'
import { VehiclesCardComponent } from './components/vehicles-card/vehicles-card.component'
import { VehiclesRequestComponent } from './components/vehicles-request/vehicles-request.component'
import { EmployeeListCardComponent } from './components/employee-list-card/employee-list-card.component'
import { RegisterVehicleComponent } from './components/register-vehicle/register-vehicle.component'

const routes: Routes = [
	{
		path: '',
		component: AdminPageComponent,
		children: [
			{
				path: '',
				component: VehiclesCardComponent,
			},
			{
				path: 'request',
				component: VehiclesRequestComponent,
			},
			{
				path: 'inprocess',
				component: EmployeeListCardComponent,
			},
			{
				path: 'crear',
				component: RegisterVehicleComponent,
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdministratorRoutingModule {}
