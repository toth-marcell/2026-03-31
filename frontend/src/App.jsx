import { useState } from "react";
import RegisterOrLogin from "./components/RegisterOrLogin";

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <header>
        <h1 className="text-center">Cows</h1>
      </header>
      <main>
        {token == null ? (
          <>
            <RegisterOrLogin />
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
