import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AddEditClientComponent } from './clients/add-edit-client/add-edit-client.component';
import { ListClientComponent } from './clients/listclient/listclient.component';
import { ListCompteComponent } from './comptes/listcompte/list.component';
import { AddEditCompteComponent } from './comptes/add-edit-compte/add-edit-compte.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { LoginagentComponent } from './loginagent/loginagent.component';
import { AuthGuard } from './auth.guard';



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
                    { path: 'edit/:id', component: AddEditCompteComponent }
                ]
            },
            { path: '**', redirectTo: '' }
        ]
    },
    {
        path: 'login', 
        component:LoginagentComponent},
    { path: '**', redirectTo: 'login' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }