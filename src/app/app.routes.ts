import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/compat/auth-guard";


import { LandingComponent } from "./pages/landing/landing.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

import { HomeComponent } from "./pages/home/home.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";


const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['/']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '', component: LandingComponent},
  { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLanding } },
  { path: 'clients', component: ClientsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLanding } },
  { path: 'messages', component: MessagesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLanding } },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLanding } },
  { path: '**', redirectTo: 'page-not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
