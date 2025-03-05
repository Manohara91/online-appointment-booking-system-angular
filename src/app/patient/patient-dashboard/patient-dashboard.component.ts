import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

interface Doctor {
  name: string;
  specialization: string;
  phoneNo: string;
  email: string;
  availability: string[];
  experience: string;
  hospital: string;
  rating: number;
  // Add other fields as needed, based on your API response
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  doctors: Doctor[] = []; 
  pageSize = 8;
  pageNumber = 1;
  totalDoctors = 0;
  decoded: any;
  doctor_image = 'assets/images/doctor_img.webp';
  // doctor_image = '../../../assets/images/doctor-img.jpg';
  // doctor_image = 'src\assets\images\doctor_img.jpg';

  constructor(private apiService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.fetchAvailableDoctors(); // Fetch doctors when the component is initialized
    const token = localStorage.getItem('authToken');
      if (token) {
        this.decoded = jwt_decode(token);
        console.log("Decoded Token:", this.decoded);
      } else {
        console.log("No token found in localStorage");
      }
    // console.log("localstorage id", localStorage.getItem('authToken'));
    
  }

  fetchAvailableDoctors(): void {
    // Make an API call to get doctors with pagination
    this.apiService.getAvailableDoctors(this.pageNumber, this.pageSize).subscribe(response => {
      this.doctors = response.doctors;
      this.totalDoctors = response.totalDoctors;
      console.log('Doctors:', this.doctors);  // Log doctors to verify data
    });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1; // 0-based index, so add 1 to get the actual page number
    this.pageSize = event.pageSize;
    this.fetchAvailableDoctors();
  }

  selectDoctor(doctor:any){
       // Navigate with query parameters to pass doctor details
       this.router.navigate(['/book-appointment'], {
        queryParams: { data: JSON.stringify(doctor), 
          patient_id: JSON.stringify(this.decoded) }});
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }


  bookingDetail(){
    this.router.navigate(['/booking-appointment-details'],{
      queryParams: { patient_id: JSON.stringify(this.decoded) }});
  }
  // bookingDetail(){
  //   try {
  //     this.apiService.getAppointmentBookingDetails().subscribe(response => {
  //       console.log("response :", response);
        
  //     });
  //   } catch (error) {
  //     console.log("error :", error);
      
  //   }
  // }

  // patientDetails(){
  //   this.router.navigate(['/patient-profile-details'],{
  //     queryParams: { patient_id: JSON.stringify(this.decoded) }});
  // }

  profile(){
    console.log("patient details");
    this.router.navigate(['/patient-profile']);
  }

}

