import { NOTION_API_ERROR_MESSAGES } from "@/app/shared/constants/error/error-messages";

export async function getAllScrapList() {
  try {
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

    if (!response.ok) {
      throw new Error(NOTION_API_ERROR_MESSAGES.FETCH_FAILED);
    }

    const responseData = await response.json();
    console.log(responseData.results[0].properties, "responseData");
    console.log(
      responseData.results
        ?.map((item: any) => item.properties)
        ?.map((item: any) => ({
          name: item?.title?.title?.[0]?.plain_text || "",
          tags:
            item?.["다중 선택"]?.multi_select?.map((tag: any) => tag.name) ||
            [],
          link: item?.link?.rich_text?.[0]?.plain_text || "",
        })) || [],
      "responseData.results",
    );
    return (
      responseData.results
        ?.map((item: any) => item.properties)
        ?.map((item: any) => ({
          name: item?.title?.title?.[0]?.plain_text || "",
          tags:
            item?.["다중 선택"]?.multi_select?.map((tag: any) => tag.name) ||
            [],
          link: item?.link?.rich_text?.[0]?.plain_text || "",
        })) || []
    );
  } catch (error) {
    console.error(NOTION_API_ERROR_MESSAGES.NETWORK_ERROR, error);
    return [];
  }
}
