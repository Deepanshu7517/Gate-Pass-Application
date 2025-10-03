import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { ReduxProvider } from "./providers/ReduxProvider.tsx";

render(
  <ReduxProvider>
    {" "}
    <App />
  </ReduxProvider>,
  document.getElementById("app")!
);
