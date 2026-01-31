export const CheckBox = ({ item, onToggle }) => {
  return (
    <div className="checkbox-container">
      <label>
        <input type="checkbox" checked={item.isChecked} onChange={() => onToggle(item.id)} />
        {item.label}
      </label>

      <div className="checkbox-children">
        {item.children &&
          item.children.map((child) => {
            return <CheckBox key={child.id} item={child} onToggle={onToggle} />;
          })}
      </div>
    </div>
  );
};
