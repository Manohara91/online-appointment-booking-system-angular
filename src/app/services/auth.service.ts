
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Define the base URL for your API

  constructor(private http: HttpClient,private router: Router,private dialogService: DialogService) {}
  // Handle any errors from HTTP requests
  private handleError(error: any): Observable<any> {
    console.error('API error: ', error);
    return throwError(error.message || 'Server error');
  }

  // Method for login
  login(payload: any): Observable<any> {
    this.dialogService.show();
    return this.http.post(`${this.apiUrl}/auth/login`, payload).pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError)
    );
  }

  // Method for registration
  register(payload: any): Observable<any> {
    this.dialogService.show();
    return this.http.post(`${this.apiUrl}/auth/register`, payload).pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
  }

  // Service method to get all doctors with pagination
getAllDoctors(page: number, limit: number): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Pass page and limit as query parameters
  return this.http.get(`${this.apiUrl}/doctors/all-doctors?page=${page}&limit=${limit}`, { headers }).pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError)
  );
}

// add doctor
addDoctor(payload: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/doctors/add`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

getAvailableDoctors(page: number, pageSize: number): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/patient/availableDoctors?page=${page}&pageSize=${pageSize}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );;
}

bookAppointment(payload: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/appointments/book`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

getAppointmentBookingDetails(patientId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/patient/appointmentDetails/${patientId}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );;
}

// Cancel Appointent

cancelAppointment(payload: any,appointmentId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/appointments/${appointmentId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

//  get doctor appointments

getDoctorAppointments(doctorId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/doctors/doctor-appointments/${doctorId}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );
}

//  Remove Doctor

removeDoctor(doctorId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete<any>(`${this.apiUrl}/doctors/remove-doctor/${doctorId}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );;
}

//  get All Patients

getAllPatients(page: number, pageSize: number): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/patient/allPatient?page=${page}&pageSize=${pageSize}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );
}

//  get All Appointments

getAllAppointments(page: number, pageSize: number): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/patient/allAppointments?page=${page}&pageSize=${pageSize}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );
}

confirmAppointment(payload: any,appointmentId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/confirmAppointment/${appointmentId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

cancelAppointments(payload: any,appointmentId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/cancelAppointment/${appointmentId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

// edit doctor details

editDoctorDetails(payload: any, doctorId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.put(`${this.apiUrl}/doctors/edit-doctor-details/${doctorId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

// patient profile

getPatientById(patientId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  // If the token exists, add it to the headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(`${this.apiUrl}/patient/profile/${patientId}`,{headers})
  .pipe(
    finalize(() => this.dialogService.hide()),
    catchError(this.handleError) // Handles any API errors
  );
}

// edit patient profile

editPatientProfileDetails(payload: any, patientId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/editPatientProfile/${patientId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

// add doctor availability

addDoctorAvailability(payload: any, doctorId: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/doctors/add-doctor-availability/${doctorId}`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

// check doctor availability limit

checkAvailabilityLimit(payload: any): Observable<any> {
  this.dialogService.show();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Handle the case where the token is missing (e.g., redirect to login)
    console.error('Authorization token is missing!');
    return throwError('Unauthorized request. No token found.');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  });

  return this.http.post(`${this.apiUrl}/patient/checkAvailabilityLimit`, payload, { headers })
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

forgotPassword(payload: any): Observable<any> {
  this.dialogService.show();
  // const token = localStorage.getItem('authToken');
  
  // if (!token) {
  //   // Handle the case where the token is missing (e.g., redirect to login)
  //   console.error('Authorization token is missing!');
  //   return throwError('Unauthorized request. No token found.');
  // }

  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${token}`,
  //   'Content-Type': 'application/json' // Ensure Content-Type is set for the request
  // });

  return this.http.post(`${this.apiUrl}/patient/forgotPassword`, payload)
    .pipe(
      finalize(() => this.dialogService.hide()),
      catchError(this.handleError) // Handles any API errors
    );
}

// /patient/appointments/book
  //  // get all doctor's
  //  getAllDoctors(): Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //   // If the token exists, add it to the headers
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get(`${this.apiUrl}/doctors/all-doctors`, { headers }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Handle any errors from HTTP requests
  // private handleError(error: any): Observable<any> {
  //   console.error('API error: ', error);
  //   return throwError(error.message || 'Server error');
  // }

  // Example of setting headers (if needed for API authorization)
  // private getHeaders() {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Bearer ' + this.authService.getToken() // Use JWT or token if necessary
  //   });
  // }

  // getDoctors(): Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
  //   return this.http.get(this.apiUrl, { headers });
  // localStorage.removeItem('authToken');
  // }
  
}
