import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  resetPasswordForm: FormGroup;
  isUpdatingPassword: boolean = false;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private apiService: AuthService,
     private dialogService: DialogService,private router: Router ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  reset(){
    this.resetPasswordForm.reset();
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const formValues = this.resetPasswordForm.value;
    // Handle password update logic
    console.log('Updating password for:', formValues);

    this.apiService.forgotPassword(formValues).subscribe(response => {
      if(response.result){
        this.router.navigate(['/login']);
        this.reset();
        this.dialogService.showNotification(`${response.message}`, 'success', 'top', 1000);
      }else{
        this.dialogService.showNotification(`${response.message}`, 'error', 'top', 1000);
      }
    })
  }

  // Toggle the password visibility
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
