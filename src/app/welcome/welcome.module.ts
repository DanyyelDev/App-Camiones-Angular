import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { WelcomeRoutingModule } from './welcome-routing.module'
import { MaterialModule } from '../material/material.module'
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { SharedModule } from '../shared/shared.module'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { SignUpConfirmationComponent } from './components/sign-up-confirmation/sign-up-confirmation.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { GoogleButtonComponent } from './components/google-button/google-button.component'
import { LoginOrgFormComponent } from './components/login-org-form/login-org-form.component'
import { ForgotPasswordOrgComponent } from './components/forgot-password-org/forgot-password-org.component'
import { DialogTermsComponent } from './components/dialog-terms/dialog-terms.component'

@NgModule({
	declarations: [
		WelcomePageComponent,
		SignUpFormComponent,
		LoginFormComponent,
		ForgotPasswordComponent,
		SignUpConfirmationComponent,
		ResetPasswordComponent,
		GoogleButtonComponent,
		LoginOrgFormComponent,
		ForgotPasswordOrgComponent,
		DialogTermsComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		WelcomeRoutingModule,
		MaterialModule,
		SharedModule,
	],
	providers: [],
})
export class WelcomeModule {}
