import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditPatientProfileDetailsComponent } from '../edit-patient-profile-details/edit-patient-profile-details.component';

@Component({
  selector: 'app-patient-profile-details',
  templateUrl: './patient-profile-details.component.html',
  styleUrls: ['./patient-profile-details.component.scss']
})
export class PatientProfileDetailsComponent  implements OnInit {

  patientId: any;
  patientProfile: any;

  constructor(
    private route: ActivatedRoute,
    private apiservice: AuthService,
    // public dialogService: DialogService,
    private location: Location,
     private router: Router,
     public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
          if (token) {
            this.patientId = jwt_decode(token);
            console.log("patientId Token:", this.patientId);
          } else {
            console.log("No token found in localStorage");
          }
          this.getPatientProfile();
          
  }

  getPatientProfile(){
    console.log("patient id :", this.patientId);
    
    try {
      this.apiservice.getPatientById(this.patientId.id).subscribe(response => {
        console.log("response :", response);
        if(response.result){
          this.patientProfile = response.patientProfile;
        }
      });
    } catch (error) {
      console.log("error :", error);
      
    }
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back(); // This will take the user back to the previous page
  }
  editProfile(profileData: any){
    try {
      const dialogRef = this.dialog.open(EditPatientProfileDetailsComponent, {
                  width: '700px',
                  height: '500px',
                  data: profileData
                });
            
                dialogRef.afterClosed().subscribe((response) => {
                  if(response){
                    this.getPatientProfile();
                  }else{}
                });
    } catch (error) {
      console.log("error :", error);
    }
  }

}


