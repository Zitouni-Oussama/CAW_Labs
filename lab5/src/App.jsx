import { useState } from 'react';
import './App.css';

// Exo 1
import { Button1, ToggleButton, AppWithButtons, Counter } from './Exo1';
// Exo 2
import { DisplayTab, DisplayTabWithIndex, DisplayTabWithClick, DisplayTab1 } from './Exo2';
// Exo 3
import { AuthFormWithDelete, AuthForm } from './Exo3';
// Exo 4
import AddDivForm from './Exo4';

function App() {
  return (
    <div>
      {/* Exo 1 */}
      <ToggleButton />
      <Button1 />
      <AppWithButtons />
      <Counter />

      {/* Exo 2 */}
      <DisplayTab tab={["hello", "world", "from", "react"]} />
      <DisplayTabWithIndex tab={["hello", "world", "from", "react"]} />
      <DisplayTabWithClick tab={["hello", "world", "from", "react"]} />
      <DisplayTab1 tab={["hello", "world", "from", "react"]} />
      <DisplayTab1 tab={["apple", "banana", "cherry"]} />

      {/* Exo 3 */}
      <AuthForm />
      <AuthFormWithDelete />

      {/* Exo 4 */}
      <AddDivForm/>
    </div>
  );
}

export default App;
