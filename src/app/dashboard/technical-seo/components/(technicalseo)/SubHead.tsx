import { RxQuestionMarkCircled } from "react-icons/rx";

interface Props {
  title: string;
  info?: string;
}
export default function SubHead({ title, info }: Props) {
  return (
    <div className="grid">
      <h1
        className={`text-[#101828] flex items-center font-semibold text-xl gap-4`}
      >
        {title}
        <button title={info}>
          <RxQuestionMarkCircled className="text-gray-400" />
        </button>
      </h1>
      <hr className="mt-2" />
    </div>
  );
}
