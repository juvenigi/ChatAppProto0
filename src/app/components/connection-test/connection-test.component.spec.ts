import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionTestComponent } from './connection-test.component';

describe('ConnectionTestComponent', () => {
  let component: ConnectionTestComponent;
  let fixture: ComponentFixture<ConnectionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
