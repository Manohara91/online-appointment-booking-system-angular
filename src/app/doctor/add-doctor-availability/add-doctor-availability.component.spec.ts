import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorAvailabilityComponent } from './add-doctor-availability.component';

describe('AddDoctorAvailabilityComponent', () => {
  let component: AddDoctorAvailabilityComponent;
  let fixture: ComponentFixture<AddDoctorAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
