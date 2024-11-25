interface FaqCardProps {
  children: React.ReactNode;
}

export default function FaqCard({ children }: FaqCardProps) {
  return <section className="flex flex-col text-center">{children}</section>;
}
