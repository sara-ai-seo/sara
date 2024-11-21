import { useMutation } from "@tanstack/react-query";
import {CompetitorAnalysisServiceProps} from "../../services/crawlers/competitorAnalysis"
import CompetitorAnalysisService from "../../services/crawlers/competitorAnalysis"

export function UseCompetitorCrawl({id, data} : CompetitorAnalysisServiceProps) {

    const competitorAnalysisService = new CompetitorAnalysisService()

    const {isError, isPending } = useMutation({
       mutationKey: ["competitor_crawl"],
       mutationFn: async () => {
           await competitorAnalysisService.crawl({id: id, data});
       }
    })

    return {isError, isPending}
}