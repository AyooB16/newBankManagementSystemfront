import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../_services/compte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-debite',
  templateUrl: './debiter.component.html',
  styleUrls: ['./debiter.component.css']
})
export class DebiterComponent implements OnInit {
  id: string = '';
  montant: number = 0;
  loading = false;
  submitted = false;
  debiterForm!: FormGroup;
  solde: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compteService: CompteService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.debiterForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.compteService.getCompteById(this.id)
      .subscribe(
        (compte) => {
          this.solde = compte.solde;
          this.debiterForm.controls['montant'].setValidators([
            Validators.required,
            Validators.min(0.01),
            this.checkMontant.bind(this)
          ]);
          this.debiterForm.controls['montant'].updateValueAndValidity();
        },
        error => {
          console.error(error);
        }
      );
  }

  get f() { return this.debiterForm.controls; }

  checkMontant(control: any) {
    const enteredMontant = parseFloat(control.value);
    if (enteredMontant > this.solde) {
      return { 'exceedsSolde': true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.debiterForm.invalid) {
      return;
    }

    this.loading = true;
    this.compteService.debiterCompte(this.id, this.f.montant.value)
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