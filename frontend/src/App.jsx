import { useEffect, useState } from "react";
import AccountCard from "./components/AccountCard";
import BuyCowCard from "./components/BuyCowCard";
import CowsTableCard from "./components/CowsTableCard";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

export default function App() {
  const API = "http://localhost:3000/";
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setLoggedIn(true);
  }, []);
  async function Register(fields) {
    const res = await fetch(API + "reg", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const rbody = await res.json();
    if (res.ok) {
      return rbody.msg;
    } else {
      throw rbody.msg;
    }
  }
  async function LogIn(fields) {
    const res = await fetch(API + "login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const rbody = await res.json();
    if (res.ok) {
      localStorage.setItem("token", rbody.token);
      setLoggedIn(true);
      return rbody.msg;
    } else {
      throw rbody.msg;
    }
  }
  const [cows, setCows] = useState([]);
  function LoadCows() {
    fetch(API + (loggedIn ? "getCow" : "allCow"), {
      headers: loggedIn
        ? { authorization: `Bearer ${localStorage.getItem("token")}` }
        : {},
    })
      .then((r) => r.json())
      .then((list) => setCows(list));
  }
  useEffect(LoadCows, [loggedIn]);
  function LogOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }
  async function BuyCow(fields) {
    const res = await fetch(API + "buyCow", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(fields),
    });
    const rbody = await res.json();
    if (res.ok) {
      LoadCows();
      return rbody.msg;
    } else {
      throw rbody.msg;
    }
  }
  async function SellCow(id) {
    const res = await fetch(API + "sellCow/" + id, {
      method: "DELETE",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.ok) LoadCows();
  }
  return (
    <>
      <header>
        <h1 className="text-center mt-2">Cows</h1>
      </header>
      <main className="container-xxl">
        <div className="row">
          <div className="col-lg-8">
            <CowsTableCard
              cows={cows}
              sellCowFunction={loggedIn ? SellCow : null}
            />
          </div>
          <div className="col-lg-4">
            {loggedIn ? (
              <>
                <AccountCard logoutFunction={LogOut} />
                <BuyCowCard buyCowFunction={BuyCow} />
              </>
            ) : (
              <>
                <RegisterCard registerFunction={Register} />
                <LoginCard loginFunction={LogIn} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
