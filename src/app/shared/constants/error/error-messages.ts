export const NOTION_API_ERROR_MESSAGES = {
  FETCH_FAILED: "데이터를 불러오는데 실패했습니다.",
  NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
  UNAUTHORIZED: "인증에 실패했습니다. 토큰을 확인해주세요.",
  DATABASE_NOT_FOUND: "데이터베이스를 찾을 수 없습니다.",
  PARSE_ERROR: "데이터 파싱에 실패했습니다.",
};

// keyof typeof는 TypeScript의 타입 연산자
// typeof NOTION_API_ERROR_MESSAGES: 객체의 타입을 추출
// keyof: 해당 타입의 모든 키값들의 유니온 타입을 생성
// 결과적으로 NotionApiErrorType은 다음과 같은 타입이 됩니다:
// type NotionApiErrorType = "FETCH_FAILED" | "NETWORK_ERROR" | "UNAUTHORIZED" | "DATABASE_NOT_FOUND" | "PARSE_ERROR"
export type NotionApiErrorType = keyof typeof NOTION_API_ERROR_MESSAGES;
