import React from "react";
import "./myStyle.css";

// component
// A component is a piece of the UI code that has its own logic and memory
// component is js fn that returns a single Jsx element and fn can be reusable
// file & component name use capital letter for diff between html tag & component
// multiple component create tree architecture,so data flow from parent to child
// component can be small as a button or large as a full web page but reusable
// components make code allways easier to maintain and debug and same component
// can be used multiple times within same page but they act as independent ui with
// their own memory and we declare component in self closing tag <Button/>

function ButtonComponent() {
  return <button>Click me</button>;
}

// react fragment
// component always return only single element
// but with tree like structure one div can retun 10000 child div
// using : <></>,<div></div>,<Fragment></Fragment> or any html tag
// and <></> is used when we dont want to add extra div in dom tree

function NestedComponent() {
  return (
    <>
      <p>hello world</p>
      <ButtonComponent /> {/* multiple time used */}
      <ButtonComponent /> {/* multiple time used */}
    </>
  );
}

// props
// props are used to pass one way data from parent to child and prop are 
// immutable or read only , parent props data can not be changed from child
// prop is object = key value pair, we can pass any type of data

function ButtonName(prop) {
  // accessing all key value pair data using prop object
  return <button>{prop.Name}</button>
}

function PaymentCard() {
  return (
    <>
      <p>Payment Card</p>
      <ButtonName Name="Pay" WriteRandomKey="Value" />
    </>
  );
}

// prop drilling issue
// passing data from parent -> child -> nested child
// from start to end you need to pass props to get data
// so prop drilling is bad practice, it make code complex
// so use context api , redux for global state management
// so you can import data from anywhere in the app

function ImageCard() {
  return (
    <div className="bg-dark p-3 m-3">
      <h1>Component A</h1>

      {/* create a tree */}
      <ImageButton name="Click me" />

      {/* create another tree */}
      <ImageButton name="Save me" />
    </div>
  );
}

function ImageButton(prop) {

  return (
    <div className="bg-success p-3 m-3">
      <button className="p-4">{<ButtonTitle name={prop.name} />}</button>
    </div>
  );
}

function ButtonTitle(prop) {
  console.log(prop.name);
  return <p className="bg-warning">{prop.name}</p>;
}

// prop concept
// we passing diff data to a diff component because Component are independent
// even same component and they can be used multiple time with different data
function UserList() {

  let details = {
    name: "Tony",
    age: 30,
  };

  return (
    <div className="bg-dark p-3 m-3 h-25 w-25">
      <h5>User List : </h5>
      <ReadDetails name="John" age="25" />
      <ReadDetails name="Tony" age="30" country="USA" />
      <ReadDetails name="Jack" age="35" location="New York" />
      <hr />
      {/* we can pass obj using destructure */}
      <ReadDetails {...details} />
      <ReadDetails age="40" {...details} />
    </div>
  );
}

function ReadDetails({ name, age }) {
  // here we destructure props within function argument
  // or we can destructure within local variable
  // const { name, age } = props;

  return (
    <div className="bg-success p-3 m-3">
      <h5>My Name is : {name}</h5>
      <Age age={age} />
    </div>
  );
}

const Age = (props) => {
  // props are object, we can access data using dot notation
  return (
    <div className="bg-warning p-1">
      <h5>Age : {props.age}</h5>
    </div>
  );
};

// default props
// how to handle ? when parent not pass any data to its child
function UserList_2() {
  return (
    <div>
      <ReadDetails_2 />
      <ReadDetails_2 name="AAA" country="BBB" />
    </div>
  );
}

function ReadDetails_2({
  name = "Stark",
  country = "USA",
  location = "New York",
}) {
  return (
    <div className="border p-2 m-2 w-25">
      <h1 className="fs-5 m-0">My Name is : {name}</h1>
      <p className="fs-6 m-0">Country : {country}</p>
      <p className="fs-6 m-0">Location : {location}</p>
    </div>
  );
}

// JSX
// Jsx is a combination of html and javascript
// curly braces {} are used to write javascript code within Jsx
function JsxExpression() {
  // variable can store diff data
  let name = "Tony";
  let element = <p>cat</p>;
  let component = <Button />;
  let imageData =
    "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg";

  // function
  function myFn() {
    return 99;
  }

  // component
  function MyTag() {
    return <h1>My Tag</h1>;
  }

  return (
    <>
      {/* data */}
      {"dev"}
      {4 + 4}
      {element}
      {component}

      <hr />

      {/* function */}
      {myFn()}
      {myFn() * 56}

      <hr />

      {/* component or html */}
      {<p>hello</p>}
      {MyTag()}
      {<MyTag />}

      <hr />

      {/* tag dynamic data */}
      <h1>My name is: {name}</h1>
      <h1>My name is {"Tony"}</h1>

      <hr />

      {/* image */}
      <img src={imageData} />

      <hr />
      {/* null, undefined, false, true = display nothing */}
      {null}
      {undefined}
      {false}
      {true}
    </>
  );
}

// conditional Jsx rendering
function ConditionalJsx() {
  let condition = true;

  const Component = (data) => {
    return <h5 key={data.key}>{data.n}</h5>;
  };

  return (
    <>
      {/* ternary */}
      <h1>{condition ? "dev" : "tony"}</h1>
      {condition ? <Component n={1} /> : undefined}

      {/* and operator return last truthy value */}
      {condition && <h1>Hello</h1>}
      {true && condition && <Component n={2} />}
      {6 > 7 && <Component n={3} />}
      {<Component n={4} /> && <Component n={5} />}

      {/* or operator return first truthy value */}
      {true || <Component n={6} />}
      {false || <Component n={7} />}
      {<Component n={8} /> || <Component n={9} />}

      {/* array mapping */}
      {["A", "B", "C"].map((item, index) => {
        return item === "C" && <Component key={index} n={index} />;
      })}

      {/* template litarel */}
      {`hello ${67 > 90 ? "1" : "2"}`}
    </>
  );
}

// css
// in vanila html we use class but in jsx we use className
// in vanila css we use font-size but in jsx we use fontSize ( camelCase )
// we have to pass object value to style { color: "blue", fontSize: "20px" }

function ConditionalCss() {
  // css object
  const obj = {
    color: "green",
    fontSize: "20px",
  };

  const image = {
    pic: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg",
    width: "200px",
    height: "200px",
  };

  const temperature = "Hot";

  return (
    <>
      {/* inline css */}
      <h1 style={{ color: "blue", fontSize: "20px" }}>cat</h1>
      <img
        src={image.pic}
        style={{ width: image.width, height: image.height }}
      />
      <h1 style={obj}>devloper</h1>

      {/* external css */}
      <h1 className="myCss">1</h1>

      <hr />
      {/* conditional css */}
      <h1 className={true ? "myCss" : "myCss_2"}>2</h1>
      <h1 style={{ color: temperature === "Hot" && "red" }}>Weather</h1>

      <hr />
      {/* array mapping */}
      {["black", "green", "blue"].map((item, index) => {
        return (
          <h1 key={index} style={{ color: item }}>
            {item}
          </h1>
        );
      })}
    </>
  );
}

// component conditional return
// return nothing : <> </> , undefined, null, false , true
// but null is best practice to render nothing
function ConditionReturn() {
  let condition = true;
  let type = "button";

  // if-else
  if (condition) {
    return <Button />;
  } else {
    return null; // this render nothing
  }

  // ternary
  return condition ? <></> : <h1>dev</h1>;

  // logical && operator
  return true && <Button />;

  // logical || operator
  return <h1>dev</h1> || undefined;

  // switch case
  // it helps when single component need to return diff ui based on type
  switch (type) {
    case "button":
      return <Button />;
    case "h1Tag":
      return <h1>dev</h1>;
    case "redColor":
      return <p style={{ color: "red" }}>red color</p>;
    default:
      return false;
  }

  // array mapping
  return [1, 2, 3].map((item) => {
    return <Button />;
  });
}

// special props
// children name used to create special prop
// it take componet and create wrapper component for extending feature
// component syntax : <Component> took component as argument </Component>

function Wrapper({ children }) {
  return <div className="bg-dark">{children}</div>;
}

function NewApp() {
  return (
    <Wrapper>
      <h1>dev</h1>
      <h1>Hello, World!</h1>
      <Button />
    </Wrapper>
  );
}

// higher order component (HOC)
// An HOC is a function that takes a component and returns a 
// new component with additional props or behavior.

const withLogger = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    console.log('Props:', props);
    return <WrappedComponent {...props} />;
  };
};

const Hello = ({ name }) => <h1>Hello, {name}!</h1>;

function MainHocComponent() {
  const HelloWithLogger = withLogger(Hello);

  return <HelloWithLogger name="Debanjan" />;
}
