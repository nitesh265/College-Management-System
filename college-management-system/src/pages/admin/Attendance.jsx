const Attendance = () => {

  const attendance = [
    {
      student: "Rahul Sharma",
      course: "B.Tech IT",
      total: 100,
      present: 88
    },
    {
      student: "Priya Singh",
      course: "BCA",
      total: 100,
      present: 92
    },
    {
      student: "Aman Kumar",
      course: "B.Tech CS",
      total: 100,
      present: 76
    }
  ];

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Attendance</h1>
          <p>Student attendance records</p>
        </div>

      </div>

      <div className="card">

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Total Classes</th>
              <th>Present</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((item) => {

              const percentage =
                (item.present / item.total) * 100;

              return (
                <tr key={item.student}>

                  <td>{item.student}</td>

                  <td>{item.course}</td>

                  <td>{item.total}</td>

                  <td>{item.present}</td>

                  <td>
                    <span className="status">
                      {percentage}%
                    </span>
                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Attendance;