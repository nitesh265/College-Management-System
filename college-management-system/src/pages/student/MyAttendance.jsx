const MyAttendance = () => {

  const attendance = [
    {
      subject: "Java",
      total: 40,
      present: 37
    },
    {
      subject: "DSA",
      total: 45,
      present: 39
    },
    {
      subject: "Database",
      total: 38,
      present: 35
    },
    {
      subject: "Computer Networks",
      total: 42,
      present: 34
    }
  ];

  return (
    <div>

      <div className="page-header">
        <h1>My Attendance</h1>
        <p>Subject-wise attendance</p>
      </div>

      <div className="card">

        <table>

          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Classes</th>
              <th>Present</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((item) => {

              const percentage =
                ((item.present / item.total) * 100).toFixed(2);

              return (

                <tr key={item.subject}>

                  <td>{item.subject}</td>
                  <td>{item.total}</td>
                  <td>{item.present}</td>
                  <td>{percentage}%</td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyAttendance;