import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-doctor-availability',
  templateUrl: './add-doctor-availability.component.html',
  styleUrls: ['./add-doctor-availability.component.scss']
})
export class AddDoctorAvailabilityComponent implements OnInit {
  availabilityOptions: string[] = [
    "Monday 9AM-12PM",
    "Monday 1PM-4PM",
    "Tuesday 9AM-12PM",
    "Tuesday 1PM-4PM",
    "Wednesday 9AM-12PM",
    "Wednesday 1PM-4PM",
    "Thursday 9AM-12PM",
    "Thursday 1PM-4PM",
    "Friday 9AM-12PM",
    "Friday 1PM-4PM"
  ];
  role: any;
  filteredAvailabilityOptions!: string[];
  addDoctorAvailabilityTimeForm!: FormGroup;
     constructor(
        private fb: FormBuilder,
        private apiService: AuthService,
        private dialogService: DialogService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<AddDoctorAvailabilityComponent>,
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
              this.initForm();
              console.log("data :", this.data);
              this.checkAvailability();
      }
  
      ngOnChanges(){
        console.log("data :", this.data);
      }

      initForm(){
         this.addDoctorAvailabilityTimeForm = this.fb.group({
          availability: ['', Validators.required] });
      }
      checkAvailability(){
        this.filteredAvailabilityOptions = this.availabilityOptions.filter(option => !this.data.availability.includes(option));
        console.log("filteredAvailabilityOptions :", this.filteredAvailabilityOptions);
        
      }
      close(){
        this.dialogRef.close();
      }
      onSubmit(){
        try {
          console.log("addDoctorAvailabilityTimeForm :", this.addDoctorAvailabilityTimeForm.value);
          const payload = {
            newAvailability: this.addDoctorAvailabilityTimeForm.value
          };
          // console.log("payload :", payload);
          // console.log("id :", this.data.id);
          // return
          
          this.apiService.addDoctorAvailability(payload.newAvailability, this.data.id).subscribe(response => {
            if(response.result){
              this.dialogService.showNotification(`Doctor New Availability added successfully`, 'success', 'top', 1000);
              this.dialogRef.close(true);
            }else{
              // this.dialogService.showNotification(`Failed adding availability`, 'success', 'top', 1000);
              this.dialogRef.close(false);
            }
          });
        } catch (error) {
          console.log("error :", error);
          
        }
      }

}

