
export default function daysSinceToday(createdDay: string) {
  const today = Date.parse(new Date().toISOString());
  const created = Date.parse(createdDay);

  return Math.round(Math.abs(today - created) / 8.64e7);
}