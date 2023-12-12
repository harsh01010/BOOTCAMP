import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length > 0 ? true : false;
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {numPizzas ? ( // jsx fragments -> create two elements without silgle parent.<React.fragment key={}>
        <>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
            reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
            Voluptatum ducimus voluptates voluptas?
          </p>
          <div className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaOb={pizza} key={pizza.name} />
            ))}
          </div>
        </>
      ) : (
        <p>We're still working on our menu, Please come back later :)</p>
      )}

      {/*<div className="pizzas">
        {pizzaData.map(
          (
            pizza //rendering list
          ) => (
            <Pizza pizzaOb={pizza} key={pizza.name} />
          )
        )}
          </div>*/}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredient="Tomato,mozarella,spinach,and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price="10"
        />
        <Pizza
        name="Pizza Funghi"
        ingredient="Tomato,mushrooms"
        photoName="pizzas/funghi.jpg"
        price="12"
        />
        <Pizza />
      <Pizza /> */}
    </div>
  );
}
function Pizza(props) {
  // we can also destructure props like -> ({props})
  //props are only read-only,react allows data flow in one way only , parent to child components
  console.log(props);
  return (
    <div className={props.pizzaOb.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={props.pizzaOb.photoName} alt={props.pizzaOb.name} />
      <div>
        <h3>{props.pizzaOb.name}</h3>
        <p>{props.pizzaOb.ingredients}</p>
        <span>
          {props.pizzaOb.soldOut ? "Sold Out" : Number(props.pizzaOb.price) + 3}
        </span>
      </div>
    </div>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("Sorry we are closed");
  return (
    <footer className="footer">
      {
        /* conditional rendering*/
        isOpen && <Order closeHour={closeHour} />
        // isOpen ? <p>We're currently open</p> : <p>We're currently closed!</p>
      }
    </footer>
  );
  /*
  we can also use multiple return statement in js for conditional rendering:
  if(isopen)
      return(
        //jsx
      )
  else
      return(
        //jsx
      )
  */
  // return React.createElement(
  //   "footer",
  //   null,
  //   `we're currently open!
  // `
  // );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        we're currently open, Untill {props.closeHour}:00 come visit us or order
        online
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
}

// react v18

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // it will render the components twice for finding bugs
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//react before 18
// React.render(<App/>);

/*
General jsx Rules:
jsx works like html but we can enter javascript mode using {}
we can replace js expressions inside {}.
a piece of jsx can only have one root element.
*/
