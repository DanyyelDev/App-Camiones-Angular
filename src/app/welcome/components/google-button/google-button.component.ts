import { Component, inject } from '@angular/core'
import { CognitoService } from '../../services/cognito.service'

@Component({
	selector: 'app-google-button',
	templateUrl: './google-button.component.html',
	styleUrls: ['../styles.css'],
})
export class GoogleButtonComponent {
	private readonly cognitoService = inject(CognitoService)

	googleLogin() {
		this.cognitoService.singInRedirect()
	}
}
