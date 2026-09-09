/** 강점 등 불릿 리스트 */
export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-neutral-800">
          <span className="mt-[2px] text-neutral-400">▪</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
