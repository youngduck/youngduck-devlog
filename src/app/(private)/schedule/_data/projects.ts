/**
 * 프로젝트 키(= GitHub 저장소 이름 = Notion `프로젝트` 선택지) → 화면 표시용 한글 이름·로고.
 * 여기 없는 프로젝트는 키를 그대로 보여준다.
 */
export interface ProjectMeta {
  label: string;
  logo: string;
}

export const PROJECT_META: Record<string, ProjectMeta> = {
  "youngduck-devlog": { label: "기술블로그", logo: "/assets/resume/logos/side-yd-tech.svg" },
  "yd-ui": { label: "YD-UI", logo: "/assets/resume/logos/side-yd-ui.png" },
  "bdks-fe": { label: "보돌코 스코어드", logo: "/assets/resume/logos/side-bodolco.png" },
  "leetcode-study": { label: "리트코드", logo: "/assets/schedule/links/leetcode.svg" },
};
