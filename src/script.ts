interface Observable {
    subscribe(...observers: Observer[]): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
  }
  
  interface Observer {
    update(...args: unknown[]): void;
  }
  
  // ConcreteObservable
  class InputObservable implements Observable {
    private observers: Observer[] = [];
  
    constructor(public element: HTMLInputElement) {}
  
    subscribe(...observers: Observer[]): void {
      observers.forEach((observer) => {
        if (!this.observers.includes(observer)) {
          this.observers.push(observer);
        }
      });
    }
  
    unsubscribe(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
  
      if (observerIndex !== -1) {
        this.observers.splice(observerIndex, 1);
      }
    }
  
    notify(): void {
      this.observers.forEach((observer) => observer.update(this));
    }
  }
  
  // Concrete Observer
  class ParagraphObserver implements Observer {
    constructor(public element: HTMLParagraphElement) {}
  
    update(observable: Observable): void {
      if (observable instanceof InputObservable) {
        this.element.innerText = observable.element.value;
      }
    }
  }
  
  // Cliente code
  function makeInput(): HTMLInputElement {
    const input = document.createElement('input');
    document.body.appendChild(input);
    return input;
  }
  
  function makeParagraph(text : string): HTMLParagraphElement {
    const p = document.createElement('p');
    document.body.appendChild(p);
    p.innerText = text;
    return p;
  }  
  
  const input = new InputObservable(makeInput());
  const p1 = new ParagraphObserver(makeParagraph('p1 texto inicial'));
  const p2 = new ParagraphObserver(makeParagraph('p2 texto inicial'));
  const p3 = new ParagraphObserver(makeParagraph('p3 texto inicial'));
  
  input.subscribe(p1, p2, p3);
  
  input.element.addEventListener('keyup', function (e) {
    if (e.key === 'Enter'){
      input.notify();
    }
  });
  
  //input.unsubscribe(p2);