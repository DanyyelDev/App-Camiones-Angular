import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { CognitoService } from 'app/welcome/services/cognito.service'

export const roleGuard: CanActivateFn = () => {
	const router: Router = inject(Router)
	const cognitoService = inject(CognitoService)

	if (
		cognitoService.getUser().role === 'HGIO_ADMIN' ||
		cognitoService.getUser().role === 'ORG_ADMIN_RW' ||
		cognitoService.getUser().role === 'ORG_ADMIN_RO'
	) {
		return true
	}

	router.navigate(['/instrumentos'])
	return false
}

export const guestGuard: CanActivateFn = () => {
	const cognitoService = inject(CognitoService)
	const router: Router = inject(Router)

	if (cognitoService.getUser().role === 'GUEST') {
		return true
	}

	router.navigate(['/instrumentos/demograficas'])
	return false
}

export const orgGuard: CanActivateFn = () => {
	const cognitoService = inject(CognitoService)
	const router: Router = inject(Router)

	if (cognitoService.getUser().role === 'GUEST') {
		router.navigate(['/instrumentos/formguest'])
		return false
	}

	return true
}
