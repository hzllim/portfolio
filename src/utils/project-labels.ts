const categoryLabels: Record<string, string> = {
  branding: "Branding & Identity",
  "ui-ux": "UI/UX Design",
  photography: "Photography",
  "web-design": "Web Design",
  "graphic-design": "Graphic Design",
  other: "Other",
};

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}
