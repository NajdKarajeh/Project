import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ConsumerComponent } from "./consumer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ConsumerComponent", () => {

  let fixture: ComponentFixture<ConsumerComponent>;
  let component: ConsumerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ConsumerComponent]
    });

    fixture = TestBed.createComponent(ConsumerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
