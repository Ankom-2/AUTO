import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputscreenComponent } from './inputscreen/inputscreen.component';
import { AppComponent } from './app.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';


const routes: Routes = [
  {path:'', redirectTo: '/main', pathMatch: 'full' },
  {path:'main',component:MainscreenComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'input',component:InputscreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
