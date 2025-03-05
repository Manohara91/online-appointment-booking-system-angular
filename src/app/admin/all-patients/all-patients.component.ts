import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RemoveDoctorComponent } from '../remove-doctor/remove-doctor.component';

export interface Patient {
  name: string;
  email: string;
  // specialization: string;
  // availability: string[];
  // experience: number;
  // qualification: string;
}


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.scss']
})
export class AllPatientsComponent implements OnInit {
  patients: any[] = []; // Array to hold the doctor data
  // dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name','email','phoneNo','age','address']; // Columns to display in table
  // @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  @ViewChild(MatSort) sort: MatSort | undefined;
  isFiltering = false;
  totalPatients: number = 0;
  currentPageNumber: number = 0; 
  itemsPerPage: number = 5;

  constructor(
      private apiService: AuthService, 
      private router: Router,
      public dialog: MatDialog
    ) {}
    
  ngOnInit(): void {
    this.getAllPatients();
  }
  ngOnChanges(){
    }
    getAllPatients(pageIndex: number = 0, pageSize: number = 5) {
      try {
        const pageNumber = pageIndex + 1;
        this.apiService.getAllPatients(pageNumber, pageSize).subscribe(response => {
          // Check if the response is valid and contains 'patients' which is an array
          if (response && response.patients && Array.isArray(response.patients)) {
            console.log("Response:", response);
    
            // Process the patients data
            this.patients = response.patients;  // Use response.patients here
            this.totalPatients = response.totalPatients;
            this.dataSource = new MatTableDataSource(this.patients);
            
    
            // Set the paginator
            // if (this.paginator) {
            //   this.dataSource.paginator = this.paginator;
            // }
          } else {
            console.error('Error: No patients data found or response.patients is not an array');
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    onPageChange(event: any): void {
      console.log('Page Index:', event.pageIndex); // Log the page index
      console.log('Page Size:', event.pageSize);   // Log the page size
  
      // Fetch appointments for the selected page and page size
      this.getAllPatients(event.pageIndex, event.pageSize);
    }
    
    // getAllPatients(pageIndex: number = 0, pageSize: number = 100) {
    //   try {
    //     this.apiService.getAllPatients(pageIndex + 1, pageSize).subscribe(response => {
    //       // Check if the response is valid and contains data
    //       if (response && response.data && Array.isArray(response.patients)) {
    //         console.log("Response:", response);
    
    //         // Process the patients data
    //         this.patients = response.patients;
    //         this.dataSource = new MatTableDataSource(this.patients);
    
    //         // Set the paginator
    //         if (this.paginator) {
    //           this.dataSource.paginator = this.paginator;
    //         }
    //       } else {
    //         console.error('Error: No patients data found or response is not an array');
    //       }
    //     });
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }
    

  // getAllPatients(pageIndex: number = 0, pageSize: number = 100){
  //   try {
  //     this.apiService.getAllPatients(pageIndex + 1, pageSize).subscribe(response => {
  //       console.log("response :", response);
  //       if (response && response.patients) {
  //         // Update the doctors list and total doctors count
  //         this.patients = response.data;
  //         // this.totalDoctors = response.totalDoctors;  // Total count from the response
    
  //         // Set the dataSource with the doctor list
  //         this.dataSource = new MatTableDataSource(this.patients);
  //         console.log("dataSource :", this.dataSource);
          
    
  //         // Assign the paginator to the dataSource
  //         if (this.paginator) {
  //           this.dataSource.paginator = this.paginator;
  //         }
  //       } else {
  //         console.error('Error: No patients data found in the response');
  //       }
        
  //     });
  //   } catch (error) {
  //     console.log("error :", error);
      
  //   }
  // }
  // getAllPatients(pageIndex: number = 0, pageSize: number = 100) {
  //   try {
  //     this.apiService.getAllPatients(pageIndex + 1, pageSize).subscribe(response => {
  //       // Safely log the response data
  //       console.dir(response, { depth: null });
  
  //       if (response && response.patients) {
  //         // Check if the response data is valid and has no circular references
  //         this.patients = this.removeCircularReferences(response.data);
  //         console.log("patients:", this.patients);
  
  //         // Set up the MatTableDataSource
  //         this.dataSource = new MatTableDataSource(this.patients);
  
  //         // Set the paginator
  //         if (this.paginator) {
  //           this.dataSource.paginator = this.paginator;
  //         }
  //       } else {
  //         console.error('Error: No patients data found in the response');
  //       }
  //     });
  //   } catch (error) {
  //     console.log("error :", error);
  //   }
  // }
  
  // removeCircularReferences(obj: any) {
  //   const cache = new Set();
  //   const result = JSON.parse(JSON.stringify(obj, (key, value) => {
  //     if (typeof value === "object" && value !== null) {
  //       if (cache.has(value)) {
  //         return; // Prevent circular reference
  //       }
  //       cache.add(value);
  //     }
  //     return value;
  //   }));
  //   return result;
  // }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If no filter matches, the matNoDataRow will show
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deletePatient(patient: string): void{
    console.log("patient :", patient);
    // console.log('Delete patient:', patient);
    //       const dialogRef = this.dialog.open(RemoveDoctorComponent, {
    //         width: '500px',
    //         height: '250px',
    //         data: {record: patient, type: 'Patient'} 
    //       });
      
    //       dialogRef.afterClosed().subscribe((response) => {
    //         if(response){
    //           this.getAllPatients();
    //         }else{}
    //       });
    
  }

}