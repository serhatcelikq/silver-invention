import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signin.component.html', 
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SigninComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    // Validate inputs
    if (!this.email || !this.password) {
      this.errorMessage = "Email ve şifre gereklidir";
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = "Geçerli bir email adresi giriniz";
      return;
    }

    const credentials = {
      mail: this.email.trim(),
      password: this.password
    }

    this.apiService.login(credentials).subscribe({
      next: (res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/index']);
        } else {
          this.errorMessage = "Sunucudan geçerli bir yanıt alınamadı. Lütfen daha sonra tekrar deneyin.";
        }
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || "Giriş hatası oluştu";
        console.error("Login error:", error);
      }
    });
  }
}