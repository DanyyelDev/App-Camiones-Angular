import { Component, ViewChild, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTabGroup } from '@angular/material/tabs'
import { HelpButtonComponent } from 'app/shared/components/help-button/help-button.component'

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent {
	@ViewChild(MatTabGroup) tabGroup!: MatTabGroup

	public pathBackground = '../../../../assets/imgs/login-background.webp'
	public hgioLogo = '../../../../assets/imgs/logo-azka.webp'
	public passwordForget = false
	public textButton: 'Olvide mi contraseña' | 'Volver a inicio de sesión' =
		'Olvide mi contraseña'
	public toogleForm = false
	public toogleForgotPassword = false
	public username = ''

	public stateLogin = true
	public stateRegister = false

	private readonly dialog = inject(MatDialog)

	openDialog() {
		this.dialog.open(HelpButtonComponent, {
			width: '30%',
			height: '500px',
		})
	}

	setToggle() {
		this.stateLogin = !this.stateLogin
	}

	forgotPassword() {
		this.passwordForget = !this.passwordForget
		this.toogleForgotPassword = false
		if (this.passwordForget) {
			this.textButton = 'Volver a inicio de sesión'
		} else {
			this.textButton = 'Olvide mi contraseña'
		}
	}

	updateUsername(username: string) {
		this.username = username
	}

	changeForm(toogle: boolean) {
		this.toogleForm = toogle
		if (!toogle) {
			this.tabGroup.selectedIndex = 0
		}
	}

	changeForgotForm(toogle: boolean) {
		if (!toogle) {
			this.passwordForget = false
		}

		this.toogleForgotPassword = toogle

		if (this.passwordForget) {
			this.textButton = 'Volver a inicio de sesión'
		} else {
			this.textButton = 'Olvide mi contraseña'
		}
	}

	changeTab() {
		this.tabGroup.selectedIndex = 1
		this.toogleForm = true
	}
}
