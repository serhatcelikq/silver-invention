import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FavoriteRestaurantsComponent } from './favorite-restaurants/favorite-restaurants.component';
import { OrderComponent } from './order/order.component';
import { BalanceComponent } from './balance/balance.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favorite', component: FavoriteRestaurantsComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'balance', component: BalanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // HttpClientModule burada olmamalı
  exports: [RouterModule]
})
export class AppRoutingModule {}