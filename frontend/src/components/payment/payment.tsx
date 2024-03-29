const payment = () => {
  return (
    <section className="section main-section md:p-6 py-1 px-1">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Adding withdrawal payment method
            </p>
          </header>
          <div className="card-content">
            <form>
              <div className="field">
                <label className="label">Bank name</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        autoComplete="on"
                        name="name"
                        placeholder="Commerical bank of ethiopia"
                        className="input "
                        required
                      />
                    </div>
                    <p className="help">Required. Bank name</p>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Account holder name</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        type="text"
                        name="email"
                        placeholder="abebe alemu kebede"
                        className="input"
                        required
                      />
                    </div>
                    <p className="help">Required. account holder name</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="field">
                <label className="label">Add Account Number</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="1000119219665"
                    autoComplete="current-password"
                    className="input"
                    required
                  />
                </div>
                <p className="help">Required. account number</p>
              </div>
              <hr />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button green">
                    save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default payment;
