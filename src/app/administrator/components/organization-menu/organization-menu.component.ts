import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CognitoService } from 'app/welcome/services/cognito.service'

interface ItemOrganization {
	label: string
	icon: string
	click: boolean
	url: string
}

const URL = '/home'

@Component({
	selector: 'app-organization-menu',
	templateUrl: './organization-menu.component.html',
	styleUrls: ['./organization-menu.component.css'],
})
export class OrganizationMenuComponent implements OnInit, OnDestroy {
	public itemsOrganization: ItemOrganization[] = [
		{ label: 'Mis Vehiculos', icon: 'local_shipping', click: false, url: `${URL}` },
		{
			label: 'solicitudes',
			icon: 'list_alt_add',
			click: false,
			url: `${URL}/request`,
		},
		{
			label: 'en proceso',
			icon: 'route',
			click: false,
			url: `${URL}/inprocess`,
		},
		{
			label: 'Registrar Vehiculo',
			icon: 'add_circle',
			click: false,
			url: `${URL}/crear`,
		},
	]

	private routerSuscription!: Subscription
	private readonly router = inject(Router)
	private readonly cognitoService = inject(CognitoService)

	ngOnInit(): void {
		const role = this.cognitoService.getUser().role

		this.updateItemRoute(this.router.url)

		this.routerSuscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.updateItemRoute(event.url)
			}
		})

		if (role === 'ORG_ADMIN_RO') {
			this.itemsOrganization.pop()
		}
	}

	ngOnDestroy(): void {
		this.routerSuscription.unsubscribe()
	}

	updateItemClicked(index: number) {
		this.itemsOrganization.forEach((item, i) => {
			item.click = i === index
		})
	}

	updateItemRoute(url: string) {
		this.itemsOrganization.forEach(item => {
			item.click = item.url === url
		})
	}
}
