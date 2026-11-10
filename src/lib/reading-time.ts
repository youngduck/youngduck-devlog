/**
 * 마크다운 본문으로 예상 읽기 시간(분)을 계산한다.
 * 한글은 글자 수, 영어는 단어 수, 코드 블록은 줄 수 기준으로 합산한다.
 */
const KO_CHARS_PER_MIN = 500;
const EN_WORDS_PER_MIN = 200;
const CODE_LINES_PER_MIN = 30;

const CODE_BLOCK = /```[\s\S]*?```/g;

export function getReadingMinutes(markdown: string) {
  const codeLines = (markdown.match(CODE_BLOCK) ?? []).reduce(
    (lines, block) => lines + block.split("\n").length,
    0,
  );

  const text = markdown
    .replace(CODE_BLOCK, "") // 코드 블록
    .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // 링크 → 텍스트
    .replace(/<[^>]+>/g, "") // HTML 태그
    .replace(/[#>*_`~\-|]/g, " "); // 마크다운 기호

  const koChars = (text.match(/[가-힣]/g) ?? []).length;
  const enWords = (text.replace(/[가-힣]/g, " ").match(/[A-Za-z0-9]+/g) ?? [])
    .length;

  const minutes =
    koChars / KO_CHARS_PER_MIN +
    enWords / EN_WORDS_PER_MIN +
    codeLines / CODE_LINES_PER_MIN;

  return Math.max(1, Math.ceil(minutes));
}
