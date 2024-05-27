import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileRoutingModule } from './profile-routing.module'
import { MaterialModule } from 'app/material/material.module'
import { CardProfileComponent } from './components/card-profile/card-profile.component'
import { DialogDeleteAccountComponent } from './components/dialog-delete-account/dialog-delete-account.component'

@NgModule({
	declarations: [CardProfileComponent, DialogDeleteAccountComponent],
	imports: [CommonModule, ProfileRoutingModule, MaterialModule],
})
export class ProfileModule {}
