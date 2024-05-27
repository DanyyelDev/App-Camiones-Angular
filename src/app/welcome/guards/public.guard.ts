import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { CognitoService } from '../services/cognito.service'

const checkAuthStatus = (): Promise<boolean> => {
	const cognitoService: CognitoService = inject(CognitoService)
	const router: Router = inject(Router)

	return cognitoService.currentAuthenticatedUser().then(isAuthenticated => {
		if (isAuthenticated) {
			router.navigate(['/instrumentos'])
			return false
		}

		return true
	})
}

export const canActivateGuard: CanActivateFn = () => checkAuthStatus()
