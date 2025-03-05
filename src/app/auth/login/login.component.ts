import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from '../../services/dialog.service';
import jwt_decode from 'jwt-decode';
// import { decode } from 'jwt-decode';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: AuthService,
    private dialogService: DialogService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],  // Email control with validations
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password control with validations
      // password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
      // Password must be at least 8 characters long, contain at least one uppercase letter,
      //  one lowercase letter, one number, and one special character.
    });
  }

  // Toggle the password visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  reset() {
    // Reset the form
    this.loginForm.reset();

    // Mark all controls as touched to show validation errors
    Object.keys(this.loginForm.controls).forEach(controlName => {
      this.loginForm.get(controlName)?.markAsTouched();
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email.trim();
      const password = this.loginForm.value.password.trim();

      console.log('Email:', email, 'Password:', password);
      const payload = {
        email: email,
        password: password
      }
      this.apiService.login(payload).subscribe(response => {
        console.log("login successfully :", response);
        if(response.result){
          const token = response.token;
           // Decode the token to extract the role
          const decodedToken: any = jwt_decode(token);
          // const decodedToken = decode(token); // No need to call it, just use it

          const role = decodedToken.role; // 'role' is part of the token payload
          console.log("role :", role);
          
           // Save the token and role to localStorage
           localStorage.setItem('authToken', token);
           localStorage.setItem('role', role);

          // Navigate to the appropriate dashboard based on the role
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'doctor') {
            this.router.navigate(['/doctor-dashboard']);
          } else if (role === 'patient') {
            this.router.navigate(['/patient-dasboard']);
          } else {
            // Default fallback if no role matched
            this.router.navigate(['/']);
          }
          this.dialogService.showNotification(`User has been logged in successfully`, 'success', 'top', 1000);
          this.reset();
        }else{
          console.log("error");
          
          this.dialogService.showNotification(`Login failed`, 'error', 'top', 1000)
        }
        
      });
      // Simulate navigation or API call here
      // this.router.navigate(['/dashboard']);  // Navigate to the dashboard on successful login
    } else {
      console.log('Form is invalid');
    }
  }

}

