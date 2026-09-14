// Public-facing configuration only. Never place API secrets here.
export const site = {
  name: 'Zicotix',
  email: 'zicotixai@protonmail.com',
  url: 'https://ttvzicotix.github.io',
  // FormSubmit verifies the destination inbox on first use.
  formEndpoint: 'https://formsubmit.co/ajax/zicotixai@protonmail.com',
  // Enable only after Andrew confirms the activation and receives a test message.
  contactDeliveryVerified: false,
  shopUrl: null,
}
export const socials = [
  { name: 'GitHub', handle: 'ttvzicotix', url: 'https://github.com/ttvzicotix', source: 'connected repository owner' },
  { name: 'TikTok', handle: '@zicotixai', url: 'https://www.tiktok.com/@zicotixai', source: 'owner-reported handle; not independently verified' },
  { name: 'YouTube', handle: '@Zicotix', url: 'https://www.youtube.com/@Zicotix', source: 'Public channel metadata: UCDU_CBpnuxuvTqcf0FKrPmg; Zicotix title, Gaming keywords and montage history match owner description' },
  { name: 'Instagram', handle: '@zicotixai', url: 'https://www.instagram.com/zicotixai/', source: 'Provisional: first handle supplied by owner; owner also mentioned zicotix. Instagram lookup rate-limited; owner confirmation pending', confirmed: false },
]
export const projectDetails = {
  aegis: {
    name: 'Aegis', status: 'Private platform · in development', category: 'Governed personal intelligence',
    introduction: 'An assistant should understand the work, explain its reasoning, and know when to ask before acting. That is the idea behind Aegis.',
    overview: 'Aegis is a personal-intelligence platform being developed to bring projects, context, model access, and tools into one coordinated experience. The goal is useful assistance with explicit boundaries—not an agent with unrestricted access to your digital life.',
    features: [
      ['Context with provenance', 'Connect a recommendation to the information behind it, keep uncertainty visible, and make corrections possible.'],
      ['Local-first direction', 'Use local models where practical, with optional cloud providers for tasks that justify the cost and data sharing. Provider availability depends on the deployment.'],
      ['Human authority', 'Separate drafting, recommending, and acting. Sensitive external actions require the appropriate approval.'],
    ],
    workflow: [
      ['Understand', 'Start with the goal, relevant context, and the limits of the request.'],
      ['Evaluate', 'Compare options, identify missing information, and choose a suitable reasoning path.'],
      ['Recommend', 'Return a proposal with evidence, uncertainty, and expected consequences.'],
      ['Approve & review', 'Request approval where needed, then record what actually happened rather than assume success.'],
    ],
    example: '“Help me plan this project. What is blocking progress, what information is missing, and what should I do next?”',
    exampleNote: 'Illustrative workflow, not a live agent session or a promise that every integration is available.',
    boundaries: 'Aegis is an ongoing private project, not a generally available hosted service. This portfolio does not connect to its tools, private memory, or accounts. Model selection does not grant action permissions.',
    roadmap: ['Native provider gateway and clearer model selection', 'Voice and cross-device workflows', 'Approved integrations and public-data exploration'],
    tech: ['Python', 'React', 'Local / cloud models', 'Typed tools', 'Audit-oriented design'],
    link: null,
  },
  optima: {
    name: 'Optima', status: 'Research prototype · foundation stage', category: 'Optimization & decision support',
    introduction: '“Best” depends on what you are optimizing. Optima makes the objective, constraints, and tradeoffs visible.',
    overview: 'Optima explores visual operations research: turning structured inputs into understandable alternatives. Its first focus is facility location—where to put a service or facility when travel distance, demand, and coverage matter.',
    features: [
      ['Define the objective', 'Compare weighted total distance, worst-case distance, and coverage within a service threshold. Those objectives can lead to different locations.'],
      ['Make constraints explicit', 'Treat demand, candidate sites, and operating limits as inputs to the decision—not details hidden inside a chat response.'],
      ['Explain the recommendation', 'Show why one scenario is preferred and what changes when assumptions change.'],
    ],
    workflow: [
      ['Describe the problem', 'Specify demand points, candidate locations, and the question you need to answer.'],
      ['Choose an objective', 'Decide whether the priority is average travel, worst-case access, or service coverage.'],
      ['Compare scenarios', 'Evaluate feasible alternatives and examine sensitivity to the inputs.'],
      ['Make the decision', 'Use the results as decision support, with assumptions and limitations visible.'],
    ],
    example: '“Where should a new service center go: the lowest average travel distance, the smallest worst-case trip, or the greatest coverage?”',
    exampleNote: 'Illustrative facility-location scenario; no customer dataset is exposed on this site.',
    boundaries: 'The public lab is at foundation stage. The private core is separate; this site is not a hosted solver. Broader scheduling and routing modules are future directions, not finished features.',
    roadmap: ['Facility-location comparisons and visual explanations', 'Reproducible public examples using synthetic data', 'Future layout, routing, allocation, and scheduling modules'],
    tech: ['Operations research', 'Optimization models', 'Scenario analysis', 'Geospatial interfaces'],
    link: { label: 'Explore the public lab', url: 'https://github.com/ttvzicotix/Optima-Public' },
  },
}
