import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { Order } from '../../interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orderList!: Order[];
  constructor(private _OrderService: OrderService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this._OrderService.getAllOrders().subscribe({
      next: (res) => {
        this.orderList = res.data ?? [];
      },
      error: (err) => {},
      complete: () => {},
    });
  }
}
