import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-remove-doctor',
  templateUrl: './remove-doctor.component.html',
  styleUrls: ['./remove-doctor.component.scss']
})
export class RemoveDoctorComponent implements OnInit {

  constructor(
    private apiService: AuthService,
    private dialogService: DialogService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RemoveDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit(): void {
  }
  ngOnChanges(){
    console.log("data :", this.data);
  }

  onNoClick(){
    this.dialogRef.close(false);
  }
  onYesClick(){
    this.apiService.removeDoctor(this.data._id).subscribe(response =>{
      if(response.result){
        this.dialogRef.close(true);
        this.dialogService.showNotification(`Doctor has been deleted successfully`, 'success', 'top', 1000);
      }else{
        this.dialogRef.close(false);
        this.dialogService.showNotification(`Deletion failed`, 'error', 'top', 1000);
      }
    });
  }

}

