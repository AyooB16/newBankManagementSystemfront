import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { ClientService } from '@app/_services/client.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.less']
})
export class AddEditClientComponent implements OnInit {
  form!: FormGroup;
  id?: String;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private clientService: ClientService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      
      this.form = this.formBuilder.group({
          cin:['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
          nom: ['', Validators.required],
          prenom:['', Validators.required],
          dateNaissance:['', Validators.required],
          email:['', [Validators.required , Validators.email]],
          rue: ['', Validators.required],
          region: ['', Validators.required],
          codePostal: ['', Validators.required],
          ville: ['', Validators.required],

      });

      this.title = 'Add Client';
      if (this.id) {
          // edit mode
          this.title = 'Edit Client';
          this.loading = true;
          this.clientService.getClientById(this.id)
              .subscribe(x => {
          
                    console.log(this.id);
                    
                    console.log(x)

                    this.form.patchValue({
                      cin:x.cin,
                      nom:x.nom,
                      prenom:x.prenom,
                      dateNaissance:x.dateNaissance,
                      email:x.email,
                      rue:x.rue,
                      ville:x.ville,
                      region:x.region,
                      codePostal :x.codePostal
                    });
                    this.loading = false;
                  
              },
              
          error => {
            this.router.navigate(['/clients']);
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
                  this.alertService.success('Client saved', { keepAfterRouteChange: true });
                  this.router.navigateByUrl('/clients');
              },
              error: error => {
                  this.alertService.error("Cin ou email du client deja utilisé");
                  this.submitting = false;
              }
          })
  }

  private saveUser() {
      // create or update user based on id param

      const newClient = {
        cin:this.form.value.cin,
        nom:this.form.value.nom,
        prenom:this.form.value.prenom,
        dateNaissance:this.form.value.dateNaissance,
        email:this.form.value.email,
        rue:this.form.value.rue,
        ville:this.form.value.ville,
        region:this.form.value.region,
        codePostal :this.form.value.codePostal      };

      return this.id
          ? this.clientService.updateClient(this.id,newClient)
          : this.clientService.createClient(newClient);
  }

}
