import React from "react"

// Given a number of minutes, return a reading time string
export function formatReadingTime(minutes) {
  const readingLabel = `${minutes} min read`
  const cups = Math.round(minutes / 5) || 1
  if (cups > 5) {
    const glasses = Math.round(cups / 5)
    return (
      <span
        role="img"
        aria-label={`${glasses} glass${glasses === 1 ? "" : "es"} of whiskey`}
      >
        {`${new Array(glasses).fill("🥃").join("")} ${readingLabel}`}
      </span>
    )
  } else {
    return (
      <span
        role="img"
        aria-label={`${cups} cup${cups === 1 ? "" : "s"} of coffee`}
      >
        {`${new Array(cups).fill("☕️").join("")} ${readingLabel}`}
      </span>
    )
  }
}
