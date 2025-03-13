import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';  // Material Input Module
import { MatButtonModule } from '@angular/material/button';  // Material Button Module
import { MatCardModule } from '@angular/material/card';  // Material Card Module
import { MatFormFieldModule } from '@angular/material/form-field'; // Material FormField Module
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
// import { AddDoctorComponent } from './lib-components/add-doctor/add-doctor.component';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
// import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
// import { AppointmentBookingComponent } from './patient/appointment-booking/appointment-booking.component';
// import { AppointmentBookingDetailsComponent } from './patient/appointment-booking-details/appointment-booking-details.component';
import {MatListModule} from '@angular/material/list';
// import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import {MatChipsModule} from '@angular/material/chips';
// import { RemoveDoctorComponent } from './admin/remove-doctor/remove-doctor.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RemoveDoctorComponent } from './admin/remove-doctor/remove-doctor.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { AllPatientsComponent } from './admin/all-patients/all-patients.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { PatientProfileDetailsComponent } from './patient/patient-profile-details/patient-profile-details.component';
import { EditPatientProfileDetailsComponent } from './patient/edit-patient-profile-details/edit-patient-profile-details.component';
import { AllAppointmentsComponent } from './admin/all-appointments/all-appointments.component';
import { CancelAppointmentComponent } from './admin/cancel-appointment/cancel-appointment.component';
import { ConfirmAppointmentComponent } from './admin/confirm-appointment/confirm-appointment.component';
import { AddDoctorAvailabilityComponent } from './doctor/add-doctor-availability/add-doctor-availability.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { EditDoctorDetailsComponent } from './doctor/edit-doctor-details/edit-doctor-details.component';
import { AppointmentBookingComponent } from './patient/appointment-booking/appointment-booking.component';
import { AppointmentBookingDetailsComponent } from './patient/appointment-booking-details/appointment-booking-details.component';
import { LoaderComponent } from './loader/loader/loader.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
// import { AllPatientsComponent } from './admin/all-patients/all-patients.component';
// import { AllAppointmentsComponent } from './admin/all-appointments/all-appointments.component';
// import { ConfirmAppointmentComponent } from './admin/confirm-appointment/confirm-appointment.component';
// import { CancelAppointmentComponent } from './admin/cancel-appointment/cancel-appointment.component';
// import { EditDoctorDetailsComponent } from './doctor/edit-doctor-details/edit-doctor-details.component';
// import { PatientProfileDetailComponent } from './patient/patient-profile-detail/patient-profile-detail.component';
// import { AddDoctorAvailabilityComponent } from './doctor/add-doctor-availability/add-doctor-availability.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { EditPatientProfileComponent } from './patient/edit-patient-profile/edit-patient-profile.component';
// import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    RemoveDoctorComponent,
    AddDoctorComponent,
    DoctorDetailsComponent,
    AllPatientsComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PatientDashboardComponent,
    PatientProfileDetailsComponent,
    EditPatientProfileDetailsComponent,
    AllAppointmentsComponent,
    CancelAppointmentComponent,
    ConfirmAppointmentComponent,
    AddDoctorAvailabilityComponent,
    DoctorDashboardComponent,
    EditDoctorDetailsComponent,
    AppointmentBookingComponent,
    AppointmentBookingDetailsComponent,
    LoaderComponent
    // LoginComponent,
    // RegisterComponent,
    // AdminDashboardComponent,
    // AddDoctorComponent,
    // PatientDashboardComponent,
    // AppointmentBookingComponent,
    // AppointmentBookingDetailsComponent,
    // DoctorDashboardComponent,
    // RemoveDoctorComponent,
    // DoctorDetailsComponent,
    // AllPatientsComponent,
    // AllAppointmentsComponent,
    // ConfirmAppointmentComponent,
    // CancelAppointmentComponent,
    // EditDoctorDetailsComponent,
    // PatientProfileDetailComponent,
    // AddDoctorAvailabilityComponent,
    // DashboardComponent,
    // EditPatientProfileComponent,
    // ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatSidenavModule,
    CommonModule,
    OverlayModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
