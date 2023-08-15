import styled from "styled-components";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";

function IssueSummary({issue}) {
  
  return (
    <LinkWrapper to={`/issue/${issue.id}`} key={issue.id}>
      <IssueCard>
        <IssueCardDetail>
          <IssueNumTitle>
            <strong>
              #{issue.number} {issue.title}
            </strong>
            <span>
              작성자: {issue.user.login}, 작성일:{" "}
              {dayjs(`${issue.created_at}`).format("YYYY-MM-DD")}
            </span>
          </IssueNumTitle>
          <CommentWrapper>
            <span>코멘트: {issue.comments}</span>
          </CommentWrapper>
        </IssueCardDetail>
      </IssueCard>
    </LinkWrapper>
  );
}

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: #000;
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

export default IssueSummary;
