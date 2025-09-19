import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { FlowbiteService } from './../../../services/flowbite/flowbite';
import { CartService } from '../../../../features/services/cart/cart-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],

  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isLogin: boolean = false;
  constructor(
    private _FlowbiteService: FlowbiteService,
    public _Auth: Auth,
    public _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._Auth.userData.subscribe({
      next: (res) => {
        if (res != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });

    this._FlowbiteService.loadFlowbite((flowbite) => {
      // Flowbite is loaded and can be used here
      initFlowbite();
    });
  }
}
