import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyBMI } from './study-bmi';

describe('StudyBMI', () => {
  let component: StudyBMI;
  let fixture: ComponentFixture<StudyBMI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyBMI],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyBMI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
