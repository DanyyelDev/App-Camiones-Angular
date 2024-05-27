import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ForgotPasswordOrgComponent } from './forgot-password-org.component'

describe('ForgotPasswordOrgComponent', () => {
	let component: ForgotPasswordOrgComponent
	let fixture: ComponentFixture<ForgotPasswordOrgComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ForgotPasswordOrgComponent],
		})
		fixture = TestBed.createComponent(ForgotPasswordOrgComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
