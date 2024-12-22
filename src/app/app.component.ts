import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BalanceService } from './services/balance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
})
export class AppComponent {
  isLoggedIn = false;
  currentBalance = 0;

  constructor(
    private authService: AuthService,
    private balanceService: BalanceService
  ) {
    this.authService.isLoggedIn$.subscribe(
      (status) => (this.isLoggedIn = status)
    );

    this.balanceService.balance$.subscribe(
      (balance) => (this.currentBalance = balance)
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
