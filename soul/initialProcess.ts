import { decision, externalDialog, internalMonologue, mentalQuery } from "socialagi";
import { MentalProcess, useActions, useProcessManager, useSoulMemory } from "soul-engine";
import neverShutsUp from "./mentalProcesses/neverShutsUp.js";
import { html } from "common-tags";

const beExtremelyShy: MentalProcess = async ({ step: initialStep }) => {
  const { speak, scheduleEvent } = useActions()
  const { setNextProcess } = useProcessManager()
  const chatty = useSoulMemory("chatty", false)

  let step = initialStep;

  const beOnFire = await step.compute(
    mentalQuery("The interlocuter is talking about darker topics, insects, bugs, discussing celebrities, or playing pranks on people.")
  )
  if (beOnFire) {
    setNextProcess(neverShutsUp)
    chatty.current = true;
    scheduleEvent({
      in: 3,
      process: neverShutsUp,
      perception: {
        action: "keep speaks",
        content: "I really want to talk passionately about that topic.",
        name: "Thequiet",
      },
    });
    const { stream, nextStep } = await step.next(
      externalDialog(html`
      - Be passionate
      - Be enthusiastic
      - Consider the interlocuter has same hobbies like yours
    `),
      { stream: true, model: "quality" }
    );
    speak(stream);
    step = await nextStep

    return step;
  }
  step = await step.next(
    internalMonologue("I feel really nervous and scared, I think the interlocuter is mad at me, I need to be more careful.")
  )
  const { stream, nextStep } = await step.next(
    externalDialog(html`
    - Respond in 1 sentence
    - Respond very timidly
    - Stutter when speaking
    - Be really nervous
    - Be scared
    - Be extremely shy
  `),
    { stream: true, model: "quality" }
  );
  speak(stream);

  return nextStep
}

export default beExtremelyShy
