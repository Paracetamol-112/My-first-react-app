import ListGroup from "./components/ListGroup";
import "./App.css";
import { BsFillCalendarFill } from "react-icons/bs";
import Button from "./components/Button";
import LikeBtn from "./components/LikeBtn";
import { useState } from "react";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Form from "./components/Form";

function App() {
  let items = ["New York", "Los Angeles", "San Francisco"];

  const handleSelectedItem = (item: string) => {
    console.log(item);
  };

  // 1.
  // Treat "drink" object as immutable and read. Notice that at handleDrinkClick,
  // we update the drink price by creating a new object and apply setDrink to that object.
  // 2.
  // When working with state objects, you should avoid using deeply nested structures.
  // Because the deeper the structure gets, the more complicated or update logic will be.
  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
    companyAddress: {
      city: "San Francisco",
      zipCode: 94111,
    },
  });

  // The spread operator (...) is shallow, we want our new state object is completely independent
  // of the existing state objects, they don't share anything. That's why we made an new object
  // in companyAddress this way.
  const handleDrinkClick = () => {
    setDrink({
      ...drink,
      price: 6,
      companyAddress: { ...drink.companyAddress, zipCode: 94112 },
    });
  };

  // If you have an state array you should not mutate or change it. Instead we should give react a
  // brand new array.
  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleTagsClick = () => {
    // Add
    setTags([...tags, "exciting"]);

    // Remove
    setTags(tags.filter((tag) => tag !== "happy"));

    // Update
    setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  };

  // To update array of objects, we don't need to create a brand new copy of every bug object in this
  // array. Only the object that's supposed to be modified need to create a brand new copy.

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleArrayOfObjectsClick = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  };

  // If you want to avoid using the above complex syntax, you can use immer to update array of objects
  const handleArrayOfObjectsImmer = () => {
    // draft is a proxy object that record the changes, we are going to apply to the bugs array.
    // We are free to mutate or modify it just like regular JavaScript object. We don't need to map
    // anything or create copies. We can made any changes to this object behind the scenes, immer keeps
    // track of those changes then it will create a copy of the bugs with our changes applied.
    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  // Sharing State between components
  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  return (
    <>
      <div>
        <Button onClick={() => {}}>My Button</Button>
      </div>
      <div>
        <BsFillCalendarFill color="red" size="40" />
        <ListGroup
          items={items}
          heading="Miami"
          onSelectedItem={handleSelectedItem}
        />
      </div>
      <div>
        <LikeBtn onClick={() => console.log("Clicked")} />
      </div>
      <div>
        {drink.price}
        <button onClick={handleDrinkClick}>Update Drink price</button>
      </div>
      <div>
        {bugs.map((bug) => (
          <p key={bug.id}>
            {bug.title} {bug.fixed ? "Fixed" : "New"}
          </p>
        ))}
        <button onClick={handleArrayOfObjectsImmer}>Click Me</button>
      </div>
      <div>
        <NavBar cartItemsCount={cartItems.length} />
        <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      </div>
      <div>
        <Form />
      </div>
    </>
  );
}

// import Alert from "./components/Alert";
// import Button from "./components/Button";
// import { useState } from "react";

// function App() {
//   const [alertVisible, setAlertVisibility] = useState(false);

//   return (
//     <div>
//       {alertVisible && (
//         <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
//       )}
//       <Button color="danger" onClick={() => setAlertVisibility(true)}>
//         My Button
//       </Button>
//     </div>
//   );
// }

export default App;
