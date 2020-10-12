
import List from "./components/common/List.jsx";
import Header from "./components/main/Header.jsx";

const GlobalStyle = styled.createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap");
  body {
    background-color: lightblue;
    font-family: "Work Sans", sans-serif;
    margin: 0;
  }
`;
const StyledApp = styled.div``;


export default () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <ReactRouterDOM.BrowserRouter>
        <Header />
        <ReactRouterDOM.Route exact path="/">
          <List />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/a">
          <div>aaaaaaaa</div>
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/b">
          <div>bbbbbbbbbb</div>
        </ReactRouterDOM.Route>
      </ReactRouterDOM.BrowserRouter>
    </StyledApp>
  );
};
