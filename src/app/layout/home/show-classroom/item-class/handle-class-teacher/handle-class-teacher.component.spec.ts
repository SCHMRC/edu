import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleClassTeacherComponent } from './handle-class-teacher.component';

describe('HandleClassTeacherComponent', () => {
  let component: HandleClassTeacherComponent;
  let fixture: ComponentFixture<HandleClassTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleClassTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
