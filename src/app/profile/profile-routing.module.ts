import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CardProfileComponent } from './components/card-profile/card-profile.component'
import { GuestHomeLayoutComponent } from 'app/instruments/pages/guest-home-layout/guest-home-layout.component'

const routes: Routes = [
	{
		path: '',
		component: GuestHomeLayoutComponent,
		children: [
			{
				path: '',
				component: CardProfileComponent,
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
