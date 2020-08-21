import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRole, Role, IRequirements, Requirements } from 'src/app/models/requirements.model';
import { NotificationService } from 'src/app/services/notification.service';
import { CostOptimizationService } from 'src/app/services/cost-optimization.service';
import { PreferenceList } from 'src/app/models/preference.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requirements-collecter',
  templateUrl: './requirements-collecter.component.html',
  styleUrls: ['./requirements-collecter.component.scss']
})
export class RequirementsCollecterComponent implements OnInit {
  role: IRole;
  shouldEnableAdd: boolean
  constructor(private notification: NotificationService,private optiSer:CostOptimizationService, private router:Router
  ) { }
  locations: string[] = ['Jaipur', 'Noida', 'Mumbai', 'Kolkata', 'Delhi'];
  ngOnInit(): void {
    this.shouldEnableAdd = true;
    this.role = new Role();
    this.role.skill_name=null;
    this.role.head_count=1;
    this.role.training_cost=0;

    // this.addNewRole();
  }
  // onAdd() {
  //   if (this.isAllRoledFilled()) {
  //     this.addNewRole();
  //     this.notification.success("new tab added, please fill that");  
  //   } else {
  //     this.notification.warning("Please fill existing first");
  //   }
  // }
  // deleteRole(index) {
  //   if (this.roles.length > 1) {
  //     this.roles.splice(index, 1);
  //   } else {
  //     this.notification.warning("can not delete first required role ")
  //   }
  // }
  onroleChange(value) {
    this.role.head_count = value.head_count;
    this.role.skill_name = value.skill_name;
    this.role.training_cost = value.training_cost;
  }

  isAllRoledFilled(): boolean {
    let shouldAdd = true;
    // this.roles.forEach(role => {
      if (this.role.skill_name === null) {
        shouldAdd = false;
      }
    // });
    return shouldAdd;
  }
  // addNewRole() {
  //   let newRole = new Role();
  //   newRole.skill_name = null
  //   newRole.head_count = 1;
  //   newRole.training_cost = 0;
  //   this.roles.push(newRole);
  // }
  form: FormGroup = new FormGroup({
    relocationCost: new FormControl(0, Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    location: new FormControl('', Validators.required),
  });

  OnSubmit() {
    if (this.isAllRoledFilled()&& this.form.valid) {
      let requirements:IRequirements= new Requirements();
      requirements.employees=this.role;
      requirements.location=this.form.value.location;
      requirements.relocation_cost=this.form.value.relocationCost;
      requirements.start_date=this.form.value.startDate;
      console.log(JSON.stringify(requirements));
      this.optiSer.sendRequirements(requirements).subscribe(
          (data: PreferenceList) => {
            this.optiSer.solution=data;
            this.notification.success("Ok");

            this.router.navigate(['/preference-table']);
          });
        }
     
    }
  }

