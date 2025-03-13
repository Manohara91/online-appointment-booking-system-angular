import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { AllPatientsComponent } from './admin/all-patients/all-patients.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { PatientProfileDetailsComponent } from './patient/patient-profile-details/patient-profile-details.component';
import { AllAppointmentsComponent } from './admin/all-appointments/all-appointments.component';
import { AppointmentBookingComponent } from './patient/appointment-booking/appointment-booking.component';
import { AppointmentBookingDetailsComponent } from './patient/appointment-booking-details/appointment-booking-details.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [
      { path: '', component: DoctorDetailsComponent },
      { path: 'all-patients', component: AllPatientsComponent },
      { path: 'all-appointments', component: AllAppointmentsComponent },
      {path: 'dashboard', component: AdminDashboardComponent}
    ],
   },
  { path: 'patient-dasboard', component: PatientDashboardComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  // { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'book-appointment', component: AppointmentBookingComponent },
  { path: 'booking-appointment-details', component: AppointmentBookingDetailsComponent },
  { path: 'patient-profile', component: PatientProfileDetailsComponent },
  { path: '**', redirectTo: '/login' }  // Fallback for unknown routes
  // { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
