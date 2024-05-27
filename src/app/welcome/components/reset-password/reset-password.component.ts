import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CognitoService } from '../../services/cognito.service'
import { ToastrService } from 'ngx-toastr'
import { ResetPasswordOutput } from 'aws-amplify/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidatorsService } from 'app/shared/services/validators.service'
import { ErrorString } from 'app/shared/interfaces/shared-interfaces'

const lengthPassword = 6

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['../styles.css'],
})
export class ResetPasswordComponent {
	@Output() eventCancelReset = new EventEmitter<boolean>()
	@Output() eventResetForm = new EventEmitter<true>()
	@Input() username?: string

	public resetPassForm: FormGroup = this.fb.group(
		{
			code: ['', [Validators.required]],
			newPass: [
				'',
				[Validators.required, Validators.minLength(lengthPassword)],
			],
			confPass: ['', [Validators.required]],
		},
		{
			validators: [
				this.validatorService.isFieldOneEqualFieldTwo('newPass', 'confPass'),
			],
		}
	)

	private readonly listErrors: ErrorString[] = [
		{
			typeOfError: 'UserNotFoundException',
			stringToShow: 'El correo no esta registrado',
		},
		{
			typeOfError: 'LimitExceededException',
			stringToShow: 'Limite de tiempo excedido, intente en unos minutos',
		},
		{
			typeOfError: 'CodeMismatchException',
			stringToShow: 'El código no es correcto',
		},
	]

	private readonly errorMessages: { [key: string]: string } = {
		requiredcode: 'El campo de codigo es obligatorio',
		requirednewPass: 'El campo de nueva contraseña es obligatorio',
		minlengthnewPass: `La longitud mínima permitida de la contraseña
              es ${lengthPassword} caracteres.`,
		notEqualconfPass: 'Las contraseñas no coinciden.',
	}

	constructor(
		private readonly cognitoService: CognitoService,
		private readonly notifications: ToastrService,
		private readonly validatorService: ValidatorsService,
		private readonly fb: FormBuilder
	) {}

	onSubmit() {
		if (this.resetPassForm.invalid) {
			this.validatorService.getFormValidationError(
				this.resetPassForm,
				this.errorMessages
			)
			return
		}

		if (!this.username) {
			return
		}

		this.resetPassForm.markAllAsTouched()

		this.cognitoService
			.changePassword({
				username: this.username,
				confirmationCode: this.resetPassForm.get('code')?.value,
				newPassword: this.resetPassForm.get('newPass')?.value,
			})
			.then(() => {
				this.notifications.info('Se ha cambiado la contraseña')
				this.resetPassForm.reset()
				this.eventResetForm.emit(true)
			})
			.catch(error => {
				if (error instanceof Error) {
					this.validatorService.showError(error, this.listErrors)
				}
			})
	}

	resend() {
		if (!this.username) {
			return
		}

		this.cognitoService
			.handleResetPassword(this.username)
			.then(nextStep => {
				this.verifiedNextStep(nextStep)
			})
			.catch(error => {
				if (error instanceof Error) {
					this.validatorService.showError(error, this.listErrors)
				}
			})
	}

	cancel() {
		this.eventCancelReset.emit(false)
	}

	verifiedNextStep(nextStep: ResetPasswordOutput) {
		const next = nextStep.nextStep.resetPasswordStep

		switch (next) {
			case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
				this.notifications.info('Se reenvio el codigo')
				break

			case 'DONE':
				this.notifications.info('La contraseña ya fue cambiada')
				break
		}
	}
}
