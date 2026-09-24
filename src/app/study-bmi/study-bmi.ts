import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'


@Component({
  selector: 'app-study-bmi',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './study-bmi.html',
  styleUrl: './study-bmi.css',
})
export class StudyBMI {
  protected readonly title = signal('hello-world-app');

  bmi: number = 0;

  BMIDataInputForm = new FormGroup({
    weight: new FormControl('', [
      Validators.required
    ]),
    height : new FormControl('', [
      Validators.required
    ])
  });

  onSubmit() {
    const weight = Number(this.BMIDataInputForm.value.weight);
    const height = Number(this.BMIDataInputForm.value.height);

    this.bmi = Number((weight / ((height / 100) ** 2)).toFixed(1));
  }
}