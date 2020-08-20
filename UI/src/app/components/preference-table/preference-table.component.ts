import {Component, OnInit, Input} from '@angular/core';
import {IEmployee, Employee} from 'src/app/models/preference.model';

@Component({selector: 'app-preference-table', templateUrl: './preference-table.component.html', styleUrls: ['./preference-table.component.scss']})
export class PreferenceTableComponent implements OnInit {
    @Input() employees: IEmployee[];
    dataSource:IEmployee[];
    constructor() {}

    ngOnInit(): void {
        this.dataSource = this.employees;
    }
    displayedColumns: string[] = ['id', 'name', 'skill', 'city','relocation_cost','training_cost','total_cost','need'];
   
}
