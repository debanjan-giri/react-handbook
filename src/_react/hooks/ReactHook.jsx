import React, { useState, Component, useEffect } from "react";

// previously react developers are using class component
// lifecycle :componentDidMount, componentDidUpdate,componentWillUnmount
// state: this.setState(),require hoc to render props to share logic acros

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// version 16.8
// react hooks eliminate the need for class components.now Hooks allow
// functional components to manage state and side effects. Share logic
// between components without hoc.Cleaner => Lifecycle methods: useEffect
// managing state: useState

// rules of hooks
// 1. hooks must be called in function component or custom hooks
// 2. Only Call Hooks at the Top Level of functional component

function FnCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// component state
// State in React refers to data or variables that represent the current
// condition , its a way to manage dynamic information that change over
// time,When state,prop changes,React triggers re-render of the component
// to reflect the updated information.problem occurs when you update a
// variable because react will not re-renders the component that reason
// is we use useState hook,we just want to re-render that display value

// useState
// initial value = 0 (useState(0))
// current value = 0 (count)
// updateding the value = using (setCount function)
// also setState provide callback function,that have acceess to current value

function UseState_() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          setCount((pre) => pre - 1);
        }}
      >
        decrement
      </button>
    </>
  );
}

// component Lifecycle Stages:
// Mounting: When a component is being created and inserted into the DOM.
// Updating: When state or props change,causing component to re-render.
// Unmounting: When a component is being removed from the DOM.

// useEffect
// its provide side effect to component , provide a callback function
// These stages allow you to run custom code at specific points,
// such as when the component is created, updated, or destroyed.

// creating phase or mounting phase
// when page refresh,all component will unmounting mean remove from DOM
// then again the component is added to the DOM (mounting phase again)
// Re-running side effects when certain props or state values change
function Created_() {
  useEffect(() => {
    console.log("page loaded");
  }, []);
  // this empty array ensure useEffect run once when component mount

  return <h1>useEffect</h1>;
}

// updating phase
function Updated_() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(0);

  // Effect 1: Runs only on mount
  useEffect(() => {
    console.log("Effect 1: Page loaded (mount only)");
  }, []);

  // Effect 2: Runs on every render , ( mount and update )
  //  because empty dependency array
  useEffect(() => {
    console.log("Effect 2: Page updated (every render)");
  });

  // Effect 3: Runs on mount and when specific state changes
  useEffect(() => {
    console.log("Effect 3: Count state updated", count);
  }, [count]);

  return (
    <>
      {/* it will print page updated and state updated */}
      <h1>{count}</h1>
      <button
        className="btn btn-primary m-2"
        onClick={() => setCount(count + 1)}
      >
        count click
      </button>

      {/* it will print page updated */}
      <h1>{data}</h1>
      <button className="btn btn-primary m-2" onClick={() => setData(data + 1)}>
        data click
      </button>
    </>
  );
}

// unmounting phase
// rendering and removal from the DOM are two different concepts in React
// If you click a button that updates the state or prop, the component will re-render,
// React updates the component’s output in the DOM but still mounted in the DOM
// Unmounting refers to the complete removal of the component from the DOM.
// Unmounting only happens if component is conditionally removed or page navigate
// when you manually refresh the page, all components are unmounted and remounted.

// When a component is being removed from the DOM.
// (--------------)  <== during this time we want to run some function
// again component is added to the DOM,

function Component_() {
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  return <h1>Component</h1>;
}

function Unmounting_() {
  const [enable, setEnabel] = useState(true);
  return (
    <div>
      {enable && <Component_ />}
      <button onClick={() => setEnabel(!enable)}>Toggle</button>
    </div>
  );
}

// Re-rendering Issues
// inner component gets re-created every time when parent component re-renders
// problem : Inner components not reusable and not follow react modular system
// we have to import from outside and use memo if it a pure component

function BookList() {
  const Book = () => {
    return <h1>C++ Book</h1>;
  };

  return (
    <>
      <Book />
      <Book />
    </>
  );
}

// useContext
// Share data(like theme or user info) globally between components without prop drilling.
import React, { useContext, useState, createContext } from "react";

// 1. Create a Context
const ThemeContext = createContext();

// 2. Provider Component to wrap children
function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Use the context in child component
function ThemedButton() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        backgroundColor: darkMode ? "black" : "white",
        color: darkMode ? "white" : "black",
      }}
    >
      Toggle Theme
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}


// useReducer
// Best for complex state logic like forms, counters, toggles, etc.
import React, { useReducer } from "react";

// 1. Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// 2. Component using reducer
function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}


// useCallback
// Memoize functions so they don't get re-created on every render.
import React, { useState, useCallback } from "react";

function ExpensiveButton({ onClick }) {
  console.log("Rendered button");
  return <button onClick={onClick}>Click Me</button>;
}

function CallbackExample() {
  const [count, setCount] = useState(0);

  // useCallback returns the same function unless dependency changes
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <ExpensiveButton onClick={handleClick} />
    </>
  );
}


// useMemo
// Memoize values to avoid expensive recalculations.
import React, { useMemo, useState } from "react";

function MemoExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Expensive calculation memoized
  const expensiveCalc = useMemo(() => {
    console.log("Calculating...");
    return count * 2;
  }, [count]);

  return (
    <>
      <h1>Double: {expensiveCalc}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOther(other + 1)}>Update Other</button>
    </>
  );
}


// useRef
// Used to reference DOM elements or persist values across renders (without triggering re-render).
import React, { useRef } from "react";

function RefExample() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus(); // directly access DOM element
  };

  return (
    <>
      <input ref={inputRef} placeholder="Type something..." />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}


// useLayoutEffect
// Similar to useEffect but runs before the browser paints the screen.
import React, { useLayoutEffect, useRef } from "react";

function LayoutEffectExample() {
  const boxRef = useRef();

  useLayoutEffect(() => {
    // runs before screen paints
    boxRef.current.style.color = "red";
  }, []);

  return <h1 ref={boxRef}>useLayoutEffect Example</h1>;
}


// useId
// Generates a unique ID that stays stable between renders. Useful for accessibility and form inputs.
import React, { useId } from "react";

function IdExample() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Username:</label>
      <input id={id} type="text" />
    </div>
  );
}


// useTransition
// Mark updates as low-priority (like loading indicators for UI transitions).
import React, { useState, useTransition } from "react";

function TransitionExample() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    startTransition(() => {
      setInput(val); // delayed update
    });
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {isPending ? <p>Loading...</p> : <p>You typed: {input}</p>}
    </div>
  );
}


// custom hooks
import React, { useState, useEffect } from "react";

// Custom Hook for window width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function CustomHookExample() {
  const width = useWindowWidth();
  return <h1>Window Width: {width}</h1>;
}

// useImperativeHandle
// Allows parent to call functions on child component — used with forwardRef.
import React, { useRef, forwardRef, useImperativeHandle } from "react";

// 1. Create a child component and forward the ref
const Child = forwardRef((props, ref) => {
  // 2. Local function we want parent to use
  const sayHello = () => alert("Hello from child!");

  // 3. Use useImperativeHandle to expose functions to parent
  useImperativeHandle(ref, () => ({
    sayHello,
  }));

  return <h1>Child Component</h1>;
});

function Parent() {
  const childRef = useRef();

  return (
    <>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.sayHello()}>Call Child Method</button>
    </>
  );
}


// useDebugValue
// Used in custom hooks to show values in React DevTools for debugging only.
import React, { useState, useEffect, useDebugValue } from "react";

// 1. Custom hook with debug label
function useOnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);

    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  // 2. Debug label for React DevTools
  useDebugValue(online ? "Online" : "Offline");

  return online;
}

function DebugExample() {
  const isOnline = useOnlineStatus();
  return <h1>Status: {isOnline ? "Online ✅" : "Offline ❌"}</h1>;
}


// useDeferredValue
// Defer a slow - updating value for smoother transitions(useful in search).
import React, { useState, useDeferredValue } from "react";

function DeferredExample() {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input);

  // Simulate slow filtering
  const filtered = Array(10000)
    .fill("React is awesome")
    .map((item, i) => `${i}: ${item}`)
    .filter((item) => item.includes(deferredInput));

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setInput(e.target.value)}
      />
      <p>Searching for: {input}</p>
      <div>
        {filtered.slice(0, 10).map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
}


// useSyncExternalStore
// Used to safely read from external stores — especially for libraries like Redux or Zustand.
import React, { useSyncExternalStore } from "react";

// 1. External store (normally from Redux, Zustand, etc.)
let count = 0;
let listeners = [];

function subscribe(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot() {
  return count;
}

function increment() {
  count++;
  listeners.forEach((cb) => cb());
}

// 2. useSyncExternalStore to subscribe safely
function SyncExample() {
  const currentCount = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <>
      <h1>External Count: {currentCount}</h1>
      <button onClick={increment}>Increase Count</button>
    </>
  );
}


// useInsertionEffect
// Runs before any DOM mutations and before CSS is injected.
// Used by CSS -in -JS libraries(not common in basic apps).
import React, { useInsertionEffect, useRef } from "react";

function InsertionEffectExample() {
  const ref = useRef();

  useInsertionEffect(() => {
    // Before DOM paint, before styles apply
    ref.current.style.color = "blue";
  }, []);

  return <h1 ref={ref}>useInsertionEffect Example</h1>;
}
