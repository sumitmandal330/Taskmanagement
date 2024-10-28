import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterbarComponent } from './centerbar.component';

describe('CenterbarComponent', () => {
  let component: CenterbarComponent;
  let fixture: ComponentFixture<CenterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
