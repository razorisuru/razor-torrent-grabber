export const parseTorrentRSS = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    return Array.from(items).map((item) => {
      const title = item.querySelector("title")?.textContent || "Unknown Title";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      
      // Extract size and category from description if possible
      // Description format: <![CDATA[ Title<br>Size<br>Category<br>Hash ]]>
      let size = "Unknown";
      let category = "Unknown";
      let hash = "";

      if (description) {
        const parts = description.split("<br>");
        if (parts.length >= 4) {
          size = parts[1].trim();
          category = parts[2].trim();
          hash = parts[3].replace("]]>", "").trim();
        }
      }

      return {
        title,
        link,
        pubDate,
        size,
        category,
        hash,
      };
    });
  } catch (error) {
    console.error("Error parsing XML:", error);
    return [];
  }
};
