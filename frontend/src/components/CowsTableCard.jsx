export default function CowsTable({ cows, sellCowFunction }) {
  return (
    <section className="card">
      <div className="card-header">Cows</div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>UserId</th>
              {sellCowFunction == null ? null : <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {cows.map((cow) => (
              <tr key={cow.id}>
                <td>{cow.id}</td>
                <td>{cow.name}</td>
                <td>{cow.age}</td>
                <td>{cow.gender}</td>
                <td>{cow.UserId}</td>
                {sellCowFunction == null ? null : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => sellCowFunction(cow.id)}
                    >
                      <span className="bi bi-currency-dollar"></span>
                      Sell
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
