import http from "./httpServices";
import { apiEndpoint, localEndpoint, remoteEndpoint } from "../config.json";
const remoteEnpointWithSession = remoteEndpoint + "?sid=" + window.sessionStart.sessionId + "&surveyStyle=" + window.sessionStart.surveyStyle;

export async function getSurvey(session) {
  const survey = await http.get(remoteEnpointWithSession);
  return survey;
}

export async function getNextBlank(formData) {
  const nextBlank = await http.post(remoteEnpointWithSession, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return nextBlank.data
}
