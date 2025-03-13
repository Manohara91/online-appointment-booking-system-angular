import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading = false;

  constructor(private loaderService: DialogService) {
    this.loaderService.isLoading.subscribe(status =>{
      this.isLoading = status;
    });
  }

  

}
