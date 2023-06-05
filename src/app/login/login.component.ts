import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Login } from '../login.model';
import { Signup } from '../signup.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  signupForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accService: AccountService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSignUp() {
    if (this.signupForm.invalid) {
      return;
    }

    this.signupUsers.push(this.signupForm.value);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupForm.reset();
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.accService.onLogin(this.loginForm.value).subscribe((res: any) => {
      console.log('res', res);
      localStorage.setItem('token', res.token);
      // this.route.navigateByUrl('/');
    });
  }
}
