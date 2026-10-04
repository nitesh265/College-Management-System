const TeacherAttendance = () => {

  const students = [
    "Rahul Sharma",
    "Priya Singh",
    "Aman Kumar",
    "Rohit Verma"
  ];

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Mark Attendance</h1>
          <p>Take today's attendance</p>
        </div>

      </div>

      <div className="card">

        {students.map((student, index) => (

          <div className="attendance-row" key={student}>

            <span>
              {index + 1}. {student}
            </span>

            <div>

              <label>
                <input
                  type="radio"
                  name={`student-${index}`}
                  defaultChecked
                />
                Present
              </label>

              <label>
                <input
                  type="radio"
                  name={`student-${index}`}
                />
                Absent
              </label>

            </div>

          </div>

        ))}

        <button className="primary-btn">
          Save Attendance
        </button>

      </div>

    </div>
  );
};

export default TeacherAttendance;