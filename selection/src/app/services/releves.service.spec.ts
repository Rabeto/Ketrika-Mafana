import { TestBed } from '@angular/core/testing';

import { RelevesService } from './releves.service';

describe('RelevesService', () => {
  let service: RelevesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelevesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
