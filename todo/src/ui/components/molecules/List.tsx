import tw from "tailwind-styled-components";

const ListView = tw.ul`
  flex flex-col gap-3
`;

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ListView>
      {items?.map((item, index) => <li key={index}>{renderItem(item)}</li>)}
    </ListView>
  );
}
