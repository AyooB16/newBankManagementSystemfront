import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dash',
  templateUrl: './client-dash.component.html',
  styleUrls: ['./client-dash.component.less']
})
export class ClientDashComponent implements OnInit {
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/user/login']);
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
