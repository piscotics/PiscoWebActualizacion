import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectoTitularComponent } from './prospecto-titular.component';

describe('ProspectoTitularComponent', () => {
  let component: ProspectoTitularComponent;
  let fixture: ComponentFixture<ProspectoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectoTitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
