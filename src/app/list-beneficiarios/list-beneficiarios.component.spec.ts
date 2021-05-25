import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiariosComponent } from './list-beneficiarios.component';

describe('ListBeneficiariosComponent', () => {
  let component: ListBeneficiariosComponent;
  let fixture: ComponentFixture<ListBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBeneficiariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
