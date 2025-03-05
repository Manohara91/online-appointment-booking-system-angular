import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookingDetailsComponent } from './appointment-booking-details.component';

describe('AppointmentBookingDetailsComponent', () => {
  let component: AppointmentBookingDetailsComponent;
  let fixture: ComponentFixture<AppointmentBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
