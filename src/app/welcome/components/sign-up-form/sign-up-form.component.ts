import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ValidatorsService } from 'app/shared/services/validators.service'
import { CognitoService } from '../../services/cognito.service'
import { ErrorString } from 'app/shared/interfaces/shared-interfaces'
import { MatDialog } from '@angular/material/dialog'
import { DialogTermsComponent } from '../dialog-terms/dialog-terms.component'

const lengthPassword = 6

@Component({
	selector: 'app-sign-up-form',
	templateUrl: './sign-up-form.component.html',
	styleUrls: ['../styles.css'],
})
export class SignUpFormComponent {
	@Output() eventToogleForm = new EventEmitter<boolean>()
	@Output() eventUsername = new EventEmitter<string>()

	public signUpForm: FormGroup = this.fb.group(
		{
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[Validators.required, Validators.minLength(lengthPassword)],
			],
			passwordConfirmation: ['', [Validators.required]],
			termsAndConditions: [false, [Validators.requiredTrue]],
		},
		{
			validators: [
				this.validatorService.isFieldOneEqualFieldTwo(
					'password',
					'passwordConfirmation'
				),
			],
		}
	)

	private readonly errorMessages: { [key: string]: string } = {
		requiredemail: 'El campo de Email es obligatorio',
		requiredpassword: 'El campo de Contraseña es obligatorio',
		requiredtermsAndConditions: 'Debe aceptar los terminos y condiciones',
		emailemail:
			'Por favor, introduce una dirección de correo electrónico válida.',
		minlengthpassword: `La longitud mínima permitida de la contraseña
							es ${lengthPassword} caracteres.`,
		notEqualpasswordConfirmation: 'Las contraseñas no coinciden.',
	}

	private readonly listErrors: ErrorString[] = [
		{
			typeOfError: 'UserUnAuthenticatedException',
			stringToShow: 'Tiene que estar autenticado',
		},
		{
			typeOfError: 'UsernameExistsException',
			stringToShow: 'La cuenta ya ha sido creada',
		},
	]

	constructor(
		private readonly fb: FormBuilder,
		private readonly validatorService: ValidatorsService,
		private readonly cognitoService: CognitoService,
		private readonly dialog: MatDialog
	) {}

	openDialog() {
		this.dialog.open(DialogTermsComponent)
	}

	onSubmit() {
		if (this.signUpForm.invalid) {
			this.validatorService.getFormValidationError(
				this.signUpForm,
				this.errorMessages
			)
			return
		}

		this.signUpForm.markAllAsTouched()

		this.cognitoService
			.signUp({
				username: this.signUpForm.get('email')?.value,
				password: this.signUpForm.get('password')?.value,
			})
			.then(() => {
				this.eventUsername.emit(this.signUpForm.get('email')?.value)
				this.eventToogleForm.emit(true)
				this.signUpForm.reset()
			})
			.catch(error => {
				if (error instanceof Error) {
					this.validatorService.showError(error, this.listErrors)
				}
			})
	}
}
