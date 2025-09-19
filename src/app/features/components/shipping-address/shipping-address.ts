import { Component, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartService } from '../../services/cart/cart-service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order-service';
import { payementMethodEnum } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-shipping-address',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shipping-address.html',
  styleUrl: './shipping-address.scss',
})
export class ShippingAddress implements OnInit {
  payementMethod: payementMethodEnum = payementMethodEnum.CASHONDELIVERY;
  cartId: string = '';
  constructor(
    private _CartService: CartService,
    private _OrderService: OrderService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._ActivatedRoute.params.subscribe((params) => {
      this.cartId = params['cartId'];
    });
  }
  shippingAddressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
  submitShippingAddress() {
    this._ActivatedRoute.params.subscribe((params) => {
      this.cartId = params['cartId'];
    });
    if (this.shippingAddressForm.valid) {
      console.log(this.payementMethod);
      if (this.payementMethod === payementMethodEnum.CREDITCARD) {
        this._OrderService
          .checkoutSession(this.cartId, {
            city: this.shippingAddressForm.controls['city'].value || '',
            details: this.shippingAddressForm.controls['details'].value || '',
            phone: this.shippingAddressForm.controls['phone'].value || '',
          })
          .subscribe({
            next: (res) => {
              window.open(res.session.url, '_self');

              console.log(res);
            },

            error: (err) => {
              console.log(err);
            },
            complete: () => {},
          });
      } else if (this.payementMethod == payementMethodEnum.CASHONDELIVERY) {
        this._OrderService
          .createCashOrder(this.cartId, {
            city: this.shippingAddressForm.controls['city'].value || '',
            details: this.shippingAddressForm.controls['details'].value || '',
            phone: this.shippingAddressForm.controls['phone'].value || '',
          })
          .subscribe({
            next: (res) => {
              console.log(res);
            },

            error: (err) => {
              console.log(err);
            },
            complete: () => {},
          });
      }
    }
  }
}
