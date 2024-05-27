import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { canActivateGuardLogin } from './welcome/guards/auth.guard'
import { canActivateGuard } from './welcome/guards/public.guard'

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./welcome/welcome.module').then(m => m.WelcomeModule),
		canActivate: [canActivateGuard],
	},
	{
		path: 'home',
		loadChildren: () =>
			import('./instruments/instruments.module').then(m => m.InstrumentsModule),
		canActivate: [canActivateGuardLogin],
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('./profile/profile.module').then(m => m.ProfileModule),
		canActivate: [canActivateGuardLogin],
	},
	{
		path: '**',
		redirectTo: '',
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
