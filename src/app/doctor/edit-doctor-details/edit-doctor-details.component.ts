import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-edit-doctor-details',
  templateUrl: './edit-doctor-details.component.html',
  styleUrls: ['./edit-doctor-details.component.scss']
})
export class EditDoctorDetailsComponent  implements OnInit {
  role: any;
  editForm!: FormGroup; // Form Group
  doctorId: any;
  availabilityOptions: string[] = [];
   constructor(
      private apiService: AuthService,
      private fb: FormBuilder,
      private dialogService: DialogService,
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<EditDoctorDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
  
    ngOnInit(): void {
      console.log("data :", this.data);
      const token = localStorage.getItem('authToken');
            if (token) {
              this.doctorId = jwt_decode(token);
              console.log("doctorId Token:", this.doctorId);
            } else {
              console.log("No token found in localStorage");
            }
      this.editForms();
    }
    close(){
      this.dialogRef.close();
    }

    editForms(){
      this.availabilityOptions = this.data.availability || [];
      this.editForm = this.fb.group({
        name: [this.data.name || '', Validators.required],
        email: [this.data.email || '', [Validators.required, Validators.email]],
        phone: [this.data.phone || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        experience: [this.data.experience || '', Validators.required],
        specialization: [this.data.specialization || ''],
        hospital: [this.data.hospital || ''],
        // availability: [this.data.availability || '']
        availability: [this.data.availability || []]
      });
    }

    saveChanges(){
      if (this.editForm.valid) {
        const updatedData = this.editForm.value;
        console.log("updatedData :", updatedData);
        this.apiService.editDoctorDetails(updatedData, this.doctorId.id).subscribe(response => {
          if(response.result){
            this.dialogRef.close(true);
            this.dialogService.showNotification(`Doctor has been edited successfully`, 'success', 'top', 1000);
          }else{
            this.dialogRef.close(false);
            this.dialogService.showNotification(`Edit failed`, 'error', 'top', 1000);
          }
        });
        
      }
    }

}
