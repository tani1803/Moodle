// Dummy in-memory storage

let courses = [];

exports.createCourse = async ({ title, description }) => {
  const course = {
    id: courses.length + 1,
    title,
    description
  };

  courses.push(course);

  return course;
};

exports.getCourses = async () => {
  return courses;
};