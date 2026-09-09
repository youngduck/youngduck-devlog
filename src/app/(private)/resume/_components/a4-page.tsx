/**
 * A4 한 장. 내부 595px 캔버스가 A4(210mm)에 정확히 스케일된다.
 * 피그마 px 값을 캔버스 안에서 그대로 쓰면 픽셀 정확도가 유지된다.
 *
 * <A4Page>                          // 세로(기본)
 * <A4Page orientation="landscape">  // 가로
 */
export default function A4Page({
  children,
  orientation = "portrait",
}: {
  children: React.ReactNode;
  orientation?: "portrait" | "landscape";
}) {
  return (
    <div className={`a4 ${orientation === "landscape" ? "a4--landscape" : ""}`}>
      <div className="a4-canvas">{children}</div>
    </div>
  );
}
