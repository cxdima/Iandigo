import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './modals/login/login.component';
import { ContactComponent } from './modals/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { CreateUserComponent } from './modals/create-user/create-user.component';
import { HomeNavigationComponent } from './components/navigation/home-navigation/home-navigation.component';
import { LandingNavigationComponent } from './components/navigation/landing-navigation/landing-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LandingComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    HomeComponent,
    ClientTableComponent,
    CreateUserComponent,
    HomeNavigationComponent,
    LandingNavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
