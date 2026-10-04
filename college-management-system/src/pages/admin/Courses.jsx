const Courses = () => {

  const courses = [
    {
      id: "C001",
      name: "B.Tech Information Technology",
      duration: "4 Years",
      students: 420
    },
    {
      id: "C002",
      name: "B.Tech Computer Science",
      duration: "4 Years",
      students: 380
    },
    {
      id: "C003",
      name: "Bachelor of Computer Applications",
      duration: "3 Years",
      students: 300
    }
  ];

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Courses</h1>
          <p>Manage college courses</p>
        </div>

        <button className="primary-btn">
          + Add Course
        </button>

      </div>

      <div className="card">

        <table>

          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Students</th>
            </tr>
          </thead>

          <tbody>

            {courses.map((course) => (

              <tr key={course.id}>

                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.duration}</td>
                <td>{course.students}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Courses;