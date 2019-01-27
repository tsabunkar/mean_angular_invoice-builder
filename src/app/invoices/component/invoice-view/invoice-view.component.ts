import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  invoice: Invoice;
  total: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { invoiceFetchingFromUrl: Invoice }) => {

      this.invoice = data.invoiceFetchingFromUrl;
      if (typeof this.invoice['quantityControl'] !== 'undefined'
        && typeof this.invoice['rateControl'] !== 'undefined') {
        this.total = this.invoice['quantityControl'] * this.invoice['rateControl'];
      }
      let salesTax = 0;

      if (typeof this.invoice['taxControl'] !== 'undefined') {
        salesTax = this.total * this.invoice['taxControl'] / 100;
      }
      this.total += salesTax;
      console.log(this.total);
    });
  }

}
