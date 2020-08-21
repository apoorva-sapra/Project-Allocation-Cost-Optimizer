import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  
  constructor(private auth:AuthService,private notification:NotificationService,private router: Router){

  }

  ngOnInit(): void {
  
  }
//'sebastian@codingthesmartway.om'
  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  submit() {
    this.form.value.username
    console.log(this.auth.getUsers());
    this.auth.login(this.form.value.username,this.form.value.password);
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  @Output() submitEM = new EventEmitter();


}
