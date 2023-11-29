import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '@app/_services';
import { AgentLoginService } from '@app/_services/agent-login.service';

@Component({
  selector: 'app-loginagent',
  templateUrl: './loginagent.component.html',
  styleUrls: ['./loginagent.component.css']
})
export class LoginagentComponent implements OnInit {


  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,private agentLoginService:AgentLoginService,private router: Router) {
    
   }
  ngOnInit(): void {
    this.loginForm= this.formBuilder.nonNullable.group(
      { username:['',Validators.required],
        password:['',Validators.required],
      }
    ); 
  }
  onSubmit() {

    
    this.agentLoginService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      (response) => {
        // Handle successful login response - save token to local storage
        localStorage.setItem('token', response.token); // Assuming token is received in the response
        this.router.navigate(['/dashboard']); // Navigate to a dashboard or another route on successful login
      },
      (error) => {
        // Handle login error
        console.log('Login failed', error);
        // Display error message to the user
      }
    );
    
  }
}
