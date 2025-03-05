export const issuesData = [
  {
    title: "4xx Errors (is_4xx_code)",
    category: "Errors",
    Description:
      "A 4xx error means that the server cannot find the page you requested. Common examples include 404 Not Found (the page doesn’t exist) and 403 Forbidden (you don’t have permission to access the page).",

    Importance:
      "When users encounter these errors, they become frustrated and may leave your site. Search engines also don't like these errors, which can lead to lower rankings. Fixing these issues helps maintain a smooth user experience and improves your site's credibility.",
    "How to Fix": `Use an online broken link checker to scan your website for any broken links.
        If you find a broken link, update it to point to a valid page.
        If a page has moved to a new URL, set up a 301 redirect to direct users and search engines to the new location.`,
    "Get Help": `If you need assistance fixing broken links or setting up redirects, feel free to contact us!`,
  },
  {
    title: ` 5xx Errors (is_5xx_code)`,
    category: "Errors",
    Description: `A 5xx error indicates that something has gone wrong on the server side. This could be a 500 Internal Server Error (a general error message) or a 503 Service Unavailable (the server is temporarily unable to handle requests).`,
    Importance: `These errors can make your entire site or specific pages inaccessible, leading to lost visitors and potential revenue. Search engines may also lower your site’s rankings if they encounter these errors frequently.`,
    "How to Fix": `Check your server logs to find out what caused the error. This may require accessing your hosting account or contacting your hosting provider for help.
Ensure that your server configuration is correct, and all necessary resources are available.
If the problem persists, contact your hosting provider for further assistance.`,
    "Get Help": `If you’re facing persistent server issues, don’t hesitate to reach out for professional support.`,
  },
  {
    title: `Redirect Issues (is_redirect)`,
    category: "Errors",
    Description: `This parameter checks if the page is redirected. A redirect occurs when a URL takes you to a different URL than the one you entered.`,
    Importance: ` While redirects can be useful, too many redirects or improper setups can slow down your site and confuse users. This can lead to higher bounce rates and negatively affect SEO.`,
    "How to Fix": `Use a redirect checker tool to identify any problematic redirects on your site.
Simplify your redirects to ensure each one leads directly to the final destination, minimizing unnecessary steps.`,
    "Get Help": `For help managing redirects and optimizing your site structure, contact us!`,
  },
  {
    title: `No H1 Tag (no_h1_tag)`,
    category: "Errors",
    Description: `The H1 tag is the main heading of a webpage, telling both users and search engines what the page is about. If a page is missing this tag, it may confuse search engines and users alike.`,
    Importance: `The H1 tag plays a crucial role in SEO because it helps search engines understand the primary topic of the page. Without it, your page may struggle to rank for relevant keywords.`,
    "How to Fix": `Edit your page’s HTML to include an H1 tag at the very top, like this: <h1>Your Main Topic Here</h1>.
Make sure that the H1 tag accurately describes the content of the page and includes important keywords.`,
    "Get Help": `If you need assistance with on-page SEO optimizations, including adding H1 tags, feel free to reach out!`,
  },
  {
    title: `No Meta Title (has_meta_title: false)`,
    category: "Errors",
    Description: `The H1 tag is the main heading of a webpage, telling both users and search engines what the page is about. If a page is missing this tag, it may confuse search engines and users alike.`,
    Importance: `The meta title is critical for SEO because it affects how your page appears in search results and can influence whether users click on your link. A missing title can result in lost traffic and lower rankings.`,
    "How to Fix": `Add a meta title to your page’s <head> section like this: <title>Your Descriptive Title Here</title>.
Ensure the title is clear, includes relevant keywords, and is around 50-60 characters long to display well in search results.`,
    "Get Help": `For professional assistance in crafting effective meta titles, contact us!`,
  },
  {
    title: "High Node Count",
    category: "Warnings",
    Description: `This issue occurs when a webpage has more than 1,500 DOM nodes, meaning there are too many elements on the page.`,
    Importance: `A high number of nodes can slow down the rendering of your page, making it load slower and potentially frustrating users. Search engines may also have difficulty crawling and indexing such pages efficiently.`,
    "How to Fix": `Review the HTML structure of your page and remove unnecessary elements or tags.
Combine multiple stylesheets and scripts where possible to reduce the overall number of nodes.`,
    "Get Help": `If you’d like assistance in optimizing your HTML structure, feel free to contact us!`,
  },
  {
    title: "Render-Blocking Resources",
    category: "Warnings",
    Description: `This issue occurs when a webpage has more than 1,500 DOM nodes, meaning there are too many elements on the page.`,
    Importance: `A high number of nodes can slow down the rendering of your page, making it load slower and potentially frustrating users. Search engines may also have difficulty crawling and indexing such pages efficiently.`,
    "How to Fix": `Review the HTML structure of your page and remove unnecessary elements or tags.
Combine multiple stylesheets and scripts where possible to reduce the overall number of nodes.`,
    "Get Help": `If you’d like assistance in optimizing your HTML structure, feel free to contact us!`,
  },
  {
    title: "Low Content Rate (low_content_rate)",
    category: "Warnings",
    Description: `This occurs when the visible text on a page is too low compared to the amount of HTML code. Essentially, there isn’t enough meaningful content for search engines to evaluate.`,
    Importance: `Search engines favor pages with quality content. A low content rate may lead to the page being classified as low quality, resulting in poor rankings.`,
    "How to Fix": `
    Add more relevant and informative content to your pages. Aim for a healthy balance of text, images, and other media types.
Review existing content to ensure it’s valuable and relevant to your audience.
    `,
    "Get Help": `If you need assistance enhancing your website content for better SEO performance, contact us!`,
  },
  {
    title: "No Content Encoding (no_content_encoding: false)",
    category: "Notices",
    Description: `Content encoding, such as Gzip compression, reduces the size of files sent over the internet, making them quicker to download. If your page lacks this, it may load more slowly.`,
    Importance: `Without content encoding, your pages can take longer to load, negatively impacting user experience and search engine rankings.`,
    "How to Fix": `
    Enable Gzip or Brotli compression on your web server through your hosting control panel or server configuration.
Check using tools like GTmetrix or Google PageSpeed Insights to confirm that your compression is working.
    `,
    "Get Help": `For help in setting up content encoding, feel free to contact us!`,
  },
  {
    title: "No Favicon (no_favicon: false)",
    category: "Notices",
    Description: `A favicon is a small icon that appears in the browser tab when your site is open. If your page doesn’t have a favicon, it won’t display one in the tab.`,
    Importance: `Having a favicon helps with branding and makes your site more recognizable in browser tabs, enhancing user experience.`,
    "How to Fix": `
    Create a favicon image (typically 16x16 pixels) that represents your brand.
Link to your favicon in the <head> section of your HTML like this: <link rel="icon" href="path/to/favicon.ico" type="image/x-icon">.
    `,
    "Get Help": `For assistance with creating and implementing your favicon, contact us!`,
  },
  {
    title: "No Image Titles (no_image_title)",
    category: "Notices",
    Description: `This issue occurs when images on your site do not have title attributes. Title attributes provide additional information about the images.`,
    Importance: `Image titles can improve accessibility for users who rely on screen readers, and they can also enhance SEO by providing additional context for search engines.`,
    "How to Fix": `
    Add titles to your images using the title attribute in your <img> tags, like this: <img src="image.jpg" title="Descriptive Image Title">.
Ensure that the titles are descriptive and relevant to the content.
    `,
    "Get Help": `If you need help optimizing image attributes for better SEO, feel free to contact us!`,
  },
  {
    title: "Redirect Chain (redirect_chain: false)",
    category: "Notices",
    Description: `A redirect chain happens when a user or search engine is redirected through multiple URLs before reaching the final destination. For example, if URL A redirects to URL B, which then redirects to URL C.`,
    Importance: `Redirect chains can waste valuable crawl budget and slow down page loading times. This can frustrate users and negatively impact your SEO, as search engines may struggle to understand which page is the final target.`,
    "How to Fix": `
   Review your redirect setup and identify any chains where a URL is redirecting to another URL.
Ensure that each redirect leads directly to the final destination without unnecessary intermediate steps. Ideally, aim for direct redirects (301) from the original URL to the final URL.
You can use redirect checker tools to analyze and simplify your redirects.
    `,
    "Get Help": `If you need assistance managing and optimizing your redirects, contact us for professional support! `,
  },
  {
    title: "Frame (is_frame)",
    category: "Notices",
    Description: `Frames can disrupt user experience and SEO by splitting content into separate sections, making it harder for search engines to index the page properly.`,
    Importance: ``,
    "How to Fix": `
   Avoid using frames; replace them with modern HTML/CSS layouts.
If frames are necessary, ensure they include proper <title> and <meta> tags for SEO.
Get Help: Contact us for frame optimization.
    `,
    "Get Help": `If you need assistance managing and optimizing your redirects, contact us for professional support! `,
  },
  {
    title: "Is_www (is_www)",
    category: "Notices",
    Description: `Using www or non-www inconsistently can confuse search engines and split your site’s authority between two versions.`,
    Importance: ``,
    "How to Fix": `Choose one version (www or non-www) and set up a 301 redirect to the preferred version.
Update internal links and canonical tags to match the chosen version.`,
    "Get Help": `Reach out for help with URL standardization.`,
  },
  {
    title: "Is_https (is_https)",
    category: "Notices",
    Description: `HTTPS is essential for secure browsing and SEO. Sites without HTTPS may be flagged as insecure, hurting user trust and rankings.`,
    Importance: ``,
    "How to Fix": ` Install an SSL certificate on your server.
  Update all internal links and resources to use HTTPS.
  Set up 301 redirects from HTTP to HTTPS.`,
    "Get Help": `Contact us for HTTPS migration support.`,
  },
  {
    title: "Canonical (canonical)",
    category: "",
    Description: `Missing or incorrect canonical tags can lead to duplicate content issues, confusing search engines and diluting SEO efforts.`,
    Importance: ``,
    "How to Fix": `Add a canonical tag to each page: <link rel="canonical" href="https://example.com/page">.
  Ensure the canonical URL points to the preferred version of the page.`,
    "Get Help": `Get help with canonical tag implementation.`,
  },
  {
    title: "No Image Alt Text (no_image_alt)",
    category: "",
    Description: `Missing alt text for images reduces accessibility for screen readers and misses an opportunity to improve SEO with descriptive keywords.`,
    Importance: ``,
    "How to Fix": `Add alt attributes to all images: <img src="image.jpg" alt="Descriptive Text">.
Use concise, keyword-rich descriptions.`,
    "Get Help": `Contact us for image SEO optimization.`,
  },
  {
    title: "No Meta Description (no_description)",
    category: "",
    Description: `Missing meta descriptions reduce click-through rates in search results, as they provide a summary of your page’s content.`,
    Importance: ``,
    "How to Fix": `Add a meta description to each page: <meta name="description" content="Clear, engaging summary">.
Keep descriptions under 160 characters and include target keywords.`,
    "Get Help": `Reach out for meta description optimization.`,
  },
  {
    title: "Title Too Short (title_too_short)",
    category: "",
    Description: `Short meta titles (under 30 characters) may not fully describe your page, reducing its appeal in search results.`,
    Importance: ``,
    "How to Fix": `Expand your meta title to 50-60 characters, including primary keywords.
  Ensure the title is descriptive and engaging.`,
    "Get Help": `Reach out for title optimization.`,
  },
 
  {
    title: "Has HTML Doctype (has_html_doctype)",
    category: "",
    Description: `Missing or incorrect HTML doctype declarations can cause rendering issues and affect SEO.`,
    Importance: ``,
    "How to Fix": `Add the correct doctype declaration at the top of your HTML: <!DOCTYPE html>.
  Validate your HTML using tools like the W3C Markup Validator.`,
    "Get Help": `Get help with HTML validation.`,
  },
  {
    title: "SEO-Friendly URL",
    category: "",
    Description: "URLs with complex structures or irrelevant characters are harder for users and search engines to understand, harming SEO.",
    Importance: "",
    "How to Fix": "Use short, descriptive URLs with target keywords (e.g., example.com/seo-tips).\nAvoid special characters, numbers, or unnecessary parameters.",
    "Get Help": "Contact us for URL structure optimization."
  },
  {
    title: "High Loading Time",
    category: "",
    Description: "Slow-loading pages frustrate users, increase bounce rates, and harm SEO rankings.",
    Importance: "",
    "How to Fix": "Optimize images and videos for faster loading.\nMinify CSS, JavaScript, and HTML files.\nUse a Content Delivery Network (CDN) to improve speed.",
    "Get Help": "Reach out for performance optimization."
  },
  {
    title: "Duplicate Meta Tags",
    category: "",
    Description: "Duplicate meta tags (e.g., titles or descriptions) confuse search engines and can lead to lower rankings.",
    Importance: "",
    "How to Fix": "Ensure each page has unique meta titles and descriptions.\nUse tools like Screaming Frog to identify duplicates.",
    "Get Help": "Contact us for meta tag optimization."
  },
  {
    title: "Low Character Count",
    category: "",
    Description: "Pages with insufficient text content (under 300 words) may struggle to rank, as search engines prioritize detailed, informative content.",
    Importance: "",
    "How to Fix": "Add more relevant, high-quality text content.\nAim for at least 500-700 words per page.",
    "Get Help": "Get help improving content depth."
  },
  {
    title: "Low Readability Rate",
    category: "",
    Description: "Poor readability (e.g., overly complex sentences) discourages users from engaging with your content and can harm SEO.",
    Importance: "",
    "How to Fix": "Use shorter sentences and paragraphs.\nBreak up text with subheadings, bullet points, and images.\nAim for a readability score of 60+ (Flesch-Kincaid).",
    "Get Help": "Contact us for readability improvements."
  },
  {
    title: "Deprecated HTML Tags",
    category: "",
    Description: "Using outdated HTML tags (e.g., <font> or <center>) can cause rendering issues and affect SEO.",
    Importance: "",
    "How to Fix": "Replace deprecated tags with modern HTML5 equivalents.\nValidate your HTML using tools like the W3C Markup Validator.",
    "Get Help": "Reach out for HTML cleanup."
  },
  {
    title: "Irrelevant Meta Keywords",
    category: "",
    Description: "Meta keywords are no longer used by search engines, and irrelevant ones can clutter your code.",
    Importance: "",
    "How to Fix": "Remove the <meta name='keywords'> tag entirely.\nFocus on optimizing meta titles, descriptions, and content instead.",
    "Get Help": "Contact us for meta tag cleanup."
  },
  {
    title: "Meta Charset Consistency",
    category: "",
    Description: "Missing or inconsistent charset declarations can cause encoding issues, affecting how your content is displayed.",
    Importance: "",
    "How to Fix": "Add a charset declaration to your <head> section: <meta charset='UTF-8'>.\nEnsure all pages use the same charset.",
    "Get Help": "Get help with charset fixes."
  },
  {
    title: "Has Render-Blocking Resources",
    category: "",
    Description: "Render-blocking resources (e.g., CSS/JS files) delay page rendering, increasing load times and harming user experience.",
    Importance: "",
    "How to Fix": "Use async or defer attributes for JavaScript files.\nInline critical CSS or load non-critical CSS asynchronously.",
    "Get Help": "Contact us for resource optimization."
  },
  {
    title: "HTTPS to HTTP Links",
    category: "",
    Description: "Linking from HTTPS pages to HTTP resources creates mixed content issues, reducing security and SEO performance.",
    Importance: "",
    "How to Fix": "Update all internal links and resources to use HTTPS.\nUse tools like Why No Padlock to identify mixed content.",
    "Get Help": "Reach out for HTTPS link fixes."
  },
  {
    title: "No Encoding Meta Tag",
    category: "",
    Description: "Missing encoding meta tags can cause character rendering issues, affecting user experience and SEO.",
    Importance: "",
    "How to Fix": "Add the encoding meta tag to your <head> section: <meta charset='UTF-8'>.\nEnsure all pages include this tag.",
    "Get Help": "Contact us for encoding fixes."
  },
  {
    title: "SEO-Friendly URL Dynamic Check",
    category: "",
    Description: "Dynamic URLs with parameters (e.g., ?id=123) are harder for users and search engines to understand, reducing SEO effectiveness.",
    Importance: "",
    "How to Fix": "Convert dynamic URLs to static, descriptive URLs (e.g., example.com/product-name).\nUse URL rewriting tools (e.g., mod_rewrite for Apache) to simplify dynamic URLs.",
    "Get Help": "Contact us for dynamic URL optimization."
  },
  {
    title: "SEO-Friendly URL Keywords Check",
    category: "",
    Description: "URLs without relevant keywords miss an opportunity to improve SEO and user understanding of the page’s content.",
    Importance: "",
    "How to Fix": "Include target keywords in your URLs (e.g., example.com/seo-tips).\nAvoid generic terms like page1 or id123.",
    "Get Help": "Reach out for keyword-rich URL optimization."
  },
  {
    title: "SEO-Friendly URL Characters Check",
    category: "",
    Description: "URLs with special characters, uppercase letters, or spaces are harder to read and can cause technical issues.",
    Importance: "",
    "How to Fix": "Use lowercase letters and hyphens to separate words (e.g., example.com/seo-best-practices).\nAvoid special characters, spaces, or underscores.",
    "Get Help": "Contact us for URL character cleanup."
  },
  {
    title: "SEO-Friendly URL Relative Length Check",
    category: "",
    Description: "Excessively long URLs are harder for users to read and share, and search engines may truncate them in results.",
    Importance: "",
    "How to Fix": "Keep URLs concise and under 60 characters.\nFocus on including only essential keywords and avoid unnecessary parameters.",
    "Get Help": "Get help for URL length optimization."
  }
 
];
