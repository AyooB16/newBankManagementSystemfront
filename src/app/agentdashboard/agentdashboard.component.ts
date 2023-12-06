import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
