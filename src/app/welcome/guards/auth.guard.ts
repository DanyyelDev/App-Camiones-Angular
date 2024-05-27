import { CanActivateFn, CanMatchFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { CognitoService } from '../services/cognito.service'

const checkAuthStatus = (): Promise<boolean> => {
	const cognitoService: CognitoService = inject(CognitoService)
	const router: Router = inject(Router)

	return cognitoService
		.currentAuthenticatedUser()
		.then(isAuthenticated => {
			if (!isAuthenticated) {
				router.navigate(['/'])
				return false
			}

			return true
		})
		.catch(() => false)
}

export const canActivateGuardLogin: CanActivateFn = () => checkAuthStatus()

export const canMatchGuardLogin: CanMatchFn = () => checkAuthStatus()
