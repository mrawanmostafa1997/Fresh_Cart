import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetnewpassword } from './resetnewpassword';

describe('Resetnewpassword', () => {
  let component: Resetnewpassword;
  let fixture: ComponentFixture<Resetnewpassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resetnewpassword],
    }).compileComponents();

    fixture = TestBed.createComponent(Resetnewpassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
