import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  error: boolean = false;
  errorMessage: string = "hello";
  registerForm: FormGroup;
  passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private auth: AuthService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  get getUserName() { return this.registerForm.get('username'); }
  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    // if (this.registerForm.value.password != this.registerForm.value.ConfirmPassword) {
    //   this.error = true;
    //   this.errorMessage = "password and confirm password does not match";
    //   return;
    // }
    let user= new User();
    user.name=this.username.value;
    user.email=this.email.value;
    user.password=this.password.value;
    this.auth.register(user).subscribe(
      res => {
       this.notification.success("Registration Successful")
      }
    );
  }
  reset() {
    this.error = false;
    this.errorMessage = '';
    this.registerForm.reset();
  }

  createFormControls() {
    this.username = new FormControl("", Validators.required);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]);
    this.confirmPassword = new FormControl("", [this.ValidateConfirmPassword(this.password.value), Validators.required]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  ValidateConfirmPassword(password: string): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {

      // if (control.value!==undefined && control.value==password){

      //     return { 'same': true };

      // }

      return null;

    };

  }
  //  ValidateConfirmPassword(control:AbstractControl):{[key:string]:Boolean}|null{  

  //     if(control.value!==undefined && control.value===this.password){  
  //         return {"isSameAsPassword":true};  
  //       }  
  //       return null;  
  //   }  
}
