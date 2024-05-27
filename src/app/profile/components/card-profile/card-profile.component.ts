import { Component, computed, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CognitoService } from 'app/welcome/services/cognito.service'
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component'

@Component({
	selector: 'app-card-profile',
	templateUrl: './card-profile.component.html',
	styleUrls: ['./card-profile.component.css'],
})
export class CardProfileComponent {
	public user = computed(() => this.cognitoService.getUser())
	private readonly cognitoService = inject(CognitoService)
	private readonly dialog = inject(MatDialog)

	openDialog() {
		this.dialog.open(DialogDeleteAccountComponent)
	}
}
