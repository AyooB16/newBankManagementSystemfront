import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';

import { LoginagentComponent } from './loginagent/loginagent.component';
import { Router, RouterModule } from '@angular/router';
import { ListClientComponent } from './clients/listclient/listclient.component';
import { AddEditClientComponent } from './clients/add-edit-client/add-edit-client.component';
import { AddEditCompteComponent } from './comptes/add-edit-compte/add-edit-compte.component';
import { ListCompteComponent } from './comptes/listcompte/list.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { DebiterComponent } from './debiter/debiter.component';
import { CrediterComponent } from './crediter/crediter.component';
import { ClientDashComponent } from './user/client-dash/client-dash.component';
import { SendMoneyComponent } from './user/send-money/send-money.component';
import { LoginClientComponent } from './user/login-client/login-client.component';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { ClientHomePageComponent } from './user/client-home-page/client-home-page.component';
import { ClientDetailsPageComponent } from './user/client-details-page/client-details-page.component';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatSnackBarModule,
        RouterModule
,
       
        BrowserAnimationsModule

        
    ],
    declarations: [
        AppComponent,

        AgentdashboardComponent,
        HomeComponent,
        AddEditCompteComponent,
        ListCompteComponent,
        ListClientComponent,
        AddEditClientComponent,
        AlertComponent,
        LoginagentComponent,
        DebiterComponent,
        CrediterComponent,
        ClientDashComponent,
        SendMoneyComponent,
        LoginClientComponent,
        MainHomePageComponent,
        ClientHomePageComponent,
        ClientDetailsPageComponent,
          
       
        
    ],

    bootstrap: [AppComponent]
})
export class AppModule { };