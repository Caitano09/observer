// ConcreteObservable
var InputObservable = /** @class */ (function () {
    function InputObservable(element) {
        this.element = element;
        this.observers = [];
    }
    InputObservable.prototype.subscribe = function () {
        var _this = this;
        var observers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observers[_i] = arguments[_i];
        }
        observers.forEach(function (observer) {
            if (!_this.observers.includes(observer)) {
                _this.observers.push(observer);
            }
        });
    };
    InputObservable.prototype.unsubscribe = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    };
    InputObservable.prototype.notify = function () {
        var _this = this;
        this.observers.forEach(function (observer) { return observer.update(_this); });
    };
    return InputObservable;
}());
// Concrete Observer
var ParagraphObserver = /** @class */ (function () {
    function ParagraphObserver(element) {
        this.element = element;
    }
    ParagraphObserver.prototype.update = function (observable) {
        if (observable instanceof InputObservable) {
            this.element.innerText = observable.element.value;
        }
    };
    return ParagraphObserver;
}());
// Cliente code
function makeInput() {
    var input = document.createElement('input');
    document.body.appendChild(input);
    return input;
}
function makeParagraph(text) {
    var p = document.createElement('p');
    document.body.appendChild(p);
    p.innerText = text;
    return p;
}
var input = new InputObservable(makeInput());
var p1 = new ParagraphObserver(makeParagraph('p1 texto inicial'));
var p2 = new ParagraphObserver(makeParagraph('p2 texto inicial'));
var p3 = new ParagraphObserver(makeParagraph('p3 texto inicial'));
input.subscribe(p1, p2, p3);
input.element.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        input.notify();
    }
});
//input.unsubscribe(p2);
