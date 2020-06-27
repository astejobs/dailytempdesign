import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempStorageComponent } from './temp-storage.component';

describe('TempStorageComponent', () => {
  let component: TempStorageComponent;
  let fixture: ComponentFixture<TempStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
