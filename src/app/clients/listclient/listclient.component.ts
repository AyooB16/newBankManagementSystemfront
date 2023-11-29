import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@app/_services/client.service';

@Component({ templateUrl: 'listclient.component.html' })
export class ListClientComponent implements OnInit {
    clients?: any[];

    constructor(private clientService: ClientService ,  private route: ActivatedRoute,private router: Router,) {}

    ngOnInit() {
        this.clientService.getClients()
            .subscribe(clients => {this.clients = clients; console.log(this.clients)});
    }

    deleteClient(id: number) {
        const client = this.clients!.find(x => x.id === id);
        this.clientService.deleteClient(id).subscribe(() => this.clients = this.clients!.filter(x => x._id !== id));
    }
}