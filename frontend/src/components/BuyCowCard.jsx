import { useState } from "react";

export default function BuyCowCard({ buyCowFunction }) {
  const [errMessage, setErrMessage] = useState(null);
  const [okMessage, setOkMessage] = useState(null);
  return (
    <section className="card mt-4">
      <div className="card-header">
        <span className="bi bi-currency-dollar"></span>
        Buy cow
      </div>
      <div className="card-body">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setErrMessage(null);
              setOkMessage(
                await buyCowFunction(
                  Object.fromEntries(new FormData(e.target)),
                ),
              );
              e.target.reset();
            } catch (e) {
              setOkMessage(null);
              setErrMessage(e);
            }
          }}
        >
          <label className="d-block mb-2">
            Name
            <input type="text" name="name" className="form-control" required />
          </label>
          <label className="d-block mb-2">
            Age
            <input type="number" name="age" className="form-control" required />
          </label>
          <label className="d-block mb-2">
            Gender
            <input
              type="text"
              name="gender"
              className="form-control"
              required
            />
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
              Buy
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
