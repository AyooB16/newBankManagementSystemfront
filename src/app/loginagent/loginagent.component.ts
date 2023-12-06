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
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log('Login failed', error);
      }
    );
    
  }
}
