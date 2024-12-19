import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { SigninComponent } from "./signin/signin.component";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, IndexComponent, SigninComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yemek23';
  posts: any; // Consider defining a proper interface/type instead of using 'any'

  onSearch(): void {
    console.log('Search clicked'); // You can implement the actual search logic here
  }
}
