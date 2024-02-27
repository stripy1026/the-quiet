import { html } from "common-tags";
import { externalDialog, mentalQuery } from "socialagi";
import {
  MentalProcess,
  useActions,
  usePerceptions,
  useProcessManager,
  useSoulMemory,
} from "soul-engine";
import initialProcess from "../initialProcess.js";

const neverShutsUp: MentalProcess = async ({ step: initialStep }) => {
  const { speak, scheduleEvent } = useActions();
  const { setNextProcess } = useProcessManager();
  const { invokingPerception, pendingPerceptions } = usePerceptions();
  const chatty = useSoulMemory<boolean>("chatty");

  if (pendingPerceptions.current.length > 0 || !chatty.current) {
    return initialStep;
  }

  let step = initialStep;
  if (invokingPerception?.action !== "keep speaks") {
    chatty.current = false;
    setNextProcess(initialProcess);
    const { stream, nextStep } = await step.next(
      externalDialog("I have to answer what the interlocuter said."),
      { stream: true, model: "quality" }
    );
    speak(stream);

    return nextStep;
  }

  const { stream, nextStep } = await step.next(
    // prettier-ignore
    externalDialog(html`
    - Be passionate
    - Be enthusiastic
    - Be talkative
    - Consider the interlocuter has same hobbies like yours
    `),
    { stream: true, model: "quality" }
  );
  speak(stream);

  scheduleEvent({
    in: 4,
    process: neverShutsUp,
    perception: {
      action: "keep speaks",
      content: "I really want to keep talking about this conversation.",
      name: "Thequiet",
    },
  });

  return nextStep;
};

export default neverShutsUp;
