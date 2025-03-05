import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class CancelAppointmentComponent implements OnInit {
  cancelReason: string = '';
  isDisabled: boolean = false; 
  role: any;
  constructor(
        private apiService: AuthService,
        private dialogService: DialogService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<CancelAppointmentComponent>,
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
        if (this.cancelReason) {
          console.log('Comment submitted:', this.cancelReason);
          const payload = {
            cancelReason: this.cancelReason,
            canceledBy: this.role.role,
            canceledDateTime: new Date()
          }
        this.apiService.cancelAppointments(payload,this.data._id).subscribe(response =>{
          if(response.result){
            this.dialogRef.close(true);
            this.dialogService.showNotification(`Appointment has been canceled successfully`, 'success', 'top', 1000);
          }else{
            this.dialogRef.close(false);
            // this.dialogService.showNotification(`Canceled failed`, 'error', 'top', 1000);
          }
        });
      }
      }

      onCommentChange(newComment: string): void {
        this.cancelReason = newComment.trim(); // Trim whitespace to avoid enabling the button with only spaces.
        console.log('Updated Comment:', this.cancelReason);
      }

}

