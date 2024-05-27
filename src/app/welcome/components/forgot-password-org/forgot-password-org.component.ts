import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { CognitoService } from '../../services/cognito.service'
import { ResetPasswordOutput } from 'aws-amplify/auth'
import { OrgLoginService } from 'app/welcome/services/org-login.service'

@Component({
	selector: 'app-forgot-password-org',
	templateUrl: './forgot-password-org.component.html',
	styleUrls: ['../styles.css'],
})
export class ForgotPasswordOrgComponent {
	@Input({ required: true }) orgCode!: string
	@Output() eventToggleForgotPass = new EventEmitter<boolean>()
	@Output() eventUsername = new EventEmitter<string>()

	public forgotPassOrgForm: FormGroup = this.fb.group({
		recoveryDocType: ['CC', [Validators.required]],
		recoveryDocNumber: ['', [Validators.required]],
	})

	private readonly orgLoginService = inject(OrgLoginService)

	constructor(
		private readonly fb: FormBuilder,
		private readonly notifications: ToastrService,
		private readonly cognitoService: CognitoService
	) {}

	onSubmit() {
		const username = this.buildUsername()

		if (this.forgotPassOrgForm.invalid) {
			this.notifications.error('Verifique la información')
			return
		}

		this.cognitoService
			.handleResetPassword(username)
			.then(nextStep => {
				this.verifiedNextStep(nextStep)
				this.forgotPassOrgForm.reset()
			})
			.catch(error => {
				if (error instanceof Error) {
					this.showError(error.message)
				}
			})

		this.forgotPassOrgForm.markAllAsTouched()
	}

	verifiedNextStep(nextStep: ResetPasswordOutput) {
		switch (nextStep.nextStep.resetPasswordStep) {
			case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
				this.eventUsername.emit(this.buildUsername())
				this.eventToggleForgotPass.emit(true)
				break
			case 'DONE':
				this.notifications.info('La contraseña ya fue cambiada')
				break
		}
	}

	showError(error: string) {
		if (error.includes('UserNotFoundException')) {
			this.notifications.error('El usuario no existe en la organización')
		} else if (error.includes('LimitExceededException')) {
			this.notifications.error(
				'Limite de tiempo excedido, intente en unos minutos'
			)
		}
	}

	private readonly buildUsername = (): string =>
		this.orgLoginService.buildUsername({
			orgCode: this.orgCode,
			docType: this.forgotPassOrgForm.get('recoveryDocType')?.value,
			docNumber: this.forgotPassOrgForm.get('recoveryDocNumber')?.value,
		})
}
