import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../api/baseURL";
import { Octokit } from "https://esm.sh/@octokit/core";
import styled from "styled-components";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import IssueSummary from "../component/IssueSummary";

function IssueList() {
  const [openIssueList, setOpenIssueList] = useState([]);
  const [moreIssueList, setMoreIssueList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isNomore, setIsNomore] = useState(false);

  const octokit = new Octokit({
    auth: "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",
  });

  useEffect(() => {
    const getOpenIssues = async () => {
      await octokit
        .request(
          `GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues?sort=commnets&page=${page}`,
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

  // 다음페이지 로딩

  const bottomLoader = useRef(null);

  const getMoreOpenIssues = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await octokit
        .request(
          `GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues?sort=commnets&page=${pageNumber}`,
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        )
        .then((res) => {
          setOpenIssueList(res.data);
        });
      if (response.data.length === 0) {
        setIsNomore(true);
      }
      setOpenIssueList((prev) => [...prev, ...response.data]);
      console.log(openIssueList)
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleObserver = (entries, observer) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      observer.unobserve(bottomLoader.current);
      if (isNomore) {
        observer.disconnect();
        return;
      }
      getMoreOpenIssues(2);
    }
  };
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (bottomLoader.current) {
      observer.observe(bottomLoader.current);
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      <IssueListWrapper>
        <ul>
          {openIssueList
            .sort((a, b) => b.comments - a.comments)
            .map((issue, index) => (
              <div key={issue.id}>
                {index % 5 === 0 && index !== 0 ? (
                  <a href="https://www.wanted.co.kr">
                    <AdImage>
                      <img
                        src={`https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100`}
                        alt="ad"
                      />
                    </AdImage>
                  </a>
                ) : null}
                <IssueSummary key={issue.id} issue={issue} />
              </div>
            ))}
        </ul>
      </IssueListWrapper>
      <div ref={bottomLoader}></div>
    </>
  );
}
const AdImage = styled.li`
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
