import { TestBed } from '@angular/core/testing';

import { FileBlobService } from './file-blob.service';

describe('FileBlobService', () => {
  let service: FileBlobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileBlobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
