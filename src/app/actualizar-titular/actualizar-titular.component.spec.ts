import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTitularComponent } from './actualizar-titular.component';

describe('ActualizarTitularComponent', () => {
  let component: ActualizarTitularComponent;
  let fixture: ComponentFixture<ActualizarTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
