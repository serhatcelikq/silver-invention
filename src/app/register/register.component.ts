import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onRegister(): void {
    // Form validation
    if (!this.userName || !this.userEmail || !this.userPassword) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userEmail)) {
      alert('Geçerli bir email adresi giriniz!');
      return;
    }

    // Password validation (minimum 6 characters)
    if (this.userPassword.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    const user = {
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword
    };

    this.apiService.register(user).subscribe({
      next: (response) => {
        console.log('Kayıt başarılı:', response);
        alert('Kayıt başarılı!');
        this.router.navigate(['/signin']); // Redirect to signin page after successful registration
      },
      error: (error) => {
        console.error('Kayıt işlemi sırasında hata oluştu:', error);
        if (error.status === 400) {
          alert('Bu email adresi zaten kullanımda!');
        } else {
          alert('Kayıt sırasında bir hata oluştu! Lütfen tekrar deneyin.');
        }
      }
    });
  }
}
