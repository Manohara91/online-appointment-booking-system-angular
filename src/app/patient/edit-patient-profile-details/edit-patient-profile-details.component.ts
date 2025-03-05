import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

@Component({
  selector: 'app-edit-patient-profile-details',
  templateUrl: './edit-patient-profile-details.component.html',
  styleUrls: ['./edit-patient-profile-details.component.scss']
})
export class EditPatientProfileDetailsComponent {
  role: any;
  profileForm!: FormGroup;
  constructor(
          private fb: FormBuilder,
          private apiService: AuthService,
          private dialogService: DialogService,
          public dialog: MatDialog,
          public dialogRef: MatDialogRef<EditPatientProfileDetailsComponent>,
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
                             console.log("data :", this.data);
                             this.initForm();
                              
                }

                ngOnChanges(){
                  console.log("data :", this.data);
                }     
                
          initForm(){
             // Initialize the form with default values
          this.profileForm = this.fb.group({
            name: [this.data.name, [Validators.required, Validators.pattern(NAME_REGEX)]],
            // name: [this.data.name, Validators.required],
            // age: [this.data.age, [Validators.required, Validators.min(1)]],
            age: [this.data.age, [Validators.required, Validators.min(18)]],
            // phoneNo: [this.data.phoneNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            phoneNo:  [this.data.phoneNo, [Validators.required, Validators.pattern(PHONE_REGEX)]],
            // email: [this.data.email, [Validators.required, Validators.email]],
            email: [this.data.email, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            address: [this.data.address, Validators.required]
          });
          }  
          
     // Method to handle form submission
  // onSubmit() {
  //   if (this.profileForm.valid) {
  //     // You can call an API to save the updated data here
  //     console.log('Profile updated:', this.profileForm.value);
  //   }
  // }   

  onSubmit(){
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      console.log("updatedData :", updatedData);
      console.log("patientId :", this.role);
      
      this.apiService.editPatientProfileDetails(updatedData, this.role.id).subscribe(response => {
        if(response.result){
          this.dialogRef.close(true);
          this.dialogService.showNotification(`${response.message}`, 'success', 'top', 1000);
        }else{
          this.dialogRef.close(false);
          this.dialogService.showNotification(`Profile update failed`, 'error', 'top', 1000);
        }
      });
      
    }
  }
  close(){
    this.dialogRef.close();
  }

}