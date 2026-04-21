export default function AccountCard({ logoutFunction }) {
  return (
    <section className="card">
      <div className="card-header">Account</div>
      <div className="card-body">
        <button
          type="button"
          className="btn btn-warning"
          onClick={logoutFunction}
        >
          Log out
        </button>
      </div>
    </section>
  );
}
