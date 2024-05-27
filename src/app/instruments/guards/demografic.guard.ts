import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AccountService } from '../services/acount-service.service'
import { CognitoService } from 'app/welcome/services/cognito.service'

export const demograficGuard: CanActivateFn = () => {
	const accountService = inject(AccountService)
	const cognitoService = inject(CognitoService)
	const router = inject(Router)

	accountService.getDataGuest().subscribe(payload => {
		if (cognitoService.getUser().role === 'GUEST') {
			if (Object.hasOwn(payload, 'city')) {
				router.navigate(['/instrumentos'])
				return false
			}
			router.navigate(['/instrumentos/formguest'])
		} else if (cognitoService.getUser().role === 'HGIO_ADMIN') {
		} else {
			router.navigate(['/instrumentos/demograficas'])
		}
		return false
	})

	return true
}
