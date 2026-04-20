export const sineversePlans = [
  {
    name: "Studio",
    price: "29",
    period: "per month",
    description: "For solo creators shipping short films and experiments.",
    features: [
      "120 generation credits / month",
      "Up to 3 active projects",
      "HD exports",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Production",
    price: "99",
    period: "per month",
    description: "For teams iterating on longer stories and more scenes.",
    features: [
      "600 generation credits / month",
      "Unlimited projects",
      "4K exports",
      "Priority queue",
      "Shared workspaces",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For studios that need scale, SSO, and dedicated throughput.",
    features: [
      "Volume credits & SLAs",
      "SSO and audit logs",
      "Dedicated support",
      "Custom integrations",
    ],
    highlighted: false,
  },
] as const;
