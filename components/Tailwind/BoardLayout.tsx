import BoardItem from './BoardItem';
const gridStyle =
  'grid px-12 py-12 md:grid-cols-2 auto-rows-[200px] md:auto-rows-[400px] gap-8';

export default function BoardLayout() {
  return (
    <div className={gridStyle}>
      <BoardItem />
      <BoardItem />
      <BoardItem />
      <BoardItem />
    </div>
  );
}
