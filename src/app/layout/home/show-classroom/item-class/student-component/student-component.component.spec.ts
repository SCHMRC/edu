import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponentComponent } from './student-component.component';

describe('StudentComponentComponent', () => {
  let component: StudentComponentComponent;
  let fixture: ComponentFixture<StudentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
