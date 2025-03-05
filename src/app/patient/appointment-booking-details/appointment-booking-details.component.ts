import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-appointment-booking-details',
  templateUrl: './appointment-booking-details.component.html',
  styleUrls: ['./appointment-booking-details.component.scss']
})
export class AppointmentBookingDetailsComponent implements OnInit {

  patientId: any;
  appointmentData: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiservice: AuthService,
    // public dialogService: DialogService,
     private router: Router
    ) {}

  goBack(): void {
    this.location.back(); // This will take the user back to the previous page
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const patientId = params['patient_id'];
      this.patientId = JSON.parse(patientId);
      console.log("patientId:", this.patientId); 
    });
    this.getAppointmentBookingDetails()
  }

  getAppointmentBookingDetails(){
    try {
      this.apiservice.getAppointmentBookingDetails(this.patientId.id).subscribe(response => {
        console.log("response :", response);
        if(response.result){
          this.appointmentData = response.data;
          console.log("appointmentData :", this.appointmentData);
        }
        
      });
    } catch (error) {
      console.log("error :", error);
      
    }
  }
  cancelAppointment(appointmentId: string): void {
    // Call your API to cancel the appointment
    console.log(`Appointment ${appointmentId} canceled.`);
    const payload = {
      status: 'canceled'
    };
    this.apiservice.cancelAppointment(payload, appointmentId).subscribe(response => {
      if(response.result){
        console.log("canceled appointment");
        this.getAppointmentBookingDetails();
        
      }
    });
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}

