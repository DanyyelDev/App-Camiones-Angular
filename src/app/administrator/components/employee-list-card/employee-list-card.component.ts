import {
	Component,
	Input,
	OnInit,
	Signal,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core'
import { User } from '../../interfaces/user'
import { EmployeesService } from '../../services/employees.service'
import { ToastrService } from 'ngx-toastr'

const MAX_EMPLOYEES = 5

@Component({
	selector: 'app-employee-list-card',
	templateUrl: './employee-list-card.component.html',
	styleUrls: ['../../administrator-options.styles.css'],
})
export class EmployeeListCardComponent implements OnInit {
	@Input() showFillOut = false
	@Input() title = 'Colaboradores registrados en la plataforma'

	public currentRecord: WritableSignal<number> = signal(0)
	public lastRecord: WritableSignal<number> = signal(0)
	public listEmployees: WritableSignal<User[]> = signal([])

	public lengthListEmployees: Signal<number> = computed(
		() => this.listEmployees().length
	)
	public listEmployeesToShow: Signal<User[]> = computed(() =>
		this.listEmployees().slice(this.currentRecord(), this.lastRecord())
	)
	public isLastPage: Signal<boolean> = computed(
		() => this.lastRecord() >= this.listEmployees().length
	)

	private readonly employeesService = inject(EmployeesService)
	private readonly toastrService = inject(ToastrService)

	ngOnInit(): void {
		this.listEmployees.set(this.employeesService.getUsers)
		this.lastRecord.set(MAX_EMPLOYEES)
	}

	next() {
		if (this.currentRecord() + MAX_EMPLOYEES < this.listEmployees().length) {
			this.currentRecord.set(this.currentRecord() + MAX_EMPLOYEES)
			this.lastRecord.set(this.lastRecord() + MAX_EMPLOYEES)
		} else {
			this.toastrService.error('No hay más usuarios que mostrar')
		}
	}

	back() {
		if (this.currentRecord() - MAX_EMPLOYEES >= 0) {
			this.currentRecord.set(this.currentRecord() - MAX_EMPLOYEES)
			this.lastRecord.set(this.lastRecord() - MAX_EMPLOYEES)
		} else {
			this.toastrService.error('No hay más usuarios que mostrar')
		}
	}
}
