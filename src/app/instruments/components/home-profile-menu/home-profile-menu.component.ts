import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { CognitoService } from 'app/welcome/services/cognito.service'

const ENTER_NUMBER = 13

@Component({
	selector: 'app-home-profile-menu',
	templateUrl: './home-profile-menu.component.html',
	styleUrls: ['./home-profile-menu.component.css'],
})
export class HomeProfileMenuComponent {
	public profileMenu = true
	public cognitoService = inject(CognitoService)
	public displayName = this.cognitoService.getUser().displayName
	public photoUrl = this.cognitoService.getUser().photoUrl
	private readonly router = inject(Router)

	toggleComponent() {
		this.profileMenu = !this.profileMenu
	}

	profile() {
		this.router.navigateByUrl('/profile')
	}

	handleKeyUp(event: KeyboardEvent) {
		if (event.keyCode === ENTER_NUMBER) {
			this.signOut()
		}
	}

	keyUp(event: KeyboardEvent) {
		if (event.keyCode === ENTER_NUMBER) {
			this.goHome()
		}
	}

	goHome() {
		this.router.navigate(['/instrumentos'])
	}

	signOut() {
		this.cognitoService.signOut()
	}
}
