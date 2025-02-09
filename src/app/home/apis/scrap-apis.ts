import { NOTION_API_ERROR_MESSAGES } from "@/app/shared/constants/error/error-messages";

interface NotionProperty {
  이름: {
    title: {
      plain_text: string;
    }[];
  };
  "다중 선택": {
    multi_select: {
      name: string;
    }[];
  };
  link: {
    rich_text: {
      plain_text: string;
    }[];
  };
}

interface ScrapItem {
  name: string;
  tags: string[];
  link: string;
}

export async function getAllScrapList() {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NEXT_PUBLIC_NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_TOKEN}`,
        },
        body: JSON.stringify({ page_size: 100 }),
      },
    );

    if (!response.ok) {
      throw new Error(NOTION_API_ERROR_MESSAGES.FETCH_FAILED);
    }

    const responseData: {
      results: {
        properties: NotionProperty;
      }[];
    } = await response.json();

    const mappedResults: ScrapItem[] = responseData.results
      .map((item) => item.properties)
      .map((item) => ({
        name: item["이름"]?.title?.[0]?.plain_text ?? "",
        tags: item["다중 선택"]?.multi_select?.map((tag) => tag.name) ?? [],
        link: item.link?.rich_text?.[0]?.plain_text ?? "",
      }));

    return mappedResults;
  } catch (error) {
    console.error(NOTION_API_ERROR_MESSAGES.NETWORK_ERROR, error);
    return [];
  }
}
