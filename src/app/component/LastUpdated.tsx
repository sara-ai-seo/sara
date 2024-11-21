import { CountryPickAllLocationDefault } from "../dashboard/rank-tracker/components/CountryPick";

interface Props {
  date: string;
}
export default function LastUpdated({ date }: Props) {
  return (
    // <div className="flex items-center gap-3 text-lg">
    //   <p className={` font-semibold text-[#000000] text-base `}>
    //     Last updated:{" "}
    //   </p>
    //   <p className="font-normal text-[#000000]"> {date} </p>

    // </div>

    <section className="flex min-[500px]:flex-row flex-col  min-[500px]:items-center items-start  min-[500px]:gap-6 gap-3">
      <span className="flex items-center gap-3 text-lg">
        <p className={` font-medium text-[#101828] `}>Last updated: </p>
        <p className="font-normal"> 4th March, 2024 </p>
      </span>
      <CountryPickAllLocationDefault title="All location" />
    </section>
  );
}
