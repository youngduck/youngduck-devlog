import { NOTION_API_ERROR_MESSAGES } from "@/app/api/scrap/constants/error/error-messages";

interface NotionProperty {
  title: {
    title: {
      plain_text: string;
    }[];
  };
  tags: {
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

export interface IScrapItem {
  id: number;
  name: string;
  tags: string[];
  link: string;
}

export async function getAllScrapList() {
  try {
    if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
      throw new Error("Configuration error: Missing environment variables");
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {
        cache: "no-store",
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

    const responseData: {
      results: {
        properties: NotionProperty;
      }[];
    } = await response.json();
    const mappedResults: IScrapItem[] = responseData.results
      .map((item) => item.properties)
      .map((item, index) => ({
        id: index,
        name: item.title?.title?.[0]?.plain_text ?? "",
        tags: item.tags?.multi_select?.map((tag) => tag.name) ?? [],
        link: item.link?.rich_text?.[0]?.plain_text ?? "",
      }));

    return mappedResults;
  } catch (error) {
    return [];
  }
}
