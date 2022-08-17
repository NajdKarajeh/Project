import { NO_ERRORS_SCHEMA } from "@angular/core";
import { InvoicesComponent } from "./invoices.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("InvoicesComponent", () => {

  let fixture: ComponentFixture<InvoicesComponent>;
  let component: InvoicesComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [InvoicesComponent]
    });

    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
