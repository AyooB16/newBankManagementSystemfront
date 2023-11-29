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



@NgModule({
    imports: [
        
        BrowserModule,

        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
       
        AppRoutingModule,
        ReactiveFormsModule,
        RouterModule

        
    ],
    declarations: [
        AppComponent,
        AgentdashboardComponent,
        AddEditCompteComponent,
        ListCompteComponent,
        ListClientComponent,
        AddEditClientComponent,
        AlertComponent,
        LoginagentComponent,
          
       
        
    ],

    bootstrap: [AppComponent]
})
export class AppModule { };