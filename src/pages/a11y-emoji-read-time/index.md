---
title: Building an A11y Read Time
date: "2020-03-06"
description: "Let's build an accessible emoji display for post reading times."
---

The `js±<ReadTime />` component for this blog is based on Dan Abromov's [Overreacted.io helper function](https://reactjs.org/docs/context.html) (which this blog borrows heavily from). However, due to our requirements, a component will be better suited as a solution.

First, let's setup a quick component that receives a reading time in minutes and displays a simple label:

```js
const ReadTime = ({minutes}) => {
  return <span>{`${minutes} min read`}</span>
}
```

Now that we have our base component, lets display a cup of coffee for every 10 minutes of read time, rounding up:

```js
const ReadTime = ({minutes}) => {
  const cups = Math.ceil( minutes / 10 ) // highlight-line
  return (
    <span>
      // highlight-start
      <span
        role="img"
        aria-label={`${cups} cup${cups === 1 ? "" : "s"} of coffee`}
      >
        {`${new Array(cups).fill("☕️").join("")}`}
      </span>
      // highlight-end
      {`${minutes} min read`}
    </span>
  )
}
```

Our component calculates the the number of cups, creates an accessible `js±<span />` wrapper for the emojis, and then creates a proper array of coffee cups to display.

We could finish here and be just fine, but what would happen if I ever decided to stay on my soapbox for so long that the label generated six cups of coffee? I don't want to promote bad coffee habits. Let's say after 3 cups (or 30 minutes), we instead show a nice whiskey glass signaling the would-be reader, that this heavy post might be better suited for an evening read with a nice glass of whiskey:

```js
const ReadTime = ({minutes}) => {
  // highlight-start
  const label = `${minutes} min read`

  if(minutes > 30){
    return (
      <span>
        <span role="img" aria-label="A glass of whiskey">
         🥃
        </span>
        {label}
      </span>
    )
  }
  // highlight-end

  const cups = Math.ceil( minutes / 10 ) // highlight-line
  return (
    <span>
      <span
        role="img"
        aria-label={`${cups} cup${cups === 1 ? "" : "s"} of coffee`}
      >
        {`${new Array(cups).fill("☕️").join("")}`}
      </span>
      {label} // highlight-line
    </span>
  )
}
```

And that's it. We check for minutes, return the whiskey glass component if its a long read, otherwise we continue on to return the coffee component. If coffee or whiskey is not your jam, just replace the emojis and remember to update the `aria-label` properties!
