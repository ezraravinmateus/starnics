import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

render(
    <ChakraProvider>
        <App />
    </ChakraProvider>,
    document.getElementById("app")
);
