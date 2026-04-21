import { useState } from "react";

export default function LoginCard({ loginFunction }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [okMessage, setOkMessage] = useState(null);
  return (
    <section className="card mt-4">
      <div className="card-header">Log in</div>
      <div className="card-body">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setErrMessage(null);
              setOkMessage(
                await loginFunction(Object.fromEntries(new FormData(e.target))),
              );
            } catch (e) {
              setOkMessage(null);
              setErrMessage(e);
            }
          }}
        >
          <label className="d-block mb-2">
            Email
            <input
              type="email"
              name="email"
              className="form-control"
              required
            />
          </label>
          <label className="d-block mb-2">
            Password
            <div className="input-group">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
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
          {errMessage != null ? (
            <>
              <p className="text-bg-danger card px-2 py-1 mt-3">{errMessage}</p>
            </>
          ) : null}
          {okMessage != null ? (
            <>
              <p className="text-bg-success card px-2 py-1 mt-3">{okMessage}</p>
            </>
          ) : null}
          <div className="float-end mt-2">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
