const GlobalStyle = styled.createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap");
  body {
    background-color: lightblue;
    font-family: "Work Sans", sans-serif;
    margin: 0;
  }
`;
import common from "./common.js";
const App = () => {
  const StyledApp = styled.div``;
  const [items, setItems] = React.useState([]);
  let newItem = "";

  const getData = async () =>
    setItems(
      await (await fetch(`http://${window.location.hostname}:${common.port}`)).json()
    );

  const addItem = async () => {
    await (
      await fetch(`http://${window.location.hostname}:${common.port}`, {
        method: "POST",
        body: JSON.stringify({ title: newItem, done: false }),
      })
    ).json();
    await getData();
  };

  const deleteItem = (index) => async () => {
    await (
      await fetch(`http://${window.location.hostname}:${common.port}/${index}`, {
        method: "DELETE",
      })
    ).json();
    await getData();
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <StyledApp>
      <GlobalStyle />
      <ReactRouterDOM.BrowserRouter>
        <ul>
          <li>
            <ReactRouterDOM.Link to="/">TO HOME</ReactRouterDOM.Link>
          </li>
          <li>
            <ReactRouterDOM.Link to="/a">TO A</ReactRouterDOM.Link>
          </li>
          <li>
            <ReactRouterDOM.Link to="/b">TO B</ReactRouterDOM.Link>
          </li>
        </ul>
        <ReactRouterDOM.Route exact path="/">
          <div>home</div>
        </ReactRouterDOM.Route>

        <ReactRouterDOM.Route exact path="/a">
          <div>aaaaaaaa</div>
        </ReactRouterDOM.Route>

        <ReactRouterDOM.Route exact path="/b">
          <div>bbbbbbbbbb</div>
        </ReactRouterDOM.Route>
      </ReactRouterDOM.BrowserRouter>
      {items.map((item, i) => (
        <div key={i}>
          {item.title} <input type="button" value="X" onClick={deleteItem(i)} />
        </div>
      ))}
      <span>Add new item:</span>{" "}
      <input
        type="text"
        onChange={(e) => {
          newItem = e.target.value;
        }}
      />
      <input onClick={addItem} type="button" value="Add" />
    </StyledApp>
  );
};
export default App;
