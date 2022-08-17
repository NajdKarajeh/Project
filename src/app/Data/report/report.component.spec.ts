import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReportComponent } from "./report.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ReportComponent", () => {

  let fixture: ComponentFixture<ReportComponent>;
  let component: ReportComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ReportComponent]
    });

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
