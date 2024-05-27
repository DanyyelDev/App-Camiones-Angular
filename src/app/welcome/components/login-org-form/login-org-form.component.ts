import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ErrorString } from 'app/shared/interfaces/shared-interfaces'
import { ValidatorsService } from 'app/shared/services/validators.service'
import { CognitoService } from 'app/welcome/services/cognito.service'
import { OrgLoginService } from 'app/welcome/services/org-login.service'
import { SignInOutput } from 'aws-amplify/auth'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-login-org-form',
	templateUrl: './login-org-form.component.html',
	styleUrls: ['../styles.css'],
})
export class LoginOrgFormComponent {
	@Input({ required: true }) orgCode!: string
	@Output() eventConfirmationSignUp = new EventEmitter<true>()
	@Output() updateUsername = new EventEmitter<string>()

	readonly fb = inject(FormBuilder)

	formLoginOrg: FormGroup = this.fb.group({
		documentType: ['CC', [Validators.required]],
		documentNumber: ['', [Validators.required]],
		password: ['', [Validators.required]],
	})

	private readonly notifications = inject(ToastrService)
	private readonly cognitoService = inject(CognitoService)
	private readonly orgLoginService = inject(OrgLoginService)
	private readonly validatorService = inject(ValidatorsService)
	private readonly router = inject(Router)

	private readonly listErrors: ErrorString[] = [
		{
			typeOfError: 'NotAuthorizedException',
			stringToShow: 'El usuario o la contraseña son incorrectos',
		},
		{
			typeOfError: 'UserNotFoundException',
			stringToShow: 'El usuario no existe',
		},
	]

	onSubmit() {
		if (this.formLoginOrg.invalid) {
			this.notifications.error('Valide el formulario')

			return
		}

		this.formLoginOrg.markAllAsTouched()

		this.cognitoService
			.signIn({
				username: this.orgLoginService.buildUsername({
					orgCode: this.orgCode,
					docType: this.formLoginOrg.get('documentType')?.value,
					docNumber: this.formLoginOrg.get('documentNumber')?.value,
				}),
				password: this.formLoginOrg.get('password')?.value,
			})
			.then(login => {
				this.verifiedNextStep(login)
			})
			.catch(error => {
				if (error instanceof Error) {
					this.validatorService.showError(error, this.listErrors)
				}
			})
			.finally(() => this.formLoginOrg.reset())
	}

	verifiedNextStep(responseLogin: SignInOutput) {
		const nextStep = responseLogin.nextStep.signInStep
		switch (nextStep) {
			case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
				this.cognitoService
					.completePassword(this.formLoginOrg.get('password')?.value)
					.then(signUpStatus => {
						if (signUpStatus.isSignedIn) {
							this.router.navigate(['/instrumentos'])
						}
					})
				break
			case 'CONFIRM_SIGN_UP':
				this.cognitoService.resendEmailCode(
					this.formLoginOrg.get('username')?.value
				)
				this.updateUsername.emit(this.formLoginOrg.get('username')?.value)
				this.eventConfirmationSignUp.emit(true)
				break

			case 'DONE':
				this.router.navigate(['/instrumentos'])
				break
		}
	}
}
