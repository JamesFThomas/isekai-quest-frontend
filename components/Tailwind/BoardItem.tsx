const itemStyle = 'flex justify-center items-center bg-blue-500 rounded-xl';
const ItemTextStyle = 'text-3xl';

export default function BoardItem() {
  return (
    <div className={itemStyle}>
      <h1 className={ItemTextStyle}>Board Item</h1>
    </div>
  );
}
