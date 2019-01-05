import { TestBed } from '@angular/core/testing';

import { EditInvoiceResolverService } from './edit-invoice-resolver.service';

describe('EditInvoiceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditInvoiceResolverService = TestBed.get(EditInvoiceResolverService);
    expect(service).toBeTruthy();
  });
});
