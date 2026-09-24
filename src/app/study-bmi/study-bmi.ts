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
  height: number = 0;
  weight: number = 0;
  assessment: String = "";
  color = 'white';

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
    this.height = height;
    if (this.bmi >= 40) {
      this.assessment = "肥満(4度)";
      this.color = 'darkred'
    } else if (this.bmi >= 35) {
      this.assessment = "肥満(3度)";
      this.color = 'red'
    } else if (this.bmi >= 30) {
      this.assessment = "肥満(2度)";
      this.color = 'orange'
    } else if (this.bmi >= 25) {
      this.assessment = "肥満(1度)";
      this.color = 'gold'
    } else if (this.bmi >= 18.5) {
      this.assessment = "普通体重";
      this.color = 'yellowgreen'
    } else {
      this.assessment = "低体重";
      this.color = 'blue'
    }
  }
}