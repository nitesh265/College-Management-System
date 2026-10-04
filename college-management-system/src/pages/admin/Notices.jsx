const Notices = () => {

  const notices = [
    {
      title: "Semester Examination",
      date: "20 September 2026",
      description: "Semester examination will start from October."
    },
    {
      title: "Holiday Notice",
      date: "18 September 2026",
      description: "College will remain closed on Friday."
    },
    {
      title: "Annual Function",
      date: "15 September 2026",
      description: "Annual function will be conducted next month."
    }
  ];

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Notices</h1>
          <p>College announcements</p>
        </div>

        <button className="primary-btn">
          + Add Notice
        </button>

      </div>

      <div className="notice-grid">

        {notices.map((notice) => (

          <div className="card" key={notice.title}>

            <h2>{notice.title}</h2>

            <small>{notice.date}</small>

            <p>{notice.description}</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Notices;