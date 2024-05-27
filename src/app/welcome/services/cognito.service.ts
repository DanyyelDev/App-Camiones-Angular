import { HttpClient } from '@angular/common/http'
import {
	Injectable,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core'
import { Router } from '@angular/router'
import {
	ConfirmSignUpInput,
	SignInInput,
	SignUpInput,
	confirmSignUp,
	signIn,
	signOut,
	signUp,
	resendSignUpCode,
	autoSignIn,
	signInWithRedirect,
	resetPassword,
	ResetPasswordOutput,
	ConfirmResetPasswordInput,
	confirmResetPassword,
	getCurrentUser,
	fetchAuthSession,
	confirmSignIn,
	ConfirmSignInOutput,
} from 'aws-amplify/auth'
import { LoggedUser } from 'app/shared/interfaces/logged-user.interface'
import { AuthResponse } from '../interfaces/response-interfaces'
import { environment } from '@environment/environment'

@Injectable({
	providedIn: 'root',
})
export class CognitoService {
	private readonly router = inject(Router)
	private readonly http = inject(HttpClient)
	private readonly _baseUrl = environment.serviceHost
	private readonly user: WritableSignal<LoggedUser> = signal({
		displayName: '',
		email: '',
		role: 'GUEST',
		token: '',
		userId: '',
		username: '',
	})
	private readonly _userToken = signal('')
	private readonly _headers = computed(() => ({
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Authorization: 'Bearer ' + this._userToken(),
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'Content-Type': 'application/json',
	}))

	get getUser() {
		return this.user
	}

	getToken() {
		return this._headers()
	}

	async currentAuthenticatedUser(): Promise<boolean | Error> {
		try {
			const { username, userId } = await getCurrentUser()

			if (!username || !userId) {
				return false
			}

			const session = await this.currentSession()

			const token = session.accessToken?.toString()

			if (!token) {
				throw new Error('Token is missing')
			}

			this._userToken.set(token)

			const response: AuthResponse | undefined = await this.http
				.get<AuthResponse>(`${this._baseUrl}/auth/me`, {
					headers: this._headers(),
				})
				.toPromise()

			if (!response) {
				return false
			}

			const { email, role } = response

			this.user.set({
				displayName: email,
				email,
				token,
				userId,
				username,
				photoUrl: '../../../../assets/imgs/profile-default-image.png',
				role,
			})

			return true
		} catch (error) {
			return false
		}
	}

	async currentSession() {
		try {
			const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {}

			return { accessToken, idToken }
		} catch (err) {
			throw new Error('Error' + err)
		}
	}

	async signUp({ username, password }: SignUpInput) {
		try {
			const { isSignUpComplete, userId, nextStep } = await signUp({
				username,
				password,
				options: {
					userAttributes: {
						email: username,
					},
					autoSignIn: true,
				},
			})

			console.log(isSignUpComplete, userId, nextStep)
		} catch (error) {
			throw new Error('Error al crear cuenta: ' + error)
		}
	}

	async signIn({ username, password }: SignInInput) {
		try {
			const { isSignedIn, nextStep } = await signIn({
				username,
				password,
			})

			return { isSignedIn, nextStep }
		} catch (error) {
			throw new Error('Error al iniciar sesión: ' + error)
		}
	}

	async confirmSignUp({ username, confirmationCode }: ConfirmSignUpInput) {
		try {
			const { isSignUpComplete, nextStep } = await confirmSignUp({
				username,
				confirmationCode,
			})

			return { isSignUpComplete, nextStep }
		} catch (error) {
			throw new Error('Error al enviar codigo: ' + error)
		}
	}

	async completePassword(password: string): Promise<ConfirmSignInOutput> {
		try {
			const { nextStep, isSignedIn } = await confirmSignIn({
				challengeResponse: password,
			})

			return { isSignedIn, nextStep }
		} catch (error) {
			throw new Error('Error al enviar codigo: ' + error)
		}
	}

	async handleResetPassword(username: string): Promise<ResetPasswordOutput> {
		try {
			const output = await resetPassword({ username })

			return output
		} catch (error) {
			throw new Error('' + error)
		}
	}

	async changePassword({
		username,
		confirmationCode,
		newPassword,
	}: ConfirmResetPasswordInput) {
		try {
			await confirmResetPassword({ username, confirmationCode, newPassword })
		} catch (error) {
			throw new Error('Error al iniciar sesión: ' + error)
		}
	}

	singInRedirect() {
		signInWithRedirect({
			provider: 'Google',
		})
	}

	async resendEmailCode(user: string) {
		try {
			resendSignUpCode({
				username: user,
			})
		} catch (error) {
			console.log('error ', error)

			return
		}
	}

	async signOut() {
		try {
			await signOut().then(() => this.router.navigateByUrl(''))
		} catch (error) {
			console.error(error)
		}
	}

	async signInAuto() {
		try {
			await autoSignIn()
		} catch (error) {
			console.log(error)
		}
	}
}
