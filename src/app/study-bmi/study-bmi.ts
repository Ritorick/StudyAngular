import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-study-bmi',
  imports: [RouterLink],
  templateUrl: './study-bmi.html',
  styleUrl: './study-bmi.css',
})
export class StudyBMI {
  protected readonly title = signal('hello-world-app');
}