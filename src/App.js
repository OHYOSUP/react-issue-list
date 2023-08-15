import { Route, Routes } from "react-router";
import Header from "./component/Header";
import styled from "styled-components";
import { getOpenIssues } from "./api/github";
import { useEffect, useState } from "react";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";

function App() {
  const [issue, setIssue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const openIssueData = await getOpenIssues();
        setIssue(openIssueData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Issues />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
      </Routes>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

export default App;
