import { Octokit } from "https://esm.sh/@octokit/core";
import { BASE_URL } from "./baseURL";

const octokit = new Octokit({
  auth: "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",
});

export const getIssues = () => {
  (async () =>
    await octokit.request(
      `GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    ))();
};

// export const getOpenIssues = () => {
//   (async () =>
//     await octokit
//       .request(`GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues`, {
//         headers: {
//           "X-GitHub-Api-Version": "2022-11-28",
//         },
//       })
//       .then((res) => {
//         const openIssues = res.data.filter((issue) => issue.state === "open");

//         return openIssues;
//       }))();
// };

export const getOpenIssues = async () => {
  try {
    const response = await octokit.request(
      `GET /repos/${BASE_URL.organization}/${BASE_URL.repo}/issues`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const openIssues = response.data.filter((issue) => issue.state === "open");

    return openIssues;
  } catch (e) {
    console.log(e);
  }
};
