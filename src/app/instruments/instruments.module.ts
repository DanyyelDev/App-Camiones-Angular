import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SurveyModule } from 'survey-angular-ui'
import { GuestHomeLayoutComponent } from './pages/guest-home-layout/guest-home-layout.component'
import { InstrumentsRoutingModule } from './instruments-routing.module'
import { MaterialModule } from '../material/material.module'
import { HomeProfileMenuComponent } from './components/home-profile-menu/home-profile-menu.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HelpSiteComponent } from './components/help-site/help-site.component'
import { SharedModule } from 'app/shared/shared.module'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
	declarations: [
		GuestHomeLayoutComponent,
		HomeProfileMenuComponent,
		HelpSiteComponent,
	],
	imports: [
		InstrumentsRoutingModule,
		CommonModule,
		SurveyModule,
		MaterialModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [HomeProfileMenuComponent],
	providers: [],
})
export class InstrumentsModule {}
