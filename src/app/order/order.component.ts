import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  portion: string;
  quantity: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  isFavorite: boolean;
  menu: MenuItem[];
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class OrderComponent implements OnInit {
  restaurant: Restaurant | null = null;
  selectedItems: MenuItem[] = [];
  orderSuccess = false;
  totalAmount = 0;
  currentBalance: number = 0;
  showBalanceError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const restaurantId = Number(this.route.snapshot.params['id']);
    
    // Önce favori restoranlardan kontrol et
    const savedFavorites = localStorage.getItem('favoriteRestaurants');
    if (savedFavorites) {
      const favorites: Restaurant[] = JSON.parse(savedFavorites);
      this.restaurant = favorites.find(r => r.id === restaurantId) || null;
    }

    // Eğer favori restoranlardan bulunamadıysa, tüm restoranlardan kontrol et
    if (!this.restaurant) {
      // Burada normalde bir servis üzerinden API'den veri çekilecek
      // Şimdilik örnek veri kullanıyoruz
      const allRestaurants: Restaurant[] = [
        {
          id: 1,
          name: 'Harput Köşkü',
          cuisine: 'Türk Mutfağı',
          rating: 4.5,
          reviewCount: 128,
          address: 'Çaydaçıra Mah. Elazığ',
          image: 'assets/images/restaurant1.jpg',
          isFavorite: false,
          menu: [
            {
              id: 1,
              category: 'Et Yemekleri',
              name: 'Kuzu Tandır',
              description: 'Özel baharatlarla marine edilmiş fırında pişmiş kuzu eti',
              price: 120,
              portion: 'Porsiyon (300gr)',
              quantity: 0
            },
            {
              id: 2,
              category: 'Et Yemekleri',
              name: 'Karışık Kebap',
              description: 'Adana, kuşbaşı ve kanat karışık',
              price: 150,
              portion: 'Porsiyon (400gr)',
              quantity: 0
            }
          ]
        },
        {
          id: 2,
          name: 'Ciğerci Vahap',
          cuisine: 'Kebap, Ciğer',
          rating: 4.8,
          reviewCount: 256,
          address: 'Hazar Mah. Elazığ',
          image: 'assets/images/restaurant2.jpg',
          isFavorite: false,
          menu: [
            {
              id: 1,
              category: 'Ciğer',
              name: 'Porsiyon Ciğer',
              description: 'Taze dana ciğeri, özel baharatlar',
              price: 85,
              portion: 'Porsiyon (200gr)',
              quantity: 0
            }
          ]
        }
      ];

      this.restaurant = allRestaurants.find(r => r.id === restaurantId) || null;
    }

    if (!this.restaurant) {
      this.router.navigate(['/restaurant']);
    }

    // Mevcut bakiyeyi al
    const savedBalance = localStorage.getItem('userBalance');
    if (savedBalance) {
      this.currentBalance = Number(savedBalance);
    }
  }

  updateQuantity(item: MenuItem, change: number) {
    item.quantity = Math.max(0, (item.quantity || 0) + change);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.restaurant?.menu.reduce((total, item) => {
      return total + (item.price * (item.quantity || 0));
    }, 0) || 0;
  }

  completeOrder() {
    const orderedItems = this.restaurant?.menu.filter(item => item.quantity > 0);
    if (orderedItems && orderedItems.length > 0) {
      // Bakiye kontrolü
      if (this.totalAmount > this.currentBalance) {
        this.showBalanceError = true;
        setTimeout(() => {
          this.showBalanceError = false;
        }, 3000);
        return;
      }

      this.selectedItems = orderedItems;
      this.orderSuccess = true;
      
      // Bakiyeden düş
      this.currentBalance -= this.totalAmount;
      localStorage.setItem('userBalance', this.currentBalance.toString());
    }
  }
} 