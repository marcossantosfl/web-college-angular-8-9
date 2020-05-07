import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpInterceptorModule} from './service/header-interceptor.service';
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashComponent} from './component/dash/dash.component';
import {RegisterComponent} from './component/register/register.component';
import {SubjectComponent} from './component/dash/subject/subject.component';
import {AuthGuardService} from './service/auth-guard.service';
import { InitComponent } from './component/init/init.component';
import {DatePipe} from '@angular/common';
import { SettingsComponent } from './component/dash/settings/settings.component';
import { ComingComponent } from './component/dash/coming/coming.component';

export const appRouters: Routes = [
  {path: '', component: InitComponent},
  {path: 'init', component: InitComponent},
  {path: 'dash', component: DashComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashComponent,
    RegisterComponent,
    SubjectComponent,
    InitComponent,
    SettingsComponent,
    ComingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpInterceptorModule,
    ReactiveFormsModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
