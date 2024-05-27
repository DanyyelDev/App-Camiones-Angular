import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
	selector: 'app-dialog-terms',
	templateUrl: './dialog-terms.component.html',
})
export class DialogTermsComponent {
	constructor(public dialogRef: MatDialogRef<DialogTermsComponent>) {}
}
