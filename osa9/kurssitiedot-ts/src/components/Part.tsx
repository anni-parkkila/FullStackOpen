import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <ul>
            <li>
              <strong>
                {course.name} {course.exerciseCount}
              </strong>
            </li>
            <li>
              <em>{course.description}</em>
            </li>
          </ul>
        </div>
      );
    case "group":
      return (
        <div>
          <ul>
            <li>
              <strong>
                {course.name} {course.exerciseCount}
              </strong>
            </li>
            <li>project exercises {course.groupProjectCount}</li>
          </ul>
        </div>
      );
    case "background":
      return (
        <div>
          <ul>
            <li>
              <strong>
                {course.name} {course.exerciseCount}
              </strong>
            </li>
            <li>
              <em>{course.description}</em>
            </li>
            <li>submit to {course.backgroundMaterial}</li>
          </ul>
        </div>
      );
    case "special":
      return (
        <div>
          <ul>
            <li>
              <strong>
                {course.name} {course.exerciseCount}
              </strong>
            </li>
            <li>
              <em>{course.description}</em>
            </li>
            <li>
              required skills:{" "}
              <ul>
                {course.requirements.map((r) => {
                  return (
                    <li className="req" key={r}>
                      {r}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
