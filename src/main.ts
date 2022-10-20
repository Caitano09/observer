import { InputObservable } from "./ConcreteObservable/inputObservable";
import { ParagraphObserver } from "./ConcreteObserver/paragraphObserver";

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
