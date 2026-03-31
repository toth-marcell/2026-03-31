import { useState } from "react";

export default function RegisterOrLogin() {
  const [passwordShown, setPasswordShown] = useState(false);
  async function Register(e) {
    e.preventDefault();
  }
  return (
    <>
      <form className="needs-validation" noValidate onSubmit={Register}>
        <label className="d-block mb-2">
          Name
          <input type="text" className="form-control" required />
        </label>
        <label className="d-block mb-2">
          Email
          <input type="email" className="form-control" required />
        </label>
        <label className="d-block mb-2">
          Password
          <div className="input-group">
            <input
              type={passwordShown ? "text" : "password"}
              className="form-control"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordShown(!passwordShown)}
              className="btn btn-secondary"
            >
              {passwordShown ? "hide" : "show"}
            </button>
          </div>
        </label>
        <label className="d-block mb-2">
          Birth year
          <input type="number" className="form-control" required />
        </label>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
}
