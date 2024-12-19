import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FavoriteRestaurantsComponent {
  public favoriteRestaurants: Restaurant[] = [];

  constructor() {
    this.loadFavorites();
  }

  loadFavorites() {
    const savedFavorites = localStorage.getItem('favoriteRestaurants');
    if (savedFavorites) {
      this.favoriteRestaurants = JSON.parse(savedFavorites);
      // Tüm restoranları favori olarak işaretle
      this.favoriteRestaurants.forEach(restaurant => restaurant.isFavorite = true);
    }
  }

  public toggleFavorite(restaurant: Restaurant): void {
    restaurant.isFavorite = !restaurant.isFavorite;
    
    if(!restaurant.isFavorite) {
      // Favorilerden çıkar
      this.favoriteRestaurants = this.favoriteRestaurants.filter(r => r.id !== restaurant.id);
      console.log(`${restaurant.name} favori restoranlardan çıkartıldı`);
      
      // LocalStorage'ı güncelle
      localStorage.setItem('favoriteRestaurants', JSON.stringify(this.favoriteRestaurants));
    }
  }

  // Sipariş sayfasına yönlendirme için yeni metod
  navigateToOrder(restaurantId: number) {
    // Router ile yönlendirme yapılacak
    console.log(`Sipariş sayfasına yönlendiriliyor: ${restaurantId}`);
  }
} 