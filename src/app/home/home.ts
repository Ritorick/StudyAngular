import { Component, signal, ChangeDetectorRef  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { BmiApiService } from '../services/bmi-api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('hello-world-app');
  protected readonly isServerRunning = signal(true);
  constructor(
    private router: Router,
    private bmiApi: BmiApiService,
    private cdr: ChangeDetectorRef
  ) {};

  loginError = "";
  accountNotFound = "";

  LoginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    //this.router.navigate(['/register']);
    const { username, password } = this.LoginForm.getRawValue();

    this.bmiApi.login(username, password).subscribe({
      next: result => {
        console.log(result);
        this.router.navigate(['/study-bmi', result.userId]);
      },
      error: error => {
        console.log(error.status);
        if(error.status == 401 && error.error.code == "INVALID_CREDENTIALS") {
          console.error('パスワードが正しくありません');
          this.loginError = 'パスワードが正しくありません。 Code:' + error.status;
          this.cdr.detectChanges();
          return;
        }
        if(error.status == 404 && error.error.code == "ACCOUNT_NOT_FOUND") {
          console.error("ユーザーが見つかりません");
          this.accountNotFound = "ACCOUNT_NOT_FOUND";
          this.cdr.detectChanges();
          return;
        }
        console.error('ログインに失敗しました', error);
        this.loginError = 'ログインに失敗しました。 Code:' + error.status;
        this.cdr.detectChanges();
      }
    });
  }
}
