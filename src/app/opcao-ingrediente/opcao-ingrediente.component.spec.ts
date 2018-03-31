import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoIngredienteComponent } from './opcao-ingrediente.component';

describe('OpcaoIngredienteComponent', () => {
  let component: OpcaoIngredienteComponent;
  let fixture: ComponentFixture<OpcaoIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcaoIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
