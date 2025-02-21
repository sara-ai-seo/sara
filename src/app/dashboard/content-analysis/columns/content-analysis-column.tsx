import { ColumnDef } from "@tanstack/react-table";
import { ExploreContentTableItemType } from "../data/exploreContentTableData";
import Button from "../../components/ui/Button";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import moment from "moment";
import { getSocialMediaIcon } from "../components/DisplaySocialMediaIcon";
import { TitleWithoutUnderline } from "../../technical-seo/components/Overview";

interface InfoType {
  title: string;
  link: string;
  description: string;
  author: string;
  date_published: Date;
  language: string;
  socialMediaHandles?: {
    [key: string]: number;
  };
}

export const ExploreContentTableColumns: ColumnDef<ExploreContentTableItemType>[] =
  [
    {
      accessorKey: "info",
      header: () => {
        return (
          <button className="inline-flex gap-1">
            Page title, snippet, & info{" "}
            <TitleWithoutUnderline title="" info={"The title and summary details of your page that show up in search results."} />
          </button>
        );
      },
      cell: ({ row }) => {
        const InfoObj = row.getValue("info") as InfoType;
        if (typeof InfoObj !== "object" || InfoObj === null) {
          return <div>No info available</div>;
        }

        const {
          title,
          link,
          description,
          author,
          date_published,
          language,
          socialMediaHandles,
        } = InfoObj;

        return (
          <div className="block space-y-2">
            <h3 className="font-semibold">{title}</h3>
            <a href={link} target="_blank" className="text-blue-500 underline">
              {link}
            </a>
            <p className="text-sm">{description}</p>
            <div className="flex items-center gap-0.5">
              <p className="text-xs text-gray-500">
                <strong>Published:</strong>{" "}
                {moment(date_published).format("DD MMM yyy")}
              </p>
              |
              <p className="text-xs text-gray-500">
                <strong>Author:</strong> {author}
              </p>
              |
              <p className="text-xs text-gray-500">
                <strong>Lang:</strong> {language}
              </p>
            </div>
            {socialMediaHandles && (
              <ul className="flex gap-2 text-xs items-center">
                {Object.entries(socialMediaHandles).map(([platform, count]) => (
                  <>
                    <li key={platform} className="flex items-center gap-1">
                      {getSocialMediaIcon(platform)}
                      <span>{count}</span>
                    </li>{" "}
                    |
                  </>
                ))}
              </ul>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "dr",
      header: () => (
        <button className="flex items-center gap-0.5">
          DR <TitleWithoutUnderline title="" info={"A score that shows how strong your website’s backlink profile is."} />
        </button>
      ),
    },
    {
      accessorKey: "ur",
      header: () => (
        <button className="flex items-center gap-0.5">
          UR <TitleWithoutUnderline title="" info={"A score that indicates the strength of a specific page’s backlink profile."} />
        </button>
      ),
    },
    {
      accessorKey: "bss",
      header: () => (
        <button className="flex items-center gap-0.5">
          BSS <TitleWithoutUnderline title="" info={"A metric reflecting the social engagement or signals of your content."} />
        </button>
      ),
    },
    {
      accessorKey: "page_type",
      header: "Page type",
      cell: ({ row }) => {
        return (
          <span className="bg-gray-200 rounded-full py-1 px-2 whitespace-nowrap">
            {row.getValue("page_type")}
          </span>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "cqs",
      header: () => (
        <button className="flex items-center gap-0.5">
          CQS <TitleWithoutUnderline title="" info={"A score measuring how well your content meets quality standards."} />
        </button>
      ),
    },
    {
      accessorKey: "content_type",
      header: "Content type",
      cell: ({ row }) => {
        return (
          <span className="bg-gray-200 rounded-full py-1 px-2">
            {row.getValue("content_type")}
          </span>
        );
      },
    },
    {
      accessorKey: "sentiment",
      header: "Sentiment",
      cell: ({ row }) => {
        const sentimentDValue = row.getValue("sentiment");
        const color = [
          { textColor: "#027a48", bgColor: "#ecfdf3" },
          { textColor: "#f89717", bgColor: "#fffaeb" },
          { textColor: "#d92d20", bgColor: "#fef3f2" },
        ];

        const sentimentArray = Array.isArray(sentimentDValue)
          ? sentimentDValue
          : [sentimentDValue];
        const total = sentimentArray.reduce(
          (acc, val) => acc + parseFloat(val),
          0
        );

        // console.log(total);

        return (
          <div className="flex flex-col space-y-2">
            {sentimentArray?.map((item, i) => (
              <ul key={i}>
                <li
                  style={{
                    backgroundColor: color[i]?.bgColor,
                    color: color[i]?.textColor,
                  }}
                  className={`rounded-full py-1 px-2 w-fit`}
                >
                  {((Number(item) / total) * 100).toFixed(2)}%
                </li>
              </ul>
            ))}
          </div>
        );
      },
    },
  ];
