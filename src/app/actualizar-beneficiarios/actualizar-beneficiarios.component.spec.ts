import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBeneficiariosComponent } from './actualizar-beneficiarios.component';

describe('ActualizarBeneficiariosComponent', () => {
  let component: ActualizarBeneficiariosComponent;
  let fixture: ComponentFixture<ActualizarBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarBeneficiariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
