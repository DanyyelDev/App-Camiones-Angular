import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	templateUrl: './guest-home-layout.component.html',
	styleUrls: ['./guest-home-layout.component.css'],
})
export class GuestHomeLayoutComponent {
	public hgioLogo = '../../../../assets/imgs/logo-azka.webp'
	public hgioBackgroundCarrousel =
		'../../../../assets/imgs/carousel-wallpaper.webp'

	private readonly _router = inject(Router)

	redirectOnClick(route: string) {
		this._router.navigate([route])
	}
}
