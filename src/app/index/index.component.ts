import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class IndexComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      disable: 'mobile'
    });
  }

  navigateToRestaurants() {
    this.router.navigate(['/restaurant']);
  }
}
