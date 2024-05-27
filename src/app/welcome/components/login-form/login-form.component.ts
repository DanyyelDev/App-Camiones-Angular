import {
	Component,
	EventEmitter,
	Output,
	WritableSignal,
	signal,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { SignInOutput } from 'aws-amplify/auth'
import { HelpButtonComponent } from 'app/shared/components/help-button/help-button.component'
import { CognitoService } from '../../services/cognito.service'
import { ErrorString } from 'app/shared/interfaces/shared-interfaces'
import { ValidatorsService } from 'app/shared/services/validators.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['../styles.css'],
})
export class LoginFormComponent {
	@Output() eventConfirmationSignUp = new EventEmitter<true>()
	@Output() updateUsername = new EventEmitter<string>()
	public loading: WritableSignal<boolean> = signal(false)

	public formLogin: FormGroup = this.fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]],
	})

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

	constructor(
		private readonly dialog: MatDialog,
		private readonly fb: FormBuilder,
		private readonly notifications: ToastrService,
		private readonly cognitoService: CognitoService,
		private readonly validatorService: ValidatorsService,
		private readonly router: Router
	) {}

	openDialog() {
		this.dialog.open(HelpButtonComponent, {
			width: '30%',
			height: '500px',
		})
	}

	onSubmit() {
		if (this.formLogin.invalid) {
			this.notifications.error('Valide el formulario')
			return
		}
		this.loading.set(true)
		this.formLogin.markAllAsTouched()

		this.cognitoService
			.signIn({
				username: this.formLogin.get('username')?.value,
				password: this.formLogin.get('password')?.value,
			})
			.then(login => {
				this.verifiedNextStep(login)
			})
			.catch(error => {
				if (error instanceof Error) {
					this.validatorService.showError(error, this.listErrors)
				}
			})
			.finally(() => this.formLogin.reset())
	}

	verifiedNextStep(responseLogin: SignInOutput) {
		const nextStep = responseLogin.nextStep.signInStep
		switch (nextStep) {
			case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
				this.cognitoService
					.completePassword(this.formLogin.get('password')?.value)
					.then(signUpStatus => {
						if (signUpStatus.isSignedIn) {
							this.router.navigate(['/instrumentos'])
						}
					})
				break
			case 'CONFIRM_SIGN_UP':
				this.cognitoService.resendEmailCode(
					this.formLogin.get('username')?.value
				)
				this.updateUsername.emit(this.formLogin.get('username')?.value)
				this.eventConfirmationSignUp.emit(true)
				break

			case 'DONE':
				this.router.navigate(['/instrumentos'])
				break
		}
	}
}
