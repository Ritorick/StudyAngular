import { Component, signal, ChangeDetectorRef  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { BmiApiService } from '../services/bmi-api.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected readonly title = signal('hello-world-app');
  protected readonly isServerRunning = signal(true);
  constructor(
    private router: Router,
    private bmiApi: BmiApiService,
    private cdr: ChangeDetectorRef
  ) {};

  registerError = "";
  registerDisable = true;
  showPassword = false;
  showConfirmPassword = false;

  RegisterForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  }, {
    validators: control => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    }
  });

  onSubmit() {
    const { username, password } = this.RegisterForm.getRawValue();

    this.bmiApi.register(username, password).subscribe({
      next: result => {
        console.log(result);
        this.registerDisable = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('登録に失敗しました', error);
        this.registerError = '登録に失敗しました。 ' + error.error.message;
        this.cdr.detectChanges();
      }
    });
  }
}
