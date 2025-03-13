import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder,
     private apiService: AuthService,
     private dialogService: DialogService,
     private router: Router 
    ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      // name: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      // age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Age validation
      age: ['', [Validators.required, Validators.min(18)]],
      address: ['', Validators.required],  // Address validation
    });
  }

  // Toggle the password visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  reset(){
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("this.registrationForm.value",this.registrationForm.valid, this.registrationForm.value);
      // Proceed with form submission (e.g., call an API or handle registration logic)
      const payload = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        phoneNo: this.registrationForm.value.phone,
        age: this.registrationForm.value.age,
        address: this.registrationForm.value.address,
        role: "patient"
      }
      console.log("payload :", payload);
      // return
      
      this.apiService.register(payload).subscribe(response => {
        console.log("response :", response);
        if(response.result){
          this.dialogService.showNotification(`User has been registered successfully`, 'success', 'top', 1000);
          this.reset();
          this.router.navigate(['/login']);  // Navigate to the login page
          
        }else{
          this.dialogService.showNotification(`Registration failed`, 'error', 'top', 1000)
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

}

