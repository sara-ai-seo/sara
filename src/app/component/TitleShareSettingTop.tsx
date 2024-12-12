import { CiSettings } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import PlainButton from "./PlainButton";
import { shareOrFallback } from "../utils/shareContentOrFallback";
import { useDispatch } from "react-redux";
import { setUpdateDataState } from "../../redux/features/updateDataStateSlice";
import Button from "../dashboard/components/ui/Button";
import { CurrentProperty } from "../utils/currentProperty";
import ApiCall from "../utils/apicalls/axiosInterceptor";
import toast from "react-hot-toast";


interface Props {
  title: string;
  updateData?: () => void;
  settings?: () => void;
  keyword: string
}
export default function TitleShareSettingTop({ title, updateData, keyword }: Props) {
  const dispatch = useDispatch();
  const property = CurrentProperty()

   const searchContentTopic = async (keyword: string) => {
  
    try {
      const result = ApiCall.post(
        `/user/crawler/content-analysis/${property?.id}`,
        {
          keywords: [
            {
              keyword: keyword,
            },
          ],
        }
      );
  
      toast.promise(
        result,
        {
          loading: "Crawling data",
          success: (data) => `Search successful`,
          error: (err) => `Something  just happened`,
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
  
      const res = await result;
  
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  


  return (
    <section
      className={`flex justify-between w-full items-center gap-4 text-[#101828] `}
    >
      <h1 className={`font-semibold text-4xl 2xl:text-5xl `}>{title} </h1>
      <div className="flex w-fit  items-center justify-end gap-2 md:gap-4 ">
        <span className="">
          <Button

            onClick={() => {
              dispatch(
                setUpdateDataState({ page: "content-analysis", state: "empty" })
              )
              searchContentTopic(keyword)
            }
              
            }
          >
            Update data
          </Button>
        </span>
        <span className="">
          <PlainButton
            moreClass="text-primary bg-[#EFF8FF]"
            title="Share"
            icon={<IoCloudUploadOutline />}
            handleClick={() =>
              shareOrFallback({
                url: "content-analysis",
                title: "Content Analysis",
                text: "content analysis",
              })
            }
          />
        </span>
        {/* <span className="p-3 rounded-md border cursor-pointer ">
          <CiSettings />
        </span> */}
      </div>
    </section>
  );
}
