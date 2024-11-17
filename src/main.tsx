import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkContextProvider from "./lib/contexts/BookmarkContext.tsx";
import ActiveIdContextProvider from "./lib/contexts/ActiveIdContext.tsx";
import SearchTextContextProvider from "./lib/contexts/SearchTextContext.tsx";
import JobItemsContextProvider from "./lib/contexts/JobItemsContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarkContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarkContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
