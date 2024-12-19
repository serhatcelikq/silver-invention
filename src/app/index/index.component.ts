import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']  // styleUrl -> styleUrls
})
export class IndexComponent {
  isSearchedFormActive: boolean = false;

  // Formu toggle etme işlemi
  toggleSearchForm(event: MouseEvent): void {  // toggleSearchFrom -> toggleSearchForm
    this.isSearchedFormActive = !this.isSearchedFormActive;
    event.stopPropagation();
  }

  // Arama formunu kapatma
  closedSearchForm(): void {
    this.isSearchedFormActive = false;
  }

  // Favorilere ekleme işlevi
  addToFavorites(_t34: any) {
    // Favorilere ekleme işlemi burada yapılacak
    console.log('Favorilere eklendi:', _t34);
  }
}
