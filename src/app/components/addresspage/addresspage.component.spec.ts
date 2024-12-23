import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspageComponent } from './addresspage.component';

describe('AddresspageComponent', () => {
  let component: AddresspageComponent;
  let fixture: ComponentFixture<AddresspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
