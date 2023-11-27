var index = 0;
var state = [];
var render;

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("setState", () => {
  index = 0;
  render = App();
});

function useState(initValue) {
  const localIndex = index;
  if (typeof state[localIndex] === "undefined") state[localIndex] = initValue;
  index++;

  const setState = (newValue) => {
    state[localIndex] = newValue;
    eventEmitter.emit("setState");
  };

  return [state[localIndex], setState];
}

function App() {
  const [foo, setFoo] = useState(1);
  const [bar, setBar] = useState(false);
  const [baz, setBaz] = useState("init");

  return {
    foo,
    setFoo,
    bar,
    setBar,
    baz,
    setBaz,
  };
}

render = App();
console.log({ render });

render.setBar(true);
render.setFoo(2);
console.log({ render });

render.setBaz("changed");
render.setBar(false);
render.setFoo(-1);
console.log({ render });
