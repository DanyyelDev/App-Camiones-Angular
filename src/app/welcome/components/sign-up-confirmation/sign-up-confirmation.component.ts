import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CognitoService } from '../../services/cognito.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-sign-up-confirmation',
	templateUrl: './sign-up-confirmation.component.html',
	styleUrls: ['./sign-up-confirmation.component.css'],
})
export class SignUpConfirmationComponent {
	@Input() username!: string
	@Output() eventToogleForm = new EventEmitter<boolean>()

	public confirmationForm: FormGroup = this.fb.group({
		code: ['', [Validators.required]],
	})

	constructor(
		private readonly fb: FormBuilder,
		private readonly cognitoService: CognitoService,
		private readonly notifications: ToastrService
	) {}

	onSubmit() {
		if (this.confirmationForm.invalid) {
			return
		}

		this.cognitoService
			.confirmSignUp({
				username: this.username,
				confirmationCode: this.confirmationForm.get('code')?.value,
			})
			.then(login => {
				this.verifiedNextStep(login.nextStep.signUpStep)

				this.eventToogleForm.emit(false)
				this.confirmationForm.reset()
			})
			.catch(error => {
				if (error instanceof Error) {
					this.showError(error.message)
				}

				this.confirmationForm.reset()
			})
	}

	showError(error: string) {
		if (error.includes('CodeMismatchException')) {
			this.notifications.error('El código ingresado no es correcto')
		}
	}

	verifiedNextStep(nextStep: string) {
		switch (nextStep) {
			case 'COMPLETE_AUTO_SIGN_IN':
				this.cognitoService.signInAuto()
				break

			case 'DONE':
				break
		}
	}

	resendEmail() {
		this.cognitoService
			.resendEmailCode(this.username)
			.then(() => this.notifications.info('El código ha sido reenviado'))
	}

	cancelSignUp() {
		this.confirmationForm.reset()

		this.eventToogleForm.emit(false)
	}
}
