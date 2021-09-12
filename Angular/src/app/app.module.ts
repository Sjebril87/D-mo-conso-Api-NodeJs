import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbCardModule, NbButtonModule, NbInputModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';

import { Error404Component } from './components/shared/error404/error404.component';
import { UserService } from './services/user.service';
import { NavComponent } from './components/shared/nav/nav.component';
import { ListingComponent } from './components/pages/capacity/listing/listing.component';
import { HomeComponent } from './components/pages/user/home/home.component';
import { EditCapacityComponent } from './components/pages/capacity/edit-capacity/edit-capacity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmboxComponent } from './components/shared/confirmbox/confirmbox.component';
import { EdituserComponent } from './components/pages/user/edituser/edituser.component';
import { RegisteruserComponent } from './components/pages/user/registeruser/registeruser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    NavComponent,
    ListingComponent,
    EditCapacityComponent,
    ConfirmboxComponent,
    EdituserComponent,
    RegisteruserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    HttpClientModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbDialogModule.forRoot()
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
