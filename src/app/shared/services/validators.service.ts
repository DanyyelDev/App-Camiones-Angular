import { Injectable, inject } from '@angular/core'
import { FormGroup, ValidationErrors } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { ErrorString } from '../interfaces/shared-interfaces'

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
	private readonly notifications = inject(ToastrService)

	public isFieldOneEqualFieldTwo(field1: string, field2: string) {
		return (formGroup: FormGroup): ValidationErrors | null => {
			const fieldValue1 = formGroup.get(field1)?.value || ''
			const fieldValue2 = formGroup.get(field2)?.value || ''

			if (fieldValue1 !== fieldValue2) {
				formGroup.get(field2)?.setErrors({ notEqual: true })
				return { notEqual: true }
			}

			formGroup.get(field2)?.setErrors(null)

			return null
		}
	}

	public showError(error: Error, listOfErrors: ErrorString[]): void {
		const findIt = listOfErrors.find(e => error.message.includes(e.typeOfError))

		if (findIt) {
			this.notifications.error(findIt.stringToShow)
		}
	}

	public getFormValidationError(
		form: FormGroup,
		errorMessages: { [key: string]: string }
	): void {
		Object.keys(form.controls).forEach(key => {
			const control = form.get(key)

			if (control?.errors !== null && control?.errors) {
				console.log(control.errors)
				Object.keys(control.errors).forEach(keyError => {
					const errorMessage = errorMessages[keyError + key]

					if (errorMessage) {
						this.notifications.error(errorMessage)
					}
				})
			}
		})
	}
}
