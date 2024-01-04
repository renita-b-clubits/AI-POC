import {
  EmailClient,
  EmailMessage,
  KnownEmailSendStatus,
} from "@azure/communication-email";
import envVariables from "../environment/variables";

const connectionString = `endpoint=${envVariables.AZURE_EMAIL_SERVICE_ENDPOINT};accesskey=${envVariables.AZURE_EMAIL_SERVICE_ACCESS_KEY}`;

const emailClient = new EmailClient(connectionString);

export const senderAddress = envVariables.AZURE_EMAIL_SERVICE_SENDER_ADDRESS;

export const sendEmail = async (message: EmailMessage) => {
  const poller = await emailClient.beginSend(message);

  if (!poller.getOperationState().isStarted) {
    throw new Error("Poller was not started.");
  }

  let timeElapsed = 0;

  while (!poller.isDone()) {
    poller.poll();

    console.log("Email send polling in progress");

    await new Promise((resolve) => setTimeout(resolve, 10000));
    timeElapsed += 10;

    if (timeElapsed > 180) {
      throw new Error("Polling timed out.");
    }
  }

  if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
    console.log(
      `Successfully sent the email (operation id: ${poller.getResult()?.id})`
    );
  } else {
    throw new Error(poller.getResult()?.error?.message);
  }
};
