type GreetingsProps = {
  name: string;
};

const Greetings = ({ name }: GreetingsProps) => {
  return <div className="mb-20">Greetings {name}</div>;
};

export default Greetings;
