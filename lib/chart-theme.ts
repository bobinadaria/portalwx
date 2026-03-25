// Chart token constants for ECharts (canvas cannot read CSS custom properties)
// All hex values mirror the DS tokens defined in globals.css

export const DS = {
  signature: "#6382D5",
  d1: "#3F5BA7",
  d2: "#4D6EC7",
  l1: "#B8C2DE",
  l2: "#F5F6FA",
  success: "#28af61",
  warning: "#f2cd4a",
  error: "#eb5757",
  info: "#2d9cdb",
  ink1: "#373f51",
  ink2: "#616c84",
  muted: "#a3acc2",
  border: "#ebedf3",
  raised: "#ffffff",
} as const;

export const TOOLTIP = {
  backgroundColor: DS.raised,
  borderColor: DS.border,
  textStyle: { color: DS.ink1, fontSize: 11 },
  padding: [6, 10] as [number, number],
  extraCssText: "box-shadow:0 2px 12px rgba(27,34,50,0.09);",
};

export const AXIS_LABEL = { color: DS.muted, fontSize: 10 };

export const SPLIT_LINE = { lineStyle: { color: DS.border } };
