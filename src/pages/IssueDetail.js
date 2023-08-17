import React, { useEffect, useState } from "react";
import { getOpenIssues } from "../api/github";
import { useParams } from "react-router";
import * as dayjs from "dayjs";
import styled from "styled-components";

function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const openIssueData = await getOpenIssues();
        const issueDetail = openIssueData.find(
          (issue) => issue.id === Number(id)
        );
        setIssue(issueDetail);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, setIssue]);

  return (
    <IssueDetailWrapper>
      <IssueCard>
        <IssueCardDetail>
          <ImageWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-1 h-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </ImageWrapper>
          <IssueNumTitle>
            <strong>
              #{issue?.number} {issue?.title}
            </strong>
            <span>
              작성자: {issue?.user.login}, 작성일:{" "}
              {dayjs(`${issue?.created_at}`).format("YYYY-MM-DD")}
            </span>
          </IssueNumTitle>
          <CommentWrapper>
            <span>코멘트: {issue?.comments}</span>
          </CommentWrapper>
        </IssueCardDetail>
      </IssueCard>
      <BodyWrapper>
        <span>{issue?.body}</span>
      </BodyWrapper>
    </IssueDetailWrapper>
  );
}
const IssueDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BodyWrapper = styled.div`
  max-width: 500px;
  line-height: 25px;
`;
const ImageWrapper = styled.div`
  width: 50px;
`;

const IssueCard = styled.li`
  border-bottom: 1px solid #000;
  list-style: none;
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

export default IssueDetail;
