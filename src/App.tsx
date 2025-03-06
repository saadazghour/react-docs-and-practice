// React is designed around this concept. React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs: props and state. This is a fundamental concept in React, and it's what makes React fast and efficient.

// When you pass drinkers={2} to Recipe, it will return JSX containing 2 cups of water. Always. If you pass drinkers={4}, it will return JSX containing 4 cups of water. Always. Just like a math formula. You could think of your components as recipes: if you follow them and don’t introduce new ingredients during the cooking process, you will get the same dish every time. That “dish” is the JSX that the component serves to React to render.

function Recipe({ drinkers }: { drinkers: number }) {
  return (
    // This is the JSX that the Recipe component serves to React to render.
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>
        Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.
      </li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

// Side Effects: (un)intended consequences. React’s rendering process must always be pure. Components should only return their JSX, and not change any objects or variables that existed before rendering—that would make them impure! Here is a component that breaks this rule:

// This component is reading and writing a guest variable declared outside of it. This means that calling this component multiple times will produce different JSX! And what’s more, if other components read guest, they will produce different JSX, too, depending on when they were rendered! That’s not predictable.Going back to our formula y = 2x, now even if x = 2, we cannot trust that y = 4. Our tests could fail, our users would be baffled, planes would fall out of the sky—you can see how this would lead to confusing bugs! You can fix this component by passing guest as a prop instead:

let guest = 0;
function Cup() {
  // Bad practice: side effect in a component!
  // changing a preexisting variable!
  guest = guest + 1; // side effect
  return <h2>Tea cup for guest #{guest}</h2>;
}

// function App() {
//   return (
//     <section>
//       <h1>Spiced Chai Recipe</h1>
//       <h2>For two</h2>
//       <Recipe drinkers={2} />
//       <h2>For a gathering</h2>
//       <Recipe drinkers={10} />
//     </section>
//   );
// }

function App() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

export default App;
