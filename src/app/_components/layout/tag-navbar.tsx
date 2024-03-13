interface SS {
  categories: [string, number][];
}

const TagNavbar: React.FC<SS> = ({ categories }) => {
  return (
    <nav className="block lg:w-[960px] w-full p-7">
      <ul className="flex">
        {categories.map((item: [string, number], idx: number) => (
          <li key={idx} className="mx-2">
            <span># {item[0]}</span>
            <span className="text-xs">({item[1]})</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TagNavbar;
