const MyFees = () => {

  return (
    <div>

      <div className="page-header">

        <h1>My Fees</h1>

        <p>
          Fee payment information
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <div>
            <p>Total Fees</p>
            <h2>₹1,00,000</h2>
          </div>

        </div>

        <div className="stat-card">

          <div>
            <p>Paid</p>
            <h2>₹75,000</h2>
          </div>

        </div>

        <div className="stat-card">

          <div>
            <p>Remaining</p>
            <h2>₹25,000</h2>
          </div>

        </div>

      </div>

      <div className="card">

        <h2>Payment History</h2>

        <table>

          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>10 Sept 2026</td>
              <td>₹25,000</td>
              <td>TXN001</td>
              <td>Paid</td>
            </tr>

            <tr>
              <td>10 Aug 2026</td>
              <td>₹50,000</td>
              <td>TXN002</td>
              <td>Paid</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyFees;