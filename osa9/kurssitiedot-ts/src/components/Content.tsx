export interface CourseProps {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CourseProps[];
}

const Course = ({ course }: CourseProps) => {
  return (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  );
};

const Content = (props: ContentProps) => {
  const courses = props.courseParts.map((course) => {
    return <Course key={course.name} course={course} />;
  });
  return <>{courses}</>;
};

export default Content;
