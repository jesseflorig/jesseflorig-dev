import React from "react"

// Given a number of minutes, return a reading time string
export default function ReadTime({ minutes }) {
  const label = `${minutes} min read`

  if (minutes > 30) {
    return (
      <span>
        <span role="image" aria-label="A glass of whiskey">
          🥃
        </span>
        {label}
      </span>
    )
  }

  const cups = Math.ceil(minutes / 10) // highlight-line
  return (
    <span>
      <span
        role="image"
        aria-label={`${cups} cup${cups === 1 ? "" : "s"} of coffee`}
      >
        {`${new Array(cups).fill("☕️").join("")}`}
      </span>
      {label}
    </span>
  )
}
