interface ComponentProps {
  text: string;
  step: string;
}

export default function Header({ text, step }: ComponentProps) {
  return (
    <>
      {step === 'h2' && (
        <h2>
          <span>{text}</span>
        </h2>
      )}
      {step === 'h3' && (
        <h3>
          <span>{text}</span>
        </h3>
      )}
    </>
  );
}
