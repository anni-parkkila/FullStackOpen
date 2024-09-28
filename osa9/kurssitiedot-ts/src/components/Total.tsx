interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return (
    <p>
      <strong>Number of exercises: {props.total}</strong>
    </p>
  );
};

export default Total;
