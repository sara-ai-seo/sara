type Props = {
  title: string;
  description: string | React.ReactNode;
};
export default function TitleAndDescription({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className=" font-bold sm:text-3xl text-2xl">{title} </h1>
      <p className=" text-center text-base text-gray-600"> {description} </p>
    </div>
  );
}
