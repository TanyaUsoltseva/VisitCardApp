import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorComponent } from './components/global-error/global-error.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RegistrationComponent } from './pages/profile/registration/registration.component';
import { AuthorizationComponent } from './pages/profile/authorization/authorization.component';
import { MessageService } from 'primeng/api';
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import { InputTextModule} from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { AdminComponent } from './pages/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CardProductComponent,
    GlobalErrorComponent,
    FilterProductsPipe,
    ProductPageComponent,
    AboutPageComponent,
    NavigationComponent,
    ProfileComponent,
    FavoritesComponent,
    CartPageComponent,
    CarouselComponent,
    AuthorizationComponent,
    RegistrationComponent,
    AdminComponent,
    CategoryFilterPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CheckboxModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MessagesModule,
    CarouselModule,
    ButtonModule,
    TagModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
