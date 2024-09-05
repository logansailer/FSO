import Heading from "./Heading";
import Part from "./Part";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Heading course={course} />
          <Part course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

export default Course;
