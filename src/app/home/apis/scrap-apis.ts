export async function getAllScrapList() {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      },
      body: JSON.stringify({ page_size: 100 }),
    },
  );
  const responseData = await response.json();

  const targetData = responseData.results
    .map((item: any) => item.properties)
    .map((item: any) => {
      return {
        name: item.이름.title[0]?.plain_text || "",
        tags: item["다중 선택"].multi_select.map((tag: any) => tag.name),
        link: item.link.rich_text[0]?.plain_text || "",
      };
    });

  return targetData;
}
