import { NewvsLostProps, StackedBarChart } from "@/app/dashboard/components/graphs/StackedBarChart";
import { Title } from "@/app/dashboard/technical-seo/components/Overview";


export default function NewvslostBacklink({label, newData, lostData}:NewvsLostProps) {
  return (
    <section className="grid gap-4 border shadow-sm rounded-md p-4 py-6">
      <Title title={"New vs lost backlinks "} info="New vs lost backlinks " />
      <StackedBarChart label={label} lostData={lostData} newData={newData} />
    </section>
  )
}
