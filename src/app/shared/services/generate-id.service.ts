import { Injectable } from '@angular/core'
import { customAlphabet } from 'nanoid'

const DEFAULT_SIZE = 13

@Injectable({
	providedIn: 'root',
})
export class GenerateIdService {
	private readonly alphabet = '123456789abcdefghijkmnopqrstuvwxyz'
	private readonly nanoid = customAlphabet(this.alphabet, DEFAULT_SIZE)

	generate(): string {
		return this.nanoid()
	}
}
