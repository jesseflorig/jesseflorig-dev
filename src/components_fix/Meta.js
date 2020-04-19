import React from "react"
import { formatReadingTime } from "../utils/formatUtils"

export default function Meta({ date, readTime }) {
  return (
    <>
      {date}
      <span style={{ marginLeft: `1.2em` }}>{formatReadingTime(readTime)}</span>
    </>
  )
}
