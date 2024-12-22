import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RegisterComponent } from './register/register.component';
import { FavoriteRestaurantsComponent } from './favorite-restaurants/favorite-restaurants.component';
import { OrderComponent } from './order/order.component';
import { BalanceComponent } from './balance/balance.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favorite', component: FavoriteRestaurantsComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'balance', component: BalanceComponent },
];
