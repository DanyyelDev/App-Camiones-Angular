/* eslint-disable @typescript-eslint/naming-convention */
import { Environment } from './env.model'

export const environment: Environment = {
	production: true,
	serviceHost: 'http://localhost:3000/api/',
	config: {
		Auth: {
			Cognito: {
				userPoolId: 'us-east-1_AY5a5nPG6',
				userPoolClientId: '3po3e1bqmi1mva12fm3vtl8lks',
				region: 'us-east-1',
				loginWith: {
					oauth: {
						domain: 'hgio-prd-appinstruments-auth.hgio.co',
						scopes: [
							'email',
							'profile',
							'openid',
							'aws.cognito.signin.user.admin',
						],
						redirectSignIn: ['https://app.hgio.co'],
						redirectSignOut: ['https://app.hgio.co'],
						responseType: 'code',
					},
				},
			},
		},
	}
}
