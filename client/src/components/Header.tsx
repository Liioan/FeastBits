interface Props {
  text: string;
}

export default function Header({ text }: Props) {
  return (
    <h2>
      <span>{text}</span>
    </h2>
  );
}
