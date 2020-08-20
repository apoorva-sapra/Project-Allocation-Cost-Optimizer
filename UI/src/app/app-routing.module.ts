import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LoggedInGuardService} from './services/logged-in-guard.service';
import {HomeComponent} from './components/home/home.component';
import { PreferenceList } from './models/preference.model';
import { PreferenceTableComponent } from './components/preference-table/preference-table.component';
import { PreferenceListComponent } from './components/preference-list/preference-list.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInGuardService]
    }, {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [LoggedInGuardService]
    }, {
        path: 'news-feed',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    }, {
        path: 'preference-table',
        component: PreferenceListComponent,
        canActivate: [AuthGuardService]
    }, {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
