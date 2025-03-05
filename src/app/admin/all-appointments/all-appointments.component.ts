import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmAppointmentComponent } from '../confirm-appointment/confirm-appointment.component';
import { CancelAppointmentComponent } from '../cancel-appointment/cancel-appointment.component';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.scss']
})
export class AllAppointmentsComponent implements OnInit {
  appointments: any[] = []; // Array to hold the doctor data
  // dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['doctorName','patientName','createdAt','appointmentTime','status','actions']; // Columns to display in table
  // 'CanceledBy','CanceledDate',
  // @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  canceledStatus: any;
  totalAppointments: number = 0;
  currentPageNumber: number = 0; 
  itemsPerPage: number = 5;
  
constructor(private apiService: AuthService, 
    private router: Router,public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments(pageIndex: number = 0, pageSize: number = 5): void {
    try {
      // Adjust the pageIndex to 1-based for the backend
      const pageNumber = pageIndex + 1;  // Convert to 1-based indexing for API call

      // Fetch data from API
      this.apiService.getAllAppointments(pageNumber, pageSize).subscribe(response => {
        if (response && response.appointments && Array.isArray(response.appointments)) {
          console.log('Response:', response);

          // Assign appointments and totalAppointments
          this.appointments = response.appointments;
          this.totalAppointments = response.totalAppointments;

          // Set dataSource with fetched appointments
          // this.dataSource.data = this.appointments;
          this.dataSource = new MatTableDataSource(this.appointments);
          

          // // Ensure paginator is set after data fetch
          // if (this.paginator) {
          //   this.dataSource.paginator = this.paginator;
          // }
        } else {
          console.error('Error: No appointments data found or response.appointments is not an array');
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onPageChange(event: any): void {
    console.log('Page Index:', event.pageIndex); // Log the page index
    console.log('Page Size:', event.pageSize);   // Log the page size

    // Fetch appointments for the selected page and page size
    this.getAllAppointments(event.pageIndex, event.pageSize);
  }

  // getAllAppointments(pageIndex: number = 0, pageSize: number = 5) {
  //   try {
  //     this.apiService.getAllAppointments(pageIndex + 1, pageSize).subscribe(response => {
  //       // Check if the response is valid and contains 'appointments' which is an array
  //       if (response && response.appointments && Array.isArray(response.appointments)) {
  //         console.log("Response:", response);
  
  //         // Process the appointments data
  //         this.appointments = response.appointments; // Use response.appointments here
  //         this.totalAppointments = response.totalAppointments;
  //         this.appointments.forEach(element => {
  //           this.canceledStatus = element.status === 'canceled'
  //         });
  //         this.dataSource = new MatTableDataSource(this.appointments);
  
  //         // Set the paginator
  //         if (this.paginator) {
  //           this.dataSource.paginator = this.paginator;
  //         }
  //       } else {
  //         console.error('Error: No appointments data found or response.appointments is not an array');
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  
  // onPageChange(event: any) {
  //   console.log("Page Index:", event.pageIndex); // Log the page index
  //   console.log("Page Size:", event.pageSize);   // Log the page size
  //   // const pageIndex = event.pageIndex;
  //   // const pageSize = event.pageSize;
  //   this.getAllAppointments(event.pageIndex, event.pageSize);
  // }

  // getAllAppointments(pageIndex: number = 0, pageSize: number = 100) {
  //       try {
  //         this.apiService.getAllPatients(pageIndex + 1, pageSize).subscribe(response => {
  //           // Check if the response is valid and contains 'patients' which is an array
  //           if (response && response.patients && Array.isArray(response.patients)) {
  //             console.log("Response:", response);
      
  //             // Process the patients data
  //             this.patients = response.patients;  // Use response.patients here
  //             this.dataSource = new MatTableDataSource(this.patients);
      
  //             // Set the paginator
  //             if (this.paginator) {
  //               this.dataSource.paginator = this.paginator;
  //             }
  //           } else {
  //             console.error('Error: No patients data found or response.patients is not an array');
  //           }
  //         });
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If no filter matches, the matNoDataRow will show
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  confirmAppointment(appointment: string): void {
      console.log('confirm appointment:', appointment);
        const dialogRef = this.dialog.open(ConfirmAppointmentComponent, {
          width: '500px',
          height: '250px',
          data: appointment
        });
    
        dialogRef.afterClosed().subscribe((response) => {
          console.log("response :",response);
          
          if(response){
            this.getAllAppointments();
          }else{}
        });
    }

    cancelAppointment(appointment: string): void {
      console.log('cancel appointment:', appointment);
        const dialogRef = this.dialog.open(CancelAppointmentComponent, {
          width: '600px',
          height: '400px',
          data: appointment
        });
    
        dialogRef.afterClosed().subscribe((response) => {
          if(response){
            this.getAllAppointments();
          }else{}
        });
    }
    

}

