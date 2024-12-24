import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { BusComponent } from './bus/bus.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserPageComponent } from './user-page/user-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Assurez-vous d'importer ce module

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    LoginComponent,
    NavComponent,
    BusComponent,
    HomeComponent,
    AdminpageComponent,
    UserPageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // Obligatoire pour Angular Material
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSidenavModule, // Importez MatSidenavModule
    MatButtonModule,  // Pour les boutons dans votre drawer
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
