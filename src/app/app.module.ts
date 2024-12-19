import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
// ... diğer importlar

@NgModule({
  declarations: [
    IndexComponent,
    // ... diğer bileşenler
  ],
  imports: [
    BrowserModule,
    RouterModule,
    // ... diğer modüller
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 