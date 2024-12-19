import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BalanceService } from './services/balance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'yemek23';
  currentBalance: number = 0;

  constructor(private balanceService: BalanceService) {}

  ngOnInit() {
    // Bakiye değişikliklerini dinle
    this.balanceService.balance$.subscribe(balance => {
      this.currentBalance = balance;
    });
  }

  onSearch() {
    // Arama işlevi
  }
}
