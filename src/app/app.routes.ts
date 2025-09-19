import { Routes } from '@angular/router';
import { Home } from './features/components/home/home';
import { Products } from './features/components/products/products';
import { Categories } from './features/components/categories/categories';
import { Brands } from './features/components/brands/brands';
import { Cart } from './features/components/cart/cart';
import { Login } from './core/components/pages/login/login';
import { Register } from './core/components/pages/register/register';
import { Notfound } from './features/components/notfound/notfound';
import { authGuard } from './core/guards/auth-guard';
import { Forgetpassword } from './core/components/pages/forgetpassword/forgetpassword';
import { Resetcode } from './core/components/pages/resetcode/resetcode';
import { Resetnewpassword } from './core/components/pages/resetnewpassword/resetnewpassword';
import { Productdetails } from './features/components/productdetails/productdetails';
import { Brand } from './features/interfaces/brands';
import { ShippingAddress } from './features/components/shipping-address/shipping-address';
import { Orders } from './features/components/orders/orders';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'home',
  },
  {
    path: 'products',
    component: Products,
    title: 'products',
  },

  {
    path: 'categories',
    component: Categories,
    title: 'categories',
  },
  {
    path: 'brands',
    component: Brands,
    title: 'brands',
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
    title: 'cart',
  },
  {
    path: 'login',
    component: Login,
    title: 'login',
  },
  {
    path: 'signup',
    component: Register,
    title: 'signup',
  },
  {
    path: 'forgetpassword',
    component: Forgetpassword,
    title: 'forgetpassword',
  },
  {
    path: 'resetcode',
    component: Resetcode,
    title: 'resetcode',
  },
  {
    path: 'resetnewpassword',
    component: Resetnewpassword,
    title: 'create New Password',
  },
  {
    path: 'productdetails/:id',
    component: Productdetails,
    title: 'Product Details',
  },
  {
    path: 'shippingAddress/:cartId',
    component: ShippingAddress,
    title: 'Shipping Address',
  },
  {
    path: 'allorders',
    component: Orders,
    title: 'All Orders',
  },
  {
    path: '**',
    component: Notfound,
    title: 'notfound',
  },
];
