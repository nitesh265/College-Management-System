const MyCourses = () => {

  const courses = [
    {
      name: "Java Programming",
      teacher: "Dr. Rajesh Kumar"
    },
    {
      name: "Data Structures",
      teacher: "Dr. Amit Singh"
    },
    {
      name: "Database Management",
      teacher: "Prof. Neha Sharma"
    }
  ];

  return (
    <div>

      <div className="page-header">

        <h1>My Courses</h1>

        <p>
          Courses enrolled by you
        </p>

      </div>

      <div className="notice-grid">

        {courses.map((course) => (

          <div
            className="card"
            key={course.name}
          >

            <h2>{course.name}</h2>

            <p>
              Teacher: {course.teacher}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyCourses;