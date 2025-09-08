import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { client } from "./apollo/apolloClient.jsx";
import { ApolloProvider } from "@apollo/client";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
