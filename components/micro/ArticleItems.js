// Function to format a given date string
function formatDate(inputText) {
    const inputDate = new Date(inputText);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return inputDate.toLocaleDateString(undefined, options);
  }
  
  // Function to extract content from HTML string using regex patterns
  function extractContent(htmlString) {
    // Define regex patterns to match <h4> and <p> tags
    const h4Pattern = /<h4>(.*?)<\/h4>/s;
    const pPattern = /<p>(.*?)<\/p>/s;
  
    // Attempt to match patterns in the HTML string
    const h4Match = htmlString.match(h4Pattern);
    const pMatch = htmlString.match(pPattern);
  
    // If both <h4> and <p> tags are found, combine their content
    if (h4Match && pMatch) {
      const h4Content = h4Match[1];
      const pContent = pMatch[1];
      return `${h4Content} - ${pContent}`;
    } else if (pMatch) {
      // If only a <p> tag is found, use its content
      const pContent = pMatch[1];
      return pContent;
    }
    // Return null if no suitable content is found
    return null;
  }
  
  // Component to render article items
  function ArticleItems({ article, index }) {
    // Extract content and format date for rendering
    const content = extractContent(article.description);
    const formattedDate = formatDate(article.pubDate);
  
    return (
      <div key={index} className="flex md:contents">
          <div className="col-start-4 col-end-12 my-4 md:p-3 sm:p-4 mr-auto w-full rounded-md dark:bg-slate-800 dark:text-white p-4 shadow-md duration-500 ease-in-out hover:scale-102 hover:cursor-default hover:shadow-xl">
            <a href={article.link} target="_blank" className="article__button">
              <h3 className="mb-1 text-lg font-bold">
              {article.title}
              </h3>
              <hr className="my-2"/>
              <span className="text-slate-600 py-1 text-xs dark:text-white">
                {formattedDate}
              </span>
            {/* <p className="w-full leading-tight" dangerouslySetInnerHTML={{ __html: content }}></p> */}
            </a>
          </div>
      </div>
    );
  }
  
  export default ArticleItems;