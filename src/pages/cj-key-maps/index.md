---
title: "Code Jerky: Key Maps"
date: "2020-03-27"
description: "Let's see how we can improve some basic logic with a key map."
---

This is going to be a multipart series following the evolution of a `js±pluralize()` utility function I developed on a project. Eventually we'll end up with a curried pure function, but lets start from the beginning and see how key map can help us.

If you ever have to build a label for a dynamic list, you'll probably end up with something like this:

```js
const label = `Showing ${items.length} ${items.length === 1 ? "item" : "items"}`
// OR
const label = `Showing ${items.length} item${items.length === 1 ? "" : "s"}`

// Showing 0 items
// Showing 1 item
// Showing 2 items
```

In the second example, we're using the ternary to determine if we need to add an "s" or not. It's not as readable as the explicit values in the first example, and it wouldn't work on words that require more than appending letters like "sky" or "child".

Whichever route you go, if you find yourself copying the label logic throughout your application, you might factor it out to a utility function. From the viewpoint of a JavaScript newbie lets assume we're equipped with `if` statements, so an initial `js±pluralize()` might look like this:

```js
const pluralize = function(word, count){
  if( word === "item"){
    return count === 1 ? word : "items"
  }
  console.error(`Unable to pluralize "${word}" (update utility function)`)
  return word
}
```

Not a bad first pass. If we try to pluralize a word we haven't added, we'll just return the word and console out a message telling us to update the utility function. And when we do update it, all we'll need to do is add another if statement.

But as we start to add copies of the `if` statement, are we keeping our code DRY? You might have already noticed we'd be replicating the ternary logic everytime we add a new word.

We can do better than that with the help of a key map AKA a plain JavaScript object:

```js
const pluralize = function(word, count){
  const pluralMap = {
    child: "children",
    item: "items",
    sky: "skies"
  }

  if(!pluralMap[word]){
    console.warn(`No plural entry for ${word}`)
  }

  return count === 1 ? word : pluralMap[word] || word
}
```

In our latest iteration, we check to see if the word is in our plural map, and if not we just warn the user. Then we return the plural or singular as applicable, falling back to the singular if necessary. Now if we need to add a new word, all we need to do is add a key/value pair to the plural map.

This version had a long run in our production application, but at some point the plural map grew to a few dozen words before we noticed over 75% of the words were just a simple trailing "s" for their plural version. So I then refactored it to this:


```js
const pluralize = function(word, count){
  const pluralMap = {
    child: "children",
    sky: "skies"
  }

  return count === 1 ? word : pluralMap[word] || `${word}s`
}
```

Because most of the words following the "s" postfix, I decided to remove all of those entries from the plural map and just add some fallback logic to append an "s" if the word isn't found in the plural map. This results in a less tedious plural map. Whenever we use it on a new word that follows the "s" convention, it _just works_. And since we don't rely on the plural map most of the time, there's no reason to warn the developer an entry is missing.

> Whenever we use it on a new word that follows the "s" convention, it just works.

Now our signal to update the utility function is when we see a word like "persons" or "universitys" pop up in the UI. So far, this type of bug has yet to make it past our unit tests.

## Side note

As we wrap up, you might be asking, howd does `js±pluralize()` handle words where the singular and plural are the same? Words like:

- aircraft
- deer
- moose
- species

The answer is that you don't need a function to determine how to choose between the same value.

## Next steps

This post focused on how to keep the function implementation DRY, but next time we'll look at how we can keep the rest of our application DRY by converting it to a curried function!
