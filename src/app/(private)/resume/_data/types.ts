/** 이력서 콘텐츠 타입. 디자인(블록)과 완전히 분리된 순수 데이터. */

export interface ProfileRow {
  label: string;
  value: string;
  href?: string;
}

export interface PostingRow {
  topic: string;
  title: string;
  href: string;
}

export interface CareerRow {
  company: string;
  role: string;
  period: string;
}

export interface SimpleRow {
  name: string;
  desc: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

/** 성과 항목: 번호 제목 + 문제/해결/결과 등 서브라인 */
export interface WorkAchievement {
  title: string;
  lines: string[];
}

export interface WorkEntry {
  company: string;
  role: string;
  period: string;
  achievements: WorkAchievement[];
}

export interface ResumeData {
  name: string;
  headline: string;
  strongPoints: string[];
  profile: ProfileRow[];
  career: CareerRow[];
  certificates: { name: string; date: string }[];
  skills: SkillGroup[];
  sideProjects: SimpleRow[];
  activities: { name: string; type: string; desc: string; period: string }[];
  postings: PostingRow[];
  intro: string;
  experiences: WorkEntry[];
}
