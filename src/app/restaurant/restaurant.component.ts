import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  portion: string;
  quantity: number;
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class RestaurantComponent implements OnInit {
  public restaurants: Restaurant[] = [
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
        // ... diğer menü öğeleri
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
        // ... menü öğeleri
      ]
    },
    {
      id: 3,
      name: 'Balıkçı Nevzat',
      cuisine: 'Deniz Ürünleri',
      rating: 4.6,
      reviewCount: 189,
      address: 'Fırat Mah. Elazığ',
      image: 'assets/images/restaurant3.jpg',
      isFavorite: false,
      menu: [
        // ... menü öğeleri
      ]
    }
  ];

  public searchTerm: string = '';
  public isFilterMenuOpen: boolean = false;
  public selectedCuisines: string[] = [];
  public minRating: number = 0;
  public filteredRestaurants: Restaurant[] = [];
  public recommendedRestaurants: Restaurant[] = [];
  public cuisineTypes: string[] = ['Türk Mutfağı', 'Kebap', 'Deniz Ürünleri', 'Dünya Mutfağı'];

  ngOnInit() {
    // Favori restoranları kontrol et ve işaretle
    const savedFavorites = localStorage.getItem('favoriteRestaurants');
    if (savedFavorites) {
      const favorites: Restaurant[] = JSON.parse(savedFavorites);
      this.restaurants = this.restaurants.map(restaurant => ({
        ...restaurant,
        isFavorite: favorites.some(fav => fav.id === restaurant.id)
      }));
    }
    this.recommendedRestaurants = this.restaurants.filter(r => r.rating >= 4.5);
    this.filteredRestaurants = this.restaurants;
  }

  public toggleFavorite(restaurant: Restaurant): void {
    restaurant.isFavorite = !restaurant.isFavorite;
    
    // LocalStorage'dan mevcut favorileri al
    let favorites: Restaurant[] = [];
    const savedFavorites = localStorage.getItem('favoriteRestaurants');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }

    if(restaurant.isFavorite) {
        // Favorilere ekle
        favorites.push(restaurant);
        console.log(`${restaurant.name} favorilere eklendi`);
    } else {
        // Favorilerden çıkar
        favorites = favorites.filter((r: Restaurant) => r.id !== restaurant.id);
        console.log(`${restaurant.name} favori restoranlardan çıkartıldı`);
    }

    // Güncel favorileri kaydet
    localStorage.setItem('favoriteRestaurants', JSON.stringify(favorites));
  }

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  toggleCuisine(cuisine: string) {
    const index = this.selectedCuisines.indexOf(cuisine);
    if (index === -1) {
      this.selectedCuisines.push(cuisine);
    } else {
      this.selectedCuisines.splice(index, 1);
    }
    this.applyFilters();
  }

  searchRestaurants() {
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.selectedCuisines.length > 0 || this.minRating > 0;
  }

  applyFilters() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      // Arama filtresi
      const matchesSearch = !this.searchTerm || 
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Mutfak türü filtresi
      const matchesCuisine = this.selectedCuisines.length === 0 || 
        this.selectedCuisines.some(cuisine => restaurant.cuisine.includes(cuisine));

      // Minimum puan filtresi
      const matchesRating = restaurant.rating >= this.minRating;

      return matchesSearch && matchesCuisine && matchesRating;
    });

    // Filtreleri uyguladıktan sonra menüyü kapat
    this.isFilterMenuOpen = false;
  }
} 