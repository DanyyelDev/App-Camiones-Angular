/* eslint-disable @typescript-eslint/naming-convention */

export interface Environment {
	production: boolean
	serviceHost: string
	config: {
		Auth: {
			Cognito: {
				userPoolId?: string
				userPoolClientId?: string
				identityPoolId?: string
				region?: string
				mandatorySignIn?: boolean
				loginWith: {
					oauth: {
						domain: string
						scopes: string[]
						redirectSignIn: string | string[]
						redirectSignOut: string | string[]
						responseType: string
						options?: object
					}
				}
				refreshHandlers?: object
				authenticationFlowType?: string
				identityPoolRegion?: string
				endpoint?: string
			}
		}
	}
}
