import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRole } from 'src/app/models/requirements.model';

@Component({
  selector: 'app-role-requirement',
  templateUrl: './role-requirement.component.html',
  styleUrls: ['./role-requirement.component.scss']
})
export class RoleRequirementComponent implements OnInit{
  panelOpenState:boolean;
  isExpanded = true;
  @Input() role: IRole;
  @Input() index: number;
  @Output() roleChange: EventEmitter<IRole> = new EventEmitter<IRole>();
  @Output() onDelete = new EventEmitter();
  constructor() { }
  OnDataChanges() {
    this.roleChange.emit(this.role);
    console.log("Hello")
    this.isExpanded=this.role.skill_name===null;
  }

  OnClickOnDelete(){
    this.onDelete.emit();
  }

  skills: any[] = ["SAP.BOBJ", "SAP.ABAP", "JDE", "Java.core", "Custom Application", "COBOL",
    "Application Maintenance & Support", "Java.Spring & Hibernate",
    "c#.NET", "Test Automation", "Oracle Database", "Custom Development",
    "Oracle Application", "SAP.SCM.SD", "SAP.BASIS", "Technincal Requirement", "SAP.FIN.FI"];

  ngOnInit(): void {
  }

}
