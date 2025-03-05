import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDoctorComponent } from '../remove-doctor/remove-doctor.component';

export interface Doctor {
  name: string;
  email: string;
  specialization: string;
  availability: string[];
  experience: number;
  qualification: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  doctors: any[] = []; // Array to hold the doctor data
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','email','phoneNo', 'specialization', 'availability', 'experience', 'hospital','actions']; // Columns to display in table

@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
@ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private apiService: AuthService, 
    private router: Router,public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.fetchAllDoctors(); 
  }

  // ngAfterViewInit(): void {
  //   // Set the paginator to the dataSource after view initialization
  //   this.dataSource.paginator = this.paginator;
  // }

   // Fetch all doctors from API
  //  fetchAllDoctors(): void {
  //   this.apiService.getAllDoctors().subscribe(response => {
  //     console.log('response:', response); // Log the response to see the structure

  //     if (response && response.doctors) {
  //       // Assign the doctors from the response to the 'doctors' array
  //       this.doctors = response.doctors;

  //       // Set the dataSource with the doctor list
  //       // this.dataSource.data = this.doctors;
  //       this.dataSource = new MatTableDataSource(this.doctors);
  //     } else {
  //       console.error('Error: No doctors data found in the response');
  //     }
  //   }, error => {
  //     console.error('Error fetching doctors:', error); // Log any error if the request fails
  //   });
  // }

  // Component method to fetch all doctors with pagination
fetchAllDoctors(pageIndex: number = 0, pageSize: number = 100): void {
  // Call the service method with pagination parameters
  this.apiService.getAllDoctors(pageIndex + 1, pageSize).subscribe(response => {
    console.log('response:', response);

    if (response && response.doctors) {
      // Update the doctors list and total doctors count
      this.doctors = response.doctors;
      // this.totalDoctors = response.totalDoctors;  // Total count from the response

      // Set the dataSource with the doctor list
      this.dataSource = new MatTableDataSource(this.doctors);

      // Assign the paginator to the dataSource
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    } else {
      console.error('Error: No doctors data found in the response');
    }
  }, error => {
    console.error('Error fetching doctors:', error);
  });
}

  


  // Apply filter for the doctor list
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If no filter matches, the matNoDataRow will show
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Edit doctor function (to be implemented)
  // editDoctor(doctor: any): void {
  //   console.log('Editing doctor:', doctor);
  //     const dialogRef = this.dialog.open(, {
  //       width: '800px',
  //       height: '500px',
  //       data: doctor
  //     });
  
  //     dialogRef.afterClosed().subscribe((response) => {
  //       if(response){
  //         // this.fetchAllDoctors();
  //       }else{}
  //       // this.loadDoctors(); // Refresh the doctor list after adding a new doctor
  //     });
  // }

  // Delete doctor function (to be implemented)
  deleteDoctor(deleteDoctor: string): void {
    console.log('Editing doctor:', deleteDoctor);
      const dialogRef = this.dialog.open(RemoveDoctorComponent, {
        width: '500px',
        height: '250px',
        data: deleteDoctor
      });
  
      dialogRef.afterClosed().subscribe((response) => {
        if(response){
          this.fetchAllDoctors();
        }else{}
      });
  }

  // On page change function for pagination (optional)
  onPaginateChange(event: any): void {
    console.log('Page changed:', event);
  }

  // Handle pagination and sorting
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  openAddDoctorDialog(): void {
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((response) => {
      if(response){
        this.fetchAllDoctors();
      }else{}
      // this.loadDoctors(); // Refresh the doctor list after adding a new doctor
    });
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
