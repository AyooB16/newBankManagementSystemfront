import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { AgenceService } from '@app/_services/agence.service';
import { ClientService } from '@app/_services/client.service';
import { CompteService } from '@app/_services/compte.service';
import { TypeCompteService } from '@app/_services/type-compte.service';

@Component({
  selector: 'app-add-edit-compte',
  templateUrl: './add-edit-compte.component.html',
})
export class AddEditCompteComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  agences?: any[];
  typeComptes?: any[];
  clients?: any[];
 
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private compteService: CompteService,
      private typeCompteService:TypeCompteService,
      private clientService:ClientService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      
      this.form = this.formBuilder.group({
          solde: ['', [Validators.required, Validators.min(0), Validators.max(500) ,Validators.pattern(/^[0-9.]*$/)]],
          typeCompte:['', Validators.required],
          password:['', Validators.required],
          username:['', Validators.required],
          client:['', Validators.required],
      });
      this.clientService.getClients().subscribe(clients => {this.clients = clients; console.log(this.clients)});
      this.typeCompteService.getTypeComptes().subscribe(typeComptes => {this.typeComptes = typeComptes; console.log(this.typeComptes)});
      this.title = 'Add Compte';
      if (this.id) {
          // edit mode
          this.title = 'Edit Compte';
          this.loading = true;
          this.compteService.getCompteById(this.id)
              .subscribe(x => {

                 
                    this.form.patchValue({
                      username:x.username,
                      password:"",
                      solde:x.solde,
                      client:x.client._id,
                      typeCompte:x.typeCompte._id
                    });
                    this.loading = false;
                
              },
              error => {
                this.router.navigate(['/comptes']);
              }
              );
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.submitting = true;
      this.saveUser()
          .subscribe({
              next: () => {
                  this.alertService.success('Compte saved', { keepAfterRouteChange: true });
                  this.router.navigateByUrl('/comptes');
              },
              error: error => {
                  this.alertService.error("Username deja utilisé");
                  this.submitting = false;
              }
          })
  }

  private saveUser() {
      // create or update user based on id param
console.log(this.form.value)
      const newCompte = {
        username:this.form.value.username,
        password:this.form.value.password,
        solde:this.form.value.solde,
        client:this.form.value.client,
        typeCompte:this.form.value.typeCompte
      }

      return this.id
          ? this.compteService.updateCompte(this.id,newCompte)
          : this.compteService.createCompte(newCompte);
  }
}
