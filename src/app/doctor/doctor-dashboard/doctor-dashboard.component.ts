import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { EditDoctorDetailsComponent } from '../edit-doctor-details/edit-doctor-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { CancelAppointmentComponent } from 'src/app/admin/cancel-appointment/cancel-appointment.component';
import { ConfirmAppointmentComponent } from 'src/app/admin/confirm-appointment/confirm-appointment.component';
import { AddDoctorAvailabilityComponent } from '../add-doctor-availability/add-doctor-availability.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {
  // availabilityOptions: string[] = [
  //   "Monday 9AM-12PM",
  //   "Monday 1PM-4PM",
  //   "Tuesday 9AM-12PM",
  //   "Tuesday 1PM-4PM",
  //   "Wednesday 9AM-12PM",
  //   "Wednesday 1PM-4PM",
  //   "Thursday 9AM-12PM",
  //   "Thursday 1PM-4PM",
  //   "Friday 9AM-12PM",
  //   "Friday 1PM-4PM"
  // ];
  decoded: any;
  doctor: any = {};
  appointments: any[] = [];

  constructor(private apiService: AuthService,
    private router: Router,private dialogService: DialogService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.decoded = jwt_decode(token);
        console.log("Decoded Token:", this.decoded);
      } else {
        console.log("No token found in localStorage");
      }
      this.getDoctorAppointments();
  }

  // Fetch Doctor Details and Appointments
  getDoctorAppointments() {
    try {
      this.apiService.getDoctorAppointments(this.decoded.id).subscribe(response => {
        console.log("response :", response);
  
        if (response && response.result) {
          const doctorData = response.data[0].doctorDetails;
          const appointments = response.data[0].appointments;
          console.log("appointments :", appointments);
          
          // Assign doctor details
          this.doctor = {
            id: doctorData._id,
            name: doctorData.name,
            email: doctorData.email,
            phone: doctorData.phoneNo,
            experience: doctorData.experience,
            specialization: doctorData.specialization,
            hospital: doctorData.hospital,
            availability: doctorData.availability,
          };
  
          // Assign appointments data
          this.appointments = appointments
          .sort((a: { status: string; }, b: { status: string; }) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1; // 'pending' should come first
            if (b.status === 'pending' && a.status !== 'pending') return 1;  // 'pending' should come first
            return 0;  // Maintain the original order for the rest
          })
          .map((appointment: {_id: any, patientId: any; patientName: any; appointmentTime: any; status: any; createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
            _id: appointment._id,
            patientId: appointment.patientId,
            patientName: appointment.patientName,
            appointmentTime: appointment.appointmentTime,
            status: appointment.status,
            createdAt: new Date(appointment.createdAt),
            updatedAt: new Date(appointment.updatedAt),
          }));

          // this.appointments = appointments.map((appointment: { patientId: any; patientName: any; appointmentTime: any; status: any; createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
          //   patientId: appointment.patientId,
          //   patientName: appointment.patientName,
          //   appointmentTime: appointment.appointmentTime,
          //   status: appointment.status,
          //   createdAt: new Date(appointment.createdAt),
          //   updatedAt: new Date(appointment.updatedAt),
          // }));
  
        } else {
          console.error('Invalid response structure or result not true');
        }
      });
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  }
  
  // getDoctorAppointments() {
  //   try {
  //     this.apiService.getDoctorAppointments(this.decoded.id).subscribe(response => {
  //       console.log("response :", response);

  //       if (response && response.result) {
  //         const doctorData = response.data[0].doctorDetails;
  //         const appointments = response.data[0].appointments;

  //         // Assign doctor details
  //         this.doctor = {
  //           id: doctorData._id,
  //           name: doctorData.name,
  //           email: doctorData.email,
  //           specialization: doctorData.specialization,
  //           hospital: doctorData.hospital,
  //           availability: doctorData.availability,
  //         };

  //         // Assign appointments data
  //         this.appointments = appointments.map(appointment => ({
  //           patientId: appointment.patientId,
  //           patientName: appointment.patientName,
  //           appointmentTime: appointment.appointmentTime,
  //           status: appointment.status,
  //           createdAt: new Date(appointment.createdAt),
  //           updatedAt: new Date(appointment.updatedAt),
  //         }));
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching doctor appointments:", error);
  //   }
  // }

  // Modal functionality for updating availability
  addAvailability(doctorAvailabilityTime: any) {
    // console.log("doctorAvailabilityTime :", doctorAvailabilityTime);
          // return
            const dialogRef = this.dialog.open(AddDoctorAvailabilityComponent, {
              width: '600px',
              height: '350px',
              data: doctorAvailabilityTime,
              
            });
        
            dialogRef.afterClosed().subscribe((response) => {
              console.log("response :",response);
              
              if(response){
                this.getDoctorAppointments();
              }else{}
            });
    
   }

  closeEditDoctorModal() {
    // Logic to close the modal
  }

  updateDoctorDetails() {
    // Call the API to update doctor details
    console.log("Updated doctor details:", this.doctor);
    // After updating, close the modal
    // this.closeEditDoctorModal();
  }

  

  closeAvailabilityModal() {
    
    // Logic to close modal
  }

  // updateAvailability() {
  //   // Update the doctor's availability
  //   console.log("Updated doctor availability:", this.doctor);
  //   // After updating, close the modal
  //   // this.closeAvailabilityModal();
  // }

  // Confirm or Cancel appointment
  confirmAppointment(appointment: string): void {
          console.log('confirm appointment:', appointment);
          // return
            const dialogRef = this.dialog.open(ConfirmAppointmentComponent, {
              width: '500px',
              height: '250px',
              data: appointment
            });
        
            dialogRef.afterClosed().subscribe((response) => {
              console.log("response :",response);
              
              if(response){
                this.getDoctorAppointments();
              }else{}
            });
        }

  cancelAppointment(appointment: string): void {
          console.log('cancel appointment:', appointment);
          // return
            const dialogRef = this.dialog.open(CancelAppointmentComponent, {
              width: '600px',
              height: '400px',
              data: appointment
            });
        
            dialogRef.afterClosed().subscribe((response) => {
              if(response){
                this.getDoctorAppointments();
              }else{}
            });
        }


  editDoctorDetails(doctor: any) {
    console.log("doctor :", doctor);
    const dialogRef = this.dialog.open(EditDoctorDetailsComponent, {
      width: '800px',
      height: '585px',
      data: doctor
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log("response :",response);
      
      if(response){
        this.getDoctorAppointments();
      }else{}
    });
    
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
