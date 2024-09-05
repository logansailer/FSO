const Total = ({ course }) => {
  const initial = 0;
  const totalCourses = course.parts.reduce(
    (exerciseSum, amount) => exerciseSum + amount.exercises,
    initial
  );
};

export default Total;
