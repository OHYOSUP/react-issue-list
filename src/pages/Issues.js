import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/baseURL";
import { Octokit } from "https://esm.sh/@octokit/core";
import styled from "styled-components";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import IssueSummary from "../component/IssueSummary";

function IssueList() {
  const [openIssueList, setOpenIssueList] = useState([]);
  const octokit = new Octokit({
    auth: "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",
  });

  useEffect(() => {
    const getOpenIssues = async () => {
      await octokit
        .request(
          `GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        )
        .then((res) => {
          setOpenIssueList(res.data);
        });
    };
    getOpenIssues();
  }, [setOpenIssueList]);

  console.log(openIssueList);
  return (
    <IssueListWrapper>
      <ul>
        {openIssueList
          .sort((a, b) => b.comments - a.comments)
          .map((issue, index) => (
            <>
              {index % 5 === 0 && index !== 0 ?(
                <a href="https://www.wanted.co.kr">
                  <S_AdItem>
                    <img
                      src={`https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100`}
                      alt="ad"
                    />
                  </S_AdItem>
                </a>
              ) : null}
              <IssueSummary key={issue.id} issue={issue} />
            </>
          ))}
      </ul>
    </IssueListWrapper>
  );
}
const S_AdItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 57.5px;
  padding: 20px 0 20px 0;
  img {
    height: 100%;
  }
`;
const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const IssueListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const IssueCard = styled.li`
  max-width: 500px;
  border-bottom: 1px solid #000;
  list-style: none;
  display: flex;
  text-align: start;
  padding: 20px;
  margin-bottom: 10px;
`;

const IssueCardDetail = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
`;

const IssueNumTitle = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CommentWrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default IssueList;
