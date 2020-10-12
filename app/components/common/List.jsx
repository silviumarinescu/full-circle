import common from "../../../common.js";
const StyledList = styled.div`
  background: red;
`;

export default () => {
  const [items, setItems] = React.useState([]);
  const [newItem, setNewItem] = React.useState("");

  const getData = async () =>
    setItems(
      await (
        await fetch(`http://${window.location.hostname}:${common.port}`)
      ).json()
    );

  const addItem = async () => {
    await (
      await fetch(`http://${window.location.hostname}:${common.port}`, {
        method: "POST",
        body: JSON.stringify({ title: newItem, done: false }),
      })
    ).json();
    setNewItem("");
    await getData();
  };

  const deleteItem = (index) => async () => {
    await (
      await fetch(
        `http://${window.location.hostname}:${common.port}/${index}`,
        {
          method: "DELETE",
        }
      )
    ).json();
    await getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <StyledList>
      {items.map((item, i) => (
        <div key={i}>
          {item.title} <input type="button" value="X" onClick={deleteItem(i)} />
        </div>
      ))}
      <span>Add new item:</span>{" "}
      <input
        type="text"
        value={newItem}
        onChange={(e) => {
          setNewItem(e.target.value);
        }}
      />
      <input onClick={addItem} type="button" value="Add" />
    </StyledList>
  );
};
