import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: 'product-page', component: ProductPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', component: AboutPageComponent},
  { path: 'cart', component: CartPageComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
