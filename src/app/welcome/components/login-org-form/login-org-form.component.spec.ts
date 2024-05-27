import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginOrgFormComponent } from './login-org-form.component'

describe('LoginOrgFormComponent', () => {
	let component: LoginOrgFormComponent
	let fixture: ComponentFixture<LoginOrgFormComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LoginOrgFormComponent],
		})
		fixture = TestBed.createComponent(LoginOrgFormComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
