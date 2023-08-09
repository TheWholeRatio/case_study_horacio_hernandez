import React from "react";
import { Grommet } from "grommet";
import DemoFormPage from "./areas/demo-form/DemoForm";
import defaultTheme from "./theme";

function App() {
  return (
    <Grommet full theme={defaultTheme}>
      <DemoFormPage />
    </Grommet>
  );
}

export default App;
