import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/app.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
