import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('hello-world-app');
  protected readonly isServerRunning = signal(true);
  constructor(private router: Router) {};

  user_id = 999;

  LoginForm = new FormGroup({
    user_id: new FormControl('', [
      Validators.required
    ])
  });

  onSubmit() {
    const user_id = Number(this.LoginForm.value.user_id);

    this.router.navigate(['/study-bmi', user_id]);
  }
}
