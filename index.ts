import { cosmicSync, config } from "@anandchowdhary/cosmic";
import axios from "axios";

cosmicSync("pipedrive-slack");

/** Send a message to a Slack channel */
export const sendSlackMessage = async (channel: string, text: string) =>
  axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: "C016A9X32KG",
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${config("slackBotAccessToken")}`,
      },
    }
  );

const data: Array<[string, string, string]> = [
  ["C01AALHGMFV", "day after tomorrow, September 18", "Monday, September 21"],
  ["C01AP42DYF3", "day after tomorrow, September 18", "Monday, September 21"],
  ["C019M6YHJ3D", "Saturday, September 19", "Tuesday, September 22"],
  ["C01931TD1P1", "Tuesday, September 22", "Thursday, September 24"],
  ["C01ACAPEMMH", "Saturday, September 26", "Tuesday, September 29"],
  ["C019X1MF1DL", "Tuesday, September 29", "Sunday, October 4"],
];
const send = async () => {
  for await (const item of data) {
    await sendSlackMessage(
      item[0],
      `Quick reminder, the deadline for this concept's briefing is *${item[1]}*, including decor and composition. The deadline for final renders is ${item[2]}.`
    );
    console.log("Sent message to", item[0]);
  }
};
send();
