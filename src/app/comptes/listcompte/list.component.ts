import { Component, OnInit } from '@angular/core';
import { CompteService } from '@app/_services/compte.service';

@Component({ templateUrl: 'listcompte.component.html' })
export class ListCompteComponent implements OnInit {
    comptes?: any[];

    constructor(private compteService: CompteService , ) {}

    ngOnInit() {
        this.compteService.getComptes()
            .subscribe(Comptes => {this.comptes = Comptes; console.log(this.comptes)});
    }

    deleteCompte(id: string) {
        const Compte = this.comptes!.find(x => x.id === id);

        this.compteService.deleteCompte(id).subscribe(() => this.comptes = this.comptes!.filter(x => x._id !== id));
    }
}