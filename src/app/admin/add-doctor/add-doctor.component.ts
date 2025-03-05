import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  addDoctorForm!: FormGroup;
    hide: boolean = true;
    
  
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
  
    constructor(private fb: FormBuilder,
         private apiService: AuthService,
         private dialogService: DialogService,
         private router: Router ,
         public dialogRef: MatDialogRef<AddDoctorComponent>,
         @Inject(MAT_DIALOG_DATA) public data: any // Get doctor data if editing
        ) {}
  
        // doctor: any = this.data ? { ...this.data } : {}; 
        ngOnInit(): void {
          this.addDoctorForm = this.fb.group({
            // name: ['', Validators.required],
            // email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
            email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            // phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            phoneNo: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            specialization: ['', Validators.required],
            availability: ['', Validators.required],
            // experience: ['', Validators.required],
            experience: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(5), Validators.max(20)]],
            hospital: ['', Validators.required],
            // password: ['', [Validators.required, Validators.minLength(6)]],
           
          });
        }
        close() {
          console.log("Close button clicked");
          this.dialogRef.close();
        }
        
      
        // Toggle the password visibility
        togglePasswordVisibility() {
          this.hide = !this.hide;
        }
      
        reset(){
          this.addDoctorForm.reset();
        }
      
        onSubmit() {
          if (this.addDoctorForm.valid) {
            console.log("Form Submitted with values: ", this.addDoctorForm.value);
        
            const payload = {
              name: this.addDoctorForm.value.name,
              email: this.addDoctorForm.value.email,
              phoneNo: this.addDoctorForm.value.phoneNo,
              password: this.addDoctorForm.value.password,  // You can pass a default or a password field if needed
              role: "doctor",
              specialization: this.addDoctorForm.value.specialization,
              availability: this.addDoctorForm.value.availability,
              experience: this.addDoctorForm.value.experience,
              hospital: this.addDoctorForm.value.hospital
            };
        
            console.log("Payload to send:", payload);
  
            this.apiService.addDoctor(payload).subscribe(response => {
              console.log("response :", response);
              if(response.result){
                this.dialogService.showNotification(`Doctor has been added successfully`, 'success', 'top', 1000);
                // this.reset();
                // this.router.navigate(['/login']);  // Navigate to the login page
                this.dialogRef.close(true);
                
              }else{
                this.dialogService.showNotification(`Add failed`, 'error', 'top', 1000);
                this.dialogRef.close(false);
              }
            });
  
          }
          // if (this.addDoctorForm.valid) {this.dialogRef.close();
          //   console.log("this.addDoctorForm.value",this.addDoctorForm.valid, this.addDoctorForm.value);
          //   // Proceed with form submission (e.g., call an API or handle registration logic)
          //   const payload = {
          //     name: this.addDoctorForm.value.name,
          //     email: this.addDoctorForm.value.email,
          //     password: this.addDoctorForm.value.password,
          //     role: "patient"
          //   }
            // this.apiService.register(payload).subscribe(response => {
            //   console.log("response :", response);
            //   if(response.result){
            //     this.dialogService.showNotification(`User has been registered successfully`, 'success', 'top', 1000);
            //     this.reset();
            //     this.router.navigate(['/login']);  // Navigate to the login page
                
            //   }else{
            //     this.dialogService.showNotification(`Registration failed`, 'error', 'top', 1000)
            //   }
            // });
          // }
        }
      
  }