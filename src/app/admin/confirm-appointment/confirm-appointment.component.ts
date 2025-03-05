import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.scss']
})
export class ConfirmAppointmentComponent  implements OnInit {
  role: any;
   constructor(
      private apiService: AuthService,
      private dialogService: DialogService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<ConfirmAppointmentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
  
    ngOnInit(): void {
      const token = localStorage.getItem('authToken');
            if (token) {
              this.role = jwt_decode(token);
              console.log("Decoded Token:", this.role);
            } else {
              console.log("No token found in localStorage");
            }
    }

    ngOnChanges(){
      console.log("data :", this.data);
    }
  
    onNoClick(){
      this.dialogRef.close(false);
    }
    onYesClick(){
      console.log("appointment id", this.data);
      console.log("role", this.role);
      const payload = {
        confirmedBy: this.role.role,
        confirmedDateTime: new Date()
      }
      console.log("payload :", payload);
      // return
      this.apiService.confirmAppointment(payload,this.data._id).subscribe(response =>{
        console.log("response :", response);
        
        if(response.result){
          this.dialogRef.close(true);
          this.dialogService.showNotification(`Appointment has been confirmed successfully`, 'success', 'top', 1000);
        }else{
          this.dialogRef.close(false);
          // this.dialogService.showNotification(`Appointment confirm failed`, 'error', 'top', 1000);
        }
      });
    }

}

