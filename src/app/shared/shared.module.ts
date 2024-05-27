import { NgModule } from '@angular/core'
import { HelpButtonComponent } from './components/help-button/help-button.component'
import { MaterialModule } from '../material/material.module'
import { LoaderComponent } from './components/loader/loader.component'

@NgModule({
	imports: [MaterialModule],
	exports: [HelpButtonComponent, LoaderComponent],
	declarations: [HelpButtonComponent, LoaderComponent],
})
export class SharedModule {}
