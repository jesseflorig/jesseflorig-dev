import React from "react"
import ReadTime from "./ReadTime"

export default function Meta({ date, readTime }) {
  return (
    <>
      {date}
      <span style={{ marginLeft: `1.2em` }}>
        <ReadTime minutes={readTime} />
      </span>
    </>
  )
}
