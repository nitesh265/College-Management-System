const Fees = () => {

  const fees = [
    {
      student: "Rahul Sharma",
      total: 100000,
      paid: 75000,
      status: "Partial"
    },
    {
      student: "Priya Singh",
      total: 80000,
      paid: 80000,
      status: "Paid"
    },
    {
      student: "Aman Kumar",
      total: 100000,
      paid: 50000,
      status: "Pending"
    }
  ];

  return (
    <div>

      <div className="page-header">
        <div>
          <h1>Fees</h1>
          <p>Manage student fees</p>
        </div>
      </div>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>Student</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {fees.map((fee) => (

              <tr key={fee.student}>

                <td>{fee.student}</td>

                <td>₹{fee.total}</td>

                <td>₹{fee.paid}</td>

                <td>
                  ₹{fee.total - fee.paid}
                </td>

                <td>
                  <span className="status">
                    {fee.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Fees;