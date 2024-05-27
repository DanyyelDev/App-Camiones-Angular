import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GuestHomeLayoutComponent } from './pages/guest-home-layout/guest-home-layout.component'
import { HelpSiteComponent } from './components/help-site/help-site.component'

const routes: Routes = [
	{
		path: '',
		component: GuestHomeLayoutComponent,
		children: [
			{
				path: 'help',
				component: HelpSiteComponent,
			},
			{
				path: '',
				loadChildren: () =>
					import('../administrator/administrator.module').then(
						m => m.AdministratorModule
					)
			},
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InstrumentsRoutingModule { }
