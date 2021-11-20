import GlobalTheme from "./components/GlobalTheme";
import { PrimaryButton } from "@fluentui/react";

function App() {
  return (
    <GlobalTheme>
      <div>
        <PrimaryButton>Hello world</PrimaryButton>
      </div>
    </GlobalTheme>
  );
}

export default App;
