import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClassComponent } from './item-class.component';

describe('ItemClassComponent', () => {
  let component: ItemClassComponent;
  let fixture: ComponentFixture<ItemClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
