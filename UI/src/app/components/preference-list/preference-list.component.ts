import { Component, OnInit } from '@angular/core';
import { IEmployee, IPreferenceList, PreferenceList } from 'src/app/models/preference.model';
import { CostOptimizationService } from 'src/app/services/cost-optimization.service';

@Component({
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.scss']
})
export class PreferenceListComponent implements OnInit {
  employees: IEmployee[]
  Elist: IPreferenceList;//IEmployee[][]
 // PList:IPreferenceList;
  constructor(private optiSer:CostOptimizationService) { }

  ngOnInit(): void {
    this.Elist=this.optiSer.solution;
//     this.employees=[
//       {
//           id: '1as',
//           name: 'john',
//           skill: 'Java',
//           city: 'NOIDA',
//           relocation_cost: 4000,
//           training_cost: 0,
//           total_cost: 4000,
//           need: 'Training'
//       }, {
//           id: '1as',
//           name: 'john',
//           skill: 'Java',
//           city: 'NOIDA',
//           relocation_cost: 4000,
//           training_cost: 0,
//           total_cost: 4000,
//           need: 'Training'
//       }, {
//           id: '1as',
//           name: 'john',
//           skill: 'Java',
//           city: 'NOIDA',
//           relocation_cost: 4000,
//           training_cost: 0,
//           total_cost: 4000,
//           need: 'Training'
//       }
// ];
//    // this.Elist=[this.employees,this.employees,this.employees];}
//    this.Elist =new PreferenceList();
//    this.Elist.employee_solution1=this.employees;
//    this.Elist.employee_solution2=this.employees;
//    this.Elist.employee_solution3=this.employees;

}
}
