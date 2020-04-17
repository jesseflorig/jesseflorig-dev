// Given a number of minutes, return a reading time string
export function formatReadingTime(minutes) {
  const readLabel = `${minutes} min read`
  const cups = Math.round(minutes / 5)
  if (cups > 5) {
    return `${new Array(Math.round(cups / 5)).fill("🥃").join("")} ${readLabel}`
  } else {
    return `${new Array(cups || 1).fill("☕️").join("")} ${readLabel}`
  }
}
