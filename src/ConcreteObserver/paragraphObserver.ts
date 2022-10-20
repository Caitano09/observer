import { InputObservable } from "../ConcreteObservable/inputObservable";
import { Observable } from "../Observable/observable";
import { Observer } from "../Observer/observer";

// Concrete Observer
export class ParagraphObserver implements Observer {
    constructor(public element: HTMLParagraphElement) {}
  
    update(observable: Observable): void {
      if (observable instanceof InputObservable) {
        this.element.innerText = observable.element.value;
      }
    }
  }