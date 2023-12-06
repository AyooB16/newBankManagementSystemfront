import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditClientComponent } from './clients/add-edit-client/add-edit-client.component';
import { ListClientComponent } from './clients/listclient/listclient.component';
import { ListCompteComponent } from './comptes/listcompte/list.component';
import { AddEditCompteComponent } from './comptes/add-edit-compte/add-edit-compte.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { LoginagentComponent } from './loginagent/loginagent.component';
import { AuthGuard } from './auth.guard';
import { DebiterComponent } from './debiter/debiter.component';
import { CrediterComponent } from './crediter/crediter.component';
import { HomeComponent } from './home/home.component';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { ClientDashComponent } from './user/client-dash/client-dash.component';
import { LoginClientComponent } from './user/login-client/login-client.component';
import { ClientHomePageComponent } from './user/client-home-page/client-home-page.component';
import { ClientDetailsPageComponent } from './user/client-details-page/client-details-page.component';
import { SendMoneyComponent } from './user/send-money/send-money.component';
import { TokenGuard } from './token.guard';



const routes: Routes = [
    {
        path: 'dashboard', 
        component:AgentdashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'clients', 
                children: [
                    { path: '', component: ListClientComponent },
                    { path: 'add', component: AddEditClientComponent },
                    { path: 'edit/:id', component: AddEditClientComponent }
                ]
            },
            {
                path: 'comptes', 
                children: [
                    { path: '', component: ListCompteComponent },
                    { path: 'add', component: AddEditCompteComponent },
                    { path: 'edit/:id', component: AddEditCompteComponent },

                    { path: 'debiter/:id', component: DebiterComponent },
                    { path: 'crediter/:id', component: CrediterComponent }
                ]
            },
            { path: '**', redirectTo: '' }
        ]
    },
    {
        path: 'login', 
        component:LoginagentComponent},
    {
        path: 'user',
        
        children: [
            { path: 'myaccount', component: ClientDashComponent, canActivate: [TokenGuard], 
                children:[
                    {path: '', component:ClientHomePageComponent},
                    {path: 'details', component:ClientDetailsPageComponent},
                    {path: 'send', component:SendMoneyComponent}
                ] 
            },
            { path: 'login', component: LoginClientComponent },
            { path: '**', redirectTo: 'myaccount' }
        ]
    },
    {
        path: '', 
        component:MainHomePageComponent},
        
    { path: '**', redirectTo: '' },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }