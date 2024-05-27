import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { CognitoService } from '../../services/cognito.service'
import { ResetPasswordOutput } from 'aws-amplify/auth'

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['../styles.css'],
})
export class ForgotPasswordComponent {
	@Output() eventToogleForgotPass = new EventEmitter<boolean>()
	@Output() eventUsername = new EventEmitter<string>()

	public forgotPassForm: FormGroup = this.fb.group({
		document: ['', [Validators.required, Validators.email]],
	})

	constructor(
		private readonly fb: FormBuilder,
		private readonly notifications: ToastrService,
		private readonly cognitoService: CognitoService
	) {}

	onSubmit() {
		const doc = this.forgotPassForm.get('document')?.value

		if (this.forgotPassForm.invalid) {
			this.notifications.error('Verifique la informacion')

			return
		}

		this.cognitoService
			.handleResetPassword(doc)
			.then(nextStep => {
				this.verifiedNextStep(nextStep)

				this.forgotPassForm.reset()
			})
			.catch(error => {
				if (error instanceof Error) {
					this.showError(error.message)
				}
			})

		this.forgotPassForm.markAllAsTouched()
	}

	verifiedNextStep(nextStep: ResetPasswordOutput) {
		const next = nextStep.nextStep.resetPasswordStep

		switch (next) {
			case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
				this.eventUsername.emit(this.forgotPassForm.get('document')?.value)
				this.eventToogleForgotPass.emit(true)
				break

			case 'DONE':
				this.notifications.info('La contraseña ya fue cambiada')
				break
		}
	}

	showError(error: string) {
		if (error.includes('UserNotFoundException')) {
			this.notifications.error('El correo no esta registrado')
		} else if (error.includes('LimitExceededException')) {
			this.notifications.error(
				'Limite de tiempo excedido, intente en unos minutos'
			)
		}
	}
}
