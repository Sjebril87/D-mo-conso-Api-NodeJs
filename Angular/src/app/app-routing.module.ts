import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCapacityComponent } from './components/pages/capacity/edit-capacity/edit-capacity.component';
import { ListingComponent } from './components/pages/capacity/listing/listing.component';
import { EdituserComponent } from './components/pages/user/edituser/edituser.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { RegisteruserComponent } from './components/pages/user/registeruser/registeruser.component';
import { Error404Component } from './components/shared/error404/error404.component';

const routes: Routes = [
  {path: '',redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisteruserComponent},
  {path: 'edituser/:id', component: EdituserComponent},
  {path: 'capacity', component: ListingComponent},
  {path: 'editcapacity/:id', component: EditCapacityComponent},


  {path:'notfound', component: Error404Component},
  {path: '**', redirectTo:'/notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
