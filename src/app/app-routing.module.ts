// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { BusComponent } from './bus/bus.component';
import { HomeComponent } from './home/home.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'adminpage', component: AdminpageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crud', component: CrudComponent }, // Correct path for Employee
  { path: 'bus', component: BusComponent },   // Correct path for Bus
  { path: 'UserPageComponent', component: UserPageComponent }, // Route dynamique
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
