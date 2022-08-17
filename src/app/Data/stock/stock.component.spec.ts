import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StockComponent } from "./stock.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("StockComponent", () => {

  let fixture: ComponentFixture<StockComponent>;
  let component: StockComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [StockComponent]
    });

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
