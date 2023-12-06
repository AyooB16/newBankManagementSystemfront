import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '@app/_services';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.less']
})
export class LoginClientComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router , private compteService:CompteService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    
    this.compteService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/user']);
      },
      (error) => {
        console.log('Login failed', error);
      }
    );
  }
}
