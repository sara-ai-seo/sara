import { CurrentProperty } from "@/app/utils/currentProperty";
import useRankMutation, { RankTrackerCrawler } from "./rank_tracking";
import { trimDomain } from "@/app/utils/trimDomain";

export async function rankTracker() {
  const property = CurrentProperty();

  const {
    mutate: RankMutate,
    isError: RankError,
    isPending: RankPending,
  } = useRankMutation(property.id);
  try {
    const response = await Promise.all([
      RankMutate({
        target: trimDomain(property.domain) as string,
        location_code: 2840,
      }),
    ]);
    const result = response.map((item) => item);
    // boyrobot@btcmod.com
    return result;
  } catch (error) {}
}
