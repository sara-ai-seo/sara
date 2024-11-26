import FeaturedIcon from "@/components/svgComponents/FeaturedIcon";
import FaqCard from "./components/FaqCard";
import SearchInput from "./components/SearchInput";
import QuestionIcon from "@/components/svgComponents/QuestionIcon";

export default function page() {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="flex flex-col  justify-center items-center py-16 space-y-3">
        <h1 className="text-[#1570EF] font-medium">FAQs</h1>
        <h2 className="font-bold sm:text-4xl text-3xl text-wrap text-center">
          Frequently asked questions
        </h2>
        <p className="text-base text-[#475467]">
          Have questions? We’re here to help.
        </p>

        <SearchInput />
      </div>
      <div className="flex flex-col items-center p-4 w-full 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Basic SEO FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">What is SEO?</h1>
            <p className="leading-6 text-gray-600">
              SEO stands for Search Engine Optimization. It's the process of
              optimizing your website to increase its visibility on search
              engine results pages (SERPs). By improving your site for relevant
              keywords, search engines, and users, you can attract organic
              (unpaid) traffic.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Does My Business Need SEO?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, most businesses benefit from SEO. SEO helps increase
              visibility and drive targeted traffic to your website, which is
              particularly important since many customers start their product or
              service searches online.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">How Does SEO Work?</h1>
            <p className="leading-6 text-gray-600">
              SEO involves optimizing your website to meet the needs of both
              search engines and users. Search engine crawlers index your site,
              and algorithms use various ranking factors to determine your
              position in the SERPs. By optimizing for these factors, you
              increase your chances of ranking higher.
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16  p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          General SEO FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Can I Find Relevant Keywords?
            </h1>
            <p className="leading-6 text-gray-600">
              Use WebMaxi's keyword research tools to discover the most relevant
              keywords for your industry. These tools provide insights on search
              volume, competition, and trends to help you focus on high-impact
              keywords.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Why Isn’t My Website Ranking on Google?
            </h1>
            <p className="leading-6 text-gray-600">
              This could be due to several factors, including indexing issues,
              content quality, or keyword optimization. Use tools like WebMaxi’s
              Rank Tracker and Google Search Console to check for any problems
              and identify improvement areas.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Why Has My Organic Traffic Dropped?
            </h1>
            <p className="leading-6 text-gray-600">
              Several factors can cause traffic drops, such as algorithm
              updates, increased competition, or seasonal trends. Analyze your
              ranking performance using WebMaxi's tracking tools to identify the
              cause and adjust your strategy.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Is a Google Penalty?
            </h1>
            <p className="leading-6 text-gray-600">
              A Google penalty occurs when your website violates Google's
              guidelines, often due to unethical SEO practices like buying
              links. Google Search Console will notify you if you have a
              penalty, and it can negatively impact your rankings.
            </p>
          </FaqCard>
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Long Does It Take to Rank on Google?
            </h1>
            <p className="leading-6 text-gray-600">
              It can take weeks to months for a new site or page to rank,
              depending on factors like competition, keyword difficulty, and
              your website’s authority.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Are the Most Important Ranking Factors?
            </h1>
            <p className="leading-6 text-gray-600">
              Key ranking factors include content relevance, quality, website
              usability, mobile-friendliness, and security. Prioritize these
              areas to improve your site’s SEO.
            </p>
          </FaqCard>
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Should I Use Both SEO and PPC?
            </h1>
            <p className="leading-6 text-gray-600">
              Combining SEO and PPC (pay-per-click) advertising offers the best
              of both worlds: SEO builds long-term traffic, while PPC provides
              immediate visibility. A balanced approach is often the most
              effective
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Content Marketing FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What is Content Marketing?
            </h1>
            <p className="leading-6 text-gray-600">
              Content marketing involves creating and sharing valuable, relevant
              content to engage your target audience and drive traffic to your
              website. High-quality content can establish authority and improve
              search rankings.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Long Should My Content Be?
            </h1>
            <p className="leading-6 text-gray-600">
              Your content should be as long as necessary to satisfy the user’s
              intent. Avoid overly long or too-short content by aiming for depth
              while maintaining clarity.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Do I Create SEO-Friendly Content?
            </h1>
            <p className="leading-6 text-gray-600">
              Start with keyword research, understand user intent, and create
              high-quality, optimized content. WebMaxi’s SEO Writing Assistant
              can help by providing real-time optimization recommendations.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Does Duplicate Content Harm Website Rankings?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, duplicate content can confuse search engines and harm
              rankings. Avoid duplicate or near-duplicate content, and use tools
              like WebMaxi’s Site Audit to identify and fix any duplicate
              issues.
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Link Building FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Is Link Building?
            </h1>
            <p className="leading-6 text-gray-600">
              Link building is the process of getting other websites to link to
              yours. High-quality backlinks act as votes of confidence,
              improving your website’s authority and rankings.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Do I Get Other Sites to Link to Mine?
            </h1>
            <p className="leading-6 text-gray-600">
              Create valuable, shareable content that other sites want to link
              to. Tactics like broken link building, skyscraper content, and
              digital PR can help you build links effectively.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Should I Focus on Link Quantity or Quality?
            </h1>
            <p className="leading-6 text-gray-600">
              Quality over quantity. High-quality backlinks from authoritative
              sites have more value than a large number of low-quality links.
              WebMaxi’s Backlink Audit tool can help you assess the health of
              your link profile.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">Should I Buy Links?</h1>
            <p className="leading-6 text-gray-600">
              No, buying links violates Google’s guidelines and can result in
              penalties. Focus on earning natural links through high-quality
              content and ethical link-building practices.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">What Is PageRank?</h1>
            <p className="leading-6 text-gray-600">
              PageRank is an algorithm developed by Google to evaluate the
              importance of web pages based on their backlinks. Although no
              longer publicly available, understanding PageRank can help you
              focus on link quality.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can I Look at My Competitors’ Backlinks?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi’s Backlink Analytics tool allows you to explore your
              competitors’ backlink profiles and find link-building
              opportunities for your site.
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Technical SEO FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What is Technical SEO?
            </h1>
            <p className="leading-6 text-gray-600">
              Technical SEO focuses on optimizing the backend of your site, such
              as improving page speed, mobile-friendliness, and website
              structure, to ensure search engines can easily crawl and index
              your site
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Can I Identify Technical SEO Issues?
            </h1>
            <p className="leading-6 text-gray-600">
              Use WebMaxi’s Site Audit tool to identify technical SEO issues
              like broken links, slow page speeds, or duplicate content. Fixing
              these issues helps improve rankings and user experience.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What PageSpeed Score Should I Aim For?
            </h1>
            <p className="leading-6 text-gray-600">
              Aim for a performance score of 90 or higher on Google’s PageSpeed
              Insights tool. Faster sites tend to rank better and offer a better
              user experience.
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Competitive Analysis FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Is Competitive Analysis in WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Competitive analysis in WebMaxi allows you to evaluate your
              competitors' SEO performance by analyzing their keywords, content,
              backlinks, and more. It helps you uncover strategies they’re using
              successfully, so you can refine your own SEO approach.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Does WebMaxi Help with Competitive Analysis?
            </h1>
            <p className="leading-6 text-gray-600">
              WebMaxi provides tools that let you identify your competitors,
              analyze their top-ranking pages, review their SEO strategies, and
              discover keyword gaps. With these insights, you can gain a
              competitive edge by improving your site’s SEO performance.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can I Track My Competitors' Rankings in WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi enables you to track your competitors' keyword
              rankings, allowing you to monitor their progress and compare it
              with your own. You can set up custom tracking to see how their
              rankings shift over time and adjust your SEO strategy accordingly.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What SEO Metrics Can I Analyze with WebMaxi’s Competitive
              Analysis?
            </h1>
            <p className="leading-6 text-gray-600">
              With WebMaxi, you can analyze a variety of SEO metrics, including:
            </p>

            <ul className="text-left ">
              <li>● Organic search traffic</li>
              <li>● Top-performing keywords</li>
              <li>● Domain authority and page authority</li>
              <li>● Backlink profiles</li>
              <li>
                ● On-page SEO factors These metrics give you a complete view of
                your competitors' SEO strategies.
              </li>
            </ul>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Do I Identify My Competitors Using WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              WebMaxi automatically identifies your top competitors based on
              your target keywords and industry. You can manually add
              competitors if needed, allowing you to focus on the most relevant
              players in your market.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can I Compare My Website with Multiple Competitors on WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi allows you to compare your website against multiple
              competitors at once. You can analyze how you rank for shared
              keywords, compare backlink profiles, and review on-page SEO
              optimizations side by side.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Is Keyword Gap Analysis in WebMaxi’s Competitive Analysis?
            </h1>
            <p className="leading-6 text-gray-600">
              Keyword Gap Analysis in WebMaxi compares the keywords your site
              ranks for with those of your competitors. This helps you identify
              keywords they rank for but you don’t, so you can create targeted
              strategies to fill these gaps and improve your rankings.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Can I Use Competitive Insights from WebMaxi to Improve My SEO
              Strategy?
            </h1>
            <p className="leading-6 text-gray-600">
              By analyzing your competitors’ SEO tactics, WebMaxi helps you:
            </p>

            <ul className="text-left ">
              <li>
                ● Discover high-performing keywords and content strategies
              </li>
              <li>● Identify backlink opportunities</li>
              <li>
                ● Uncover weaknesses in your competitors’ SEO Using these
                insights,{" "}
              </li>
            </ul>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-16 p-4 2xl:w-[80%] mx-auto">
        <h1 className="font-bold text-xl mb-3 text-[#1570EF] border-b border-[#1570EF]">
          Keyword Explorer FAQs
        </h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Is WebMaxi’s Keyword Explorer?
            </h1>
            <p className="leading-6 text-gray-600">
              WebMaxi’s Keyword Explorer is a powerful tool that helps you
              discover and analyze keywords relevant to your industry. It
              provides insights into search volume, keyword difficulty, and
              competition to guide your content strategy.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Does WebMaxi’s Keyword Explorer Work?
            </h1>
            <p className="leading-6 text-gray-600">
              Simply enter a seed keyword into WebMaxi’s Keyword Explorer, and
              it will generate a list of related keywords, complete with metrics
              like search volume, keyword difficulty, and trends. You can use
              this data to find the best keywords for your SEO efforts.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              What Are Long-Tail Keywords, and How Can I Find Them Using
              WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Long-tail keywords are more specific phrases with lower search
              volume but higher conversion potential. With WebMaxi, you can
              easily discover long-tail keywords related to your business by
              entering broad terms and reviewing the suggested keyword
              variations.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Can I Analyze Keyword Difficulty in WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              WebMaxi provides a keyword difficulty score for each keyword,
              indicating how hard it is to rank for that term. Use this score to
              prioritize keywords that offer a good balance between competition
              and ranking potential, helping you target low-competition
              opportunities.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Do I Track My Keywords Using WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              With WebMaxi’s keyword tracking feature, you can monitor the
              performance of your selected keywords over time. You’ll receive
              updates on ranking changes, search volume trends, and visibility,
              so you can adjust your SEO strategy as needed.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Does WebMaxi Help with Keyword Research?
            </h1>
            <p className="leading-6 text-gray-600">
              WebMaxi simplifies keyword research by providing detailed insights
              such as search volume, keyword difficulty, competition analysis,
              and related terms. This allows you to quickly identify keywords
              that align with your target audience’s search intent.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can I See Keyword Trends Over Time in WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi’s Keyword Explorer shows you search trends over time
              for each keyword. This feature helps you identify seasonal
              keywords or growing trends, enabling you to optimize your content
              for timely opportunities.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Often Should I Use WebMaxi’s Keyword Explorer?
            </h1>
            <p className="leading-6 text-gray-600">
              It’s recommended to use WebMaxi’s Keyword Explorer regularly,
              especially when creating new content, launching products, or
              seeing shifts in traffic. Consistent keyword research ensures that
              you’re staying ahead of changes in search behavior and industry
              trends.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Can WebMaxi Help Me Find Keyword Opportunities My Competitors
              Are Missing?
            </h1>
            <p className="leading-6 text-gray-600">
              Using WebMaxi’s Keyword Gap Analysis, you can find keywords that
              your competitors aren’t targeting yet. This gives you a chance to
              rank for valuable search terms before your competitors catch on,
              driving more traffic to your site.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can WebMaxi Suggest Related Keywords for My Content?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi generates related keyword suggestions based on your
              input. You can explore these to find additional keyword
              opportunities for expanding your content and covering more
              relevant search queries.
            </p>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              How Do I Use WebMaxi to Optimize My Content for Specific Keywords?
            </h1>
            <p className="leading-6 text-gray-600 text-left">
              Once you’ve identified valuable keywords using WebMaxi, you can
              optimize your content by:
            </p>

            <ul className="text-left ">
              <li>
                ● Including the keyword in titles, headings, and meta
                descriptions
              </li>
              <li>● Naturally integrating the keyword into your content</li>
              <li>
                ● Ensuring your content matches the user intent behind the
                keyword WebMaxi also provides on-page SEO insights to ensure
                that your keyword usage aligns with best practices.
              </li>
            </ul>
          </FaqCard>

          <FaqCard>
            <h1 className="font-semibold mb-2 text-lg">
              Can I Export My Keyword Research from WebMaxi?
            </h1>
            <p className="leading-6 text-gray-600">
              Yes, WebMaxi allows you to export your keyword research data,
              including keyword lists, difficulty scores, and search volumes.
              This makes it easy to share insights with your team or incorporate
              them into your broader SEO strategy.
            </p>
          </FaqCard>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto w-full space-y-5 my-16 sm:w-[80%] bg-[#F9FAFB]  rounded-lg p-8">
        <QuestionIcon className="w-16 h-16 text-blue-500" />
        <div className="flex  flex-col text-center">
          <h1 className="font-bold">Still have questions?</h1>
          <p className="text-sm text-[#475467]">
            Can’t find the answer you’re looking for? Please contact our
            friendly team.
          </p>
        </div>

        <button
          type="button"
          className="rounded-md py-2 px-4 bg-[#1570ef] text-white"
        >
          Get in touch
        </button>
      </div>
    </section>
  );
}
