import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { HomeComponent } from './components/home/home.component';
import { PreferenceListComponent } from './components/preference-list/preference-list.component';
import { RequirementsCollecterComponent } from './components/requirements-collecter/requirements-collecter.component';
import { RoleRequirementComponent } from './components/role-requirement/role-requirement.component';
import { PreferenceTableComponent } from './components/preference-table/preference-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    PreferenceListComponent,
    RequirementsCollecterComponent,
    RoleRequirementComponent,
    PreferenceTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    AngularMaterialModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
