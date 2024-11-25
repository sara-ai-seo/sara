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
];
