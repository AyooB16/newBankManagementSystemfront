import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../_services/compte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crediter',
  templateUrl: './crediter.component.html',
  styleUrls: ['./crediter.component.css']
})
export class CrediterComponent implements OnInit {
  id: string = '';
  montant: number = 0;
  loading = false;
  submitted = false;
  crediterForm!: FormGroup;
  solde: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compteService: CompteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.crediterForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.compteService.getCompteById(this.id)
      .subscribe(
        (compte) => {
          this.solde = compte.solde;
          this.crediterForm.controls['montant'].setValidators([
            Validators.required,
            Validators.min(0.01)
          ]);
          this.crediterForm.controls['montant'].updateValueAndValidity();
        },
        error => {
          console.error(error);
        }
      );
  }

  get f() { return this.crediterForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.crediterForm.invalid) {
      return;
    }

    this.loading = true;
    this.compteService.crediterCompte(this.id, this.f.montant.value)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard/comptes']);
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
  }
}
