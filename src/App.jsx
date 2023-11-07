import PageRouter from "./router/PageRouter";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";

function App() {

  const [Auth, setAuth] = useState(null);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    if (Auth) {
      localStorage.setItem("auth", JSON.stringify(Auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [Auth]);


  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ Auth, setAuth }}>
        <PageRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
