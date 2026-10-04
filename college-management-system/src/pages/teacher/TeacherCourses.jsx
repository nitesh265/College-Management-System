const TeacherCourses = () => {

  return (
    <div>

      <div className="page-header">
        <h1>My Courses</h1>
        <p>Courses assigned to you</p>
      </div>

      <div className="notice-grid">

        <div className="card">
          <h2>Java Programming</h2>
          <p>B.Tech IT - 2nd Year</p>
          <strong>60 Students</strong>
        </div>

        <div className="card">
          <h2>Data Structures</h2>
          <p>B.Tech IT - 2nd Year</p>
          <strong>55 Students</strong>
        </div>

        <div className="card">
          <h2>Database Management</h2>
          <p>BCA - 2nd Year</p>
          <strong>70 Students</strong>
        </div>

      </div>

    </div>
  );
};

export default TeacherCourses;