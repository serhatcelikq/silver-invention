import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  constructor() {
    this.loadBalance();
  }

  loadBalance() {
    const savedBalance = localStorage.getItem('userBalance');
    if (savedBalance) {
      this.balanceSubject.next(Number(savedBalance));
    }
  }

  updateBalance(amount: number) {
    localStorage.setItem('userBalance', amount.toString());
    this.balanceSubject.next(amount);
  }
} 