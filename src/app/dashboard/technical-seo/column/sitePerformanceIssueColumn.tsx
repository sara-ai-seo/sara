import { ColumnDef } from "@tanstack/react-table";

import { TitleWithoutUnderline } from "../../technical-seo/components/Overview";
import { Issues } from "@/types/technicalseo/technicalSeoTypes";

export const sitePerformanceIssueColumns: ColumnDef<Issues | unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "scoreDisplayMode",
    header: "ScoreDisplayMode",
  },

  {
    accessorKey: "score",
    header: "Score",
  },
];
