import { Component, OnInit } from '@angular/core';
import { CompteService } from '@app/_services/compte.service';

@Component({
  selector: 'app-client-details-page',
  templateUrl: './client-details-page.component.html',
  styleUrls: ['./client-details-page.component.less']
})
export class ClientDetailsPageComponent implements OnInit {

  client: any;
  token: any ;

  constructor(private compteService: CompteService) { }

  ngOnInit(): void {
    this.fetchClientData();
  }

  fetchClientData() {
    this.token=localStorage.getItem("token")
    
    if (this.token) {

      this.compteService.getCompteByToken(this.token).subscribe(
        (data) => {
          this.client = data;
          console.log(data);
          
        },
        (error) => {
          console.error('Error fetching client data:', error);
        }
      );
    } else {
      console.error('Token is missing!');
    }
  }

}
