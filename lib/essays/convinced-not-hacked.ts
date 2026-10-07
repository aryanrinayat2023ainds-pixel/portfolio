/** Full text of "Convinced, Not Hacked" by Aryan Rinayat, as in the published PDF. */
export type Block = { type: "p" | "h2"; text: string };

export const convincedNotHacked: Block[] = [
  {
    type: "p",
    text: "Picture an ordinary evening. A call comes in from a number that looks almost like a bank's. The voice is calm, procedural, slightly bored — the tone of someone who handles a hundred cases a day. Your account, it says, has been linked to a parcel containing contraband, intercepted at an airport. There is a case number. There is a warrant, or something that looks like one, visible for a second on a video call where a man in a uniform sits behind a desk with a national emblem. He does not shout. He does not need to. He simply explains, patiently, that the matter can be resolved today if you cooperate — and cooperation means moving your savings into a \"verification account\" until the investigation clears your name. By the time the call ends, whether or not money has moved, something has already happened: a citizen with a stable job and reasonable intelligence has spent forty minutes governed entirely by fear.",
  },
  {
    type: "p",
    text: "This is not a hypothetical reserved for the gullible. Versions of this script, known as \"digital arrest,\" defrauded Indians of more than Rs 1,935 crore in 2024 alone, per government data placed before Parliament. The technology used was ordinary: a phone, a screen-share, a uniform bought online. What did the real work was something far older than the internet.",
  },
  { type: "h2", text: "The New Face of an Old Crime" },
  {
    type: "p",
    text: "Financial fraud in India has outgrown the stereotype of a stranger asking for an OTP. The National Cyber Crime Reporting Portal recorded more than 36 lakh financial fraud complaints in 2024, up sharply from roughly 24 lakh the year before, and citizens reported losses exceeding Rs 22,845 crore, nearly three times the previous year's figure. The methods have diversified accordingly: UPI \"collect requests\" disguised as refunds, QR codes pasted over legitimate ones at small shops, fake trading groups promising guaranteed returns, task-based job scams that start with a small real payout before demanding deposits, and impersonation of couriers, electricity boards, or telecom operators threatening disconnection. Each scheme looks different. Each shares the same architecture: create a problem, manufacture urgency, offer a way out that happens to require money or access.",
  },
  { type: "h2", text: "The Real Target Is Not the Device" },
  {
    type: "p",
    text: "It is tempting to treat these as technical failures — a weak password, an unpatched app, a careless click. But most victims are not out-hacked; they are out-reasoned, by a script engineered against specific cognitive habits. Authority triggers compliance, which is why uniforms and official seals appear so often. Scarcity and greed work together in investment scams, where a small early \"profit\" buys trust before the real request arrives. Fear compresses time, and compressed time is where judgment fails — a victim mid-panic is not weighing probabilities, they are trying to make the fear stop. None of this requires breaching a firewall. It requires a stranger to borrow, for fifteen minutes, control over how someone thinks. The device is never broken into; it is handed over, willingly, by a mind that has been cornered.",
  },
  { type: "h2", text: "When the Scammer Has an Assistant" },
  {
    type: "p",
    text: "Generative AI has not invented social engineering, but it has given it better tools. Voice-cloning can reproduce a familiar voice from a few seconds of audio lifted off social media, enabling calls that claim to be from a relative in trouble. Deepfake video adds a face to a fabricated emergency. Language models let a fraud operation personalise thousands of messages at once, matching tone and context instead of one clumsy template for everyone. The asymmetry is real: attackers need one successful script; defenders must close every gap. Yet the same technology cuts both ways. Banks and fintech platforms increasingly use behavioural and transaction-pattern analysis to flag accounts suddenly receiving and forwarding unusual sums, precisely the signature of a mule account, and intervene before the money completes its journey rather than after. AI is not the villain of this story or its hero; it is a force multiplier for whichever side moves first.",
  },
  { type: "h2", text: "A Trust Deficit Inside a Digital Boom" },
  {
    type: "p",
    text: "None of this sits apart from India's wider digital story. UPI alone processes billions of transactions every month, and that convenience is exactly what fraud now exploits — a payment rail built for speed is, by design, less friendly to hesitation. The gap worth naming is not a technology gap; it is a trust gap. Millions of new users have been onboarded onto digital finance faster than they have been equipped with instincts for it. The 1930 cybercrime helpline and the National Cyber Crime Reporting Portal exist as safety nets, and coordinated action by the Indian Cyber Crime Coordination Centre helped freeze or save thousands of crores in 2024, proof that fast reporting changes outcomes. But a safety net recovers losses after the fact; it cannot replace the decision a person needed to make thirty seconds earlier.",
  },
  { type: "h2", text: "Beyond \"Don't Share Your OTP\"" },
  {
    type: "p",
    text: "Awareness campaigns have spent years teaching people what not to click. That advice is necessary but no longer sufficient, because the newer scams do not ask victims to click anything; they ask them to transfer, willingly, under duress. Individuals need less a checklist and more a reflex: when a call manufactures urgency, the correct first move is to hang up and verify independently, through a number looked up yourself, never one the caller provides. Banks and fintech firms can extend this instinct with deliberate friction, such as short cooling-off windows on large or unusual transfers, treating delay as a feature rather than a failure. Educational institutions can run realistic scam simulations instead of lectures, so the reflex is rehearsed long before it is needed. None of this requires new infrastructure. It requires treating fraud prevention as a design problem in human decision-making, not only a technical one.",
  },
  {
    type: "p",
    text: "The next fraudulent call will not sound like a hacker. It will sound like help. India can keep building stronger digital locks, but a lock only matters if the person holding the key knows when someone is trying to talk them into opening the door themselves.",
  },
];
