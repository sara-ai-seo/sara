import { RootState } from "@/app/store";
import { removeTrailingSlash } from "@/app/utils/RemoveSlash";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { setLoading } from "@/redux/features/loaderSlice";
// fetchTechnicalSEOFailure
import { setTechnicalSeo } from "@/redux/features/technicalSeoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const FetchTechnicalSeo = async (page?: string) => {
  const activeProperty = useSelector(
    (state: RootState) => state.property.activeProperty
  );
  const dispatch = useDispatch();
  try {
    setLoading(true);
    await ApiCall.get("/crawl/technical-seo", {
      params: {
        limit: 100,
        platform: "desktop",
        url: removeTrailingSlash(activeProperty),
        page: page,
      },
    }).then((res) => dispatch(setTechnicalSeo(res.data)));
  } catch (error: any) {
    // dispatch(fetchTechnicalSEOFailure(error.message));
  } finally {
    setLoading(false);
  }
};
