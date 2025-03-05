import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service'

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.scss']
})
export class AppointmentBookingComponent implements OnInit {

  doctor: any = {};
  patientId: any;
  patientComment: string = '';
  selectedAvailability: any;
  isDisabled: boolean = false; 
  message: string = '';

  // appointmentData: any;
  // isBtnDisabled: boolean = true;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private apiservice: AuthService,
    public dialogService: DialogService,
     private router: Router
    ) {}

  ngOnInit(): void {
    // Get query parameters
    this.route.queryParams.subscribe(params => {
      const doctorData = params['data'];
      const patientId = params['patient_id'];
      this.doctor = JSON.parse(doctorData);
      this.patientId = JSON.parse(patientId);
      console.log('Doctor:', this.doctor); 
      console.log("patientId:", this.patientId); 
    })
    // this.isFormValid();
    // this.checkBookedStatusPending();
  }
  
  goBack(): void {
    this.location.back(); // This will take the user back to the previous page
  }

  onAvailabilityChange(event: any) {
    const payload = {
      doctorId: this.doctor._id,
      patientId: this.patientId.id,  // Make sure you have patientId in your component
      appointmentTime: event
    };
  
    this.apiservice.checkAvailabilityLimit(payload).subscribe(response => {
      console.log("Response from API:", response);
  
      if (!response.result) { 
        // If result is false, the patient has already booked or the slot is full
        this.message = response.message;  // Show the message from the API
        this.selectedAvailability = null; // Reset selection
        this.isDisabled = true;  // Disable comment box and book button
      } else {
        this.message = '';  // Clear previous messages
        this.selectedAvailability = event;  // Allow booking
        this.isDisabled = false;  // Enable comment box and book button
      }
    });
  }
  

  // onAvailabilityChange(event: any){
  //   const payload ={
  //     doctorId: this.doctor._id,
  //     appointmentTime: event
  //   };
  //   this.apiservice.checkAvailabilityLimit(payload).subscribe(response => {
  //     console.log("response :", response);
      
  //     if(response.result){
  //       this.message = `Maximum booking reached for this doctor please book other time slot`;
  //     }else{
  //       this.selectedAvailability = event;
  //       console.log("selectedAvailability :", this.selectedAvailability);
  //     }
  //   });
    
  // }
//   onAvailabilityChange(event: any) {
//     const payload = {
//       doctorId: this.doctor._id,
//       appointmentTime: event
//     };

//     this.apiservice.checkAvailabilityLimit(payload).subscribe(response => {
//       console.log("response :", response);

//       if (response.result) {
//         this.message = `Maximum booking reached for this doctor, please book another time slot`;
//         this.selectedAvailability = null;  // Reset selection if the slot is unavailable
//       } else {
//         this.message = ''; // Clear the message when selecting a valid slot
//         this.selectedAvailability = event; // Correctly update selectedAvailability
//       }
//     });
// }

// onAvailabilityChange(event: any) {
//   const payload = {
//     doctorId: this.doctor._id,
//     appointmentTime: event
//   };

//   this.apiservice.checkAvailabilityLimit(payload).subscribe(response => {
//     console.log("response :", response);

//     if (!response.result) { 
//       // If result is false, limit is reached
//       this.message = `Maximum booking reached for this doctor, please choose another time slot.`;
//       this.selectedAvailability = null; // Reset selection
//       this.isDisabled = true; // Disable comment box and book button
//     } else {
//       this.message = ''; // Clear message
//       this.selectedAvailability = event; // Allow booking
//       this.isDisabled = false; // Enable comment box and book button
//     }
//   });
// }


  onCommentChange(newComment: string): void {
    this.patientComment = newComment;
    console.log('Updated Comment:', this.patientComment);
  }
  get isFormValid(): boolean {
    return !(this.selectedAvailability && this.patientComment) || this.isDisabled;
  }
  
  // get isFormValid(): boolean {
  //   // Return true if both selectedAvailability and patientComment are empty
  //   return !this.selectedAvailability || !this.patientComment;
  // }
//   get isFormValid(): boolean {
//     return !(this.selectedAvailability && this.patientComment);
// }
// get isFormValid(): boolean {
//   return !(this.selectedAvailability && this.patientComment) || this.isDisabled;
// }

bookAppointment(): void {
  try {
    if (this.isDisabled) {
      this.dialogService.showNotification(`Cannot book appointment. The selected slot is unavailable.`, 'error', 'top', 1000);
      return;
    }

    if (!this.selectedAvailability || !this.patientComment) {
      this.dialogService.showNotification(`Please select an availability and write a comment.`, 'warning', 'top', 1000);
      return;
    }

    const payload = {
      doctorId: this.doctor._id,
      patientId: this.patientId.id,
      appointmentTime: this.selectedAvailability,
      comment: this.patientComment,  // Ensure comment is included
    };

    this.apiservice.bookAppointment(payload).subscribe({
      next: (response) => {
        console.log("response :", response);
        if (response.result) {
          this.goBack();
          this.dialogService.showNotification(`Appointment Booked Successfully`, 'success', 'top', 1000);
          this.router.navigate(['/book-appointment']);
        } else {
          this.dialogService.showNotification(`Booking Failed`, 'error', 'top', 1000);
        }
      },
      error: (error) => {
        console.error("API Error:", error);
        this.dialogService.showNotification(`An error occurred. Please try again later.`, 'error', 'top', 1000);
      }
    });

  } catch (error) {
    console.error("Unexpected Error:", error);
    this.dialogService.showNotification(`Something went wrong. Please try again.`, 'error', 'top', 1000);
  }
}



  // bookAppointment(): void {
  //   try {
  //     if (!this.selectedAvailability || !this.patientComment) {
  //       // Handle error: both availability and comment are required
  //       console.log("Please select an availability and write a comment.");
  //       return;
  //     }else{
        
  //     const payload = {
  //       doctorId: this.doctor._id,
  //       patientId: this.patientId.id,
  //       appointmentTime: this.selectedAvailability,
  //       // comment: this.patientComment,
  //     };
  
  //     this.apiservice.bookAppointment(payload).subscribe(response => {
  //       console.log("response :", response);
  //       if(response.result){
  //         this.goBack();
  //         this.dialogService.showNotification(`Appointment Booked Successfully`, 'success', 'top', 1000);
  //         this.router.navigate(['/book-appointment']);
  //       }else{
  //         this.dialogService.showNotification(`Booking Failed`, 'error', 'top', 1000);
  //       }
  //     });
  //     }
  //   } catch (error) {
  //     console.log("error :", error); 
  //   }
  // }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  cancelAppointment(){}
  // checkBookedStatusPending(){
  //   try {
  //     this.apiservice.getAppointmentBookingDetails().subscribe(response => {
  //       console.log("response :", response);
  //       if(response.result){
  //         this.appointmentData = response.data;
  //       }
        
  //     });
  //   } catch (error) {
  //     console.log("error :", error);
      
  //   }
  // }

}

