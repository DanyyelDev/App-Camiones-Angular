import { NgModule } from '@angular/core'

import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips'
import { MatCardModule } from '@angular/material/card'

@NgModule({
	exports: [
		MatTabsModule,
		MatDialogModule,
		MatIconModule,
		MatStepperModule,
		MatListModule,
		MatDividerModule,
		MatChipsModule,
		MatCardModule,
	],
})
export class MaterialModule {}
