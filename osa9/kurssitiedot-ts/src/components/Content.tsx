import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const courses = props.courseParts.map((course) => {
    return <Part key={course.name} course={course} />;
  });
  return <>{courses}</>;
};

export default Content;
