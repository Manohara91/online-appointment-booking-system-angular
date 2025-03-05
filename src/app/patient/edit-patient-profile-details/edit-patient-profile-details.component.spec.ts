import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileDetailsComponent } from './edit-patient-profile-details.component';

describe('EditPatientProfileDetailsComponent', () => {
  let component: EditPatientProfileDetailsComponent;
  let fixture: ComponentFixture<EditPatientProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
