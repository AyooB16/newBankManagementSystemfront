import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '@app/_services/compte.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.less']
})
export class SendMoneyComponent implements OnInit {

  moneyTransferForm!: FormGroup;
  submitted = false;
  compteDetails: any; // Variable to store user's account details

  constructor(private formBuilder: FormBuilder, private apiService: CompteService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.moneyTransferForm = this.formBuilder.group({
      toUsername: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });

    
    // Fetch the user's account details when the component initializes
    this.apiService.getCompteByToken(localStorage.getItem("token")).subscribe(
      (data: any) => {
        this.compteDetails = data;
      },
      (error: any) => {
        console.error('Error fetching account details', error);
      }
    );
  }

  get f() { return this.moneyTransferForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.moneyTransferForm.invalid) {
      return;
    }

    const amountToTransfer = this.moneyTransferForm.get('amount')?.value;
    if (amountToTransfer > this.compteDetails.solde) {
      console.error('Insufficient funds');
      return;
    }

    const formData = this.moneyTransferForm.value;
    this.apiService.sendMoney(formData.toUsername, amountToTransfer)
      .subscribe(
        (data: any) => {
          console.log('Money sent successfully', data);
          this.moneyTransferForm.reset();
          this.submitted = false;
          this.apiService.getCompteByToken(localStorage.getItem("token")).subscribe(
            (data: any) => {
              this.compteDetails = data;
            },
            (error: any) => {
              console.error('Error fetching account details', error);
            }
          );
            this.snackBar.open('Money sent successfully', 'Close', {
            duration: 3000, 
          });
        },
        (error: any) => {
          console.error('Error sending money', error);
          this.snackBar.open('Error sending money', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
