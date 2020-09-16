import { cosmicSync, config } from "@anandchowdhary/cosmic";
import axios from "axios";

cosmicSync("pipedrive-slack");

const api = axios.create({ baseURL: config<string>("pipedriveBaseUrl") });

/** Send a message to a Slack channel */
export const sendSlackMessage = async (channel: string, text: string) =>
  axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel,
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${config<string>("slackBotAccessToken")}`,
      },
    }
  );

export const getLead = async (id: string) => {
  return (
    await api.get(`/deals/${id}?api_token=${config<string>("pipedriveApiKey")}`)
  ).data as any;
};
