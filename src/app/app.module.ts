import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SharedModule } from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http'
import { environment } from '@environment/environment'

Amplify.configure(environment.config as ResourcesConfig)

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
