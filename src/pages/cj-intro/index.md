---
title: "Code Jerky: Introduction"
date: "2020-02-07"
description: "A series of snacks for DRY-ing out your code."
---

One thing I love about programming is that there are virtually an infinite number of paths to solve a single problem. But that doesn't mean all paths are equal. If you work on a large codebase or a codebase touched by a lot of people, you quickly find some code is easier to understand than others. Over time you'll see the same problems being solved in different ways and develop a preference for speicifc patterns.

While this isn't a series about readability and mantainablity, striving for DRY code will help on both of those fronts. But what is DRY?

## Don't repeat yourself

It really is that simple. The goal is to type less. You might be typing too much if any of the following applies:

 - Typing the same thing over and over
 - Copy and pasting large chunks of code
 - Refactoring code requires a lot of find-and-replace

Some refer to this as WET code. As in _We Enjoy Typing_.

So what does this actually look like in practice?

## A very basic example

Have you ever used a variable or  written a function? If so, you have some fundamental tools for DRY-ing out your code. Let's take a look at some code calculating subtotals with a 9% tax rate:

```js
const total1 = 5.99 x 10 + (5.99 x 10) * .09
const total2 = 2.49 x 3 + (2.49 x 3) * .09
const total3 = 8.99 x 1 + (8.99 x 1) * .09
```

This code above works, but lets consider what goes into mantaining it:

- If the tax rate changes, how many places do we have to update?
- If item prices change, how many places do we need to update it?
- If our subtotal logic changes, how many lines do we have to update?

All of the answers above are greater than one. That means the code-smell is WET. Let's DRY this out by making a tax constant and moving our total logic to a function:

```js
const TAX_RATE = .09

function calcTotal = (price, qty){
  return price * qty + (price * qty) * TAX_RATE
}


const total1 = calcTotal(5.99, 10)
const total2 = calcTotal(2.49, 3)
const total3 = calcTotal(8.99, 1)
```

Now when we revisit the questions posited above the answer is one. Keep in mind we started with code that worked. You shouldn't get hung up on writing DRY code in your first pass. Good code often comes from an iterative process.

Speaking of iterative, if we look at our `calcTotal` function, we can spot a pesky little bit of repetitive logic: `price * qty`. By now, we probably know why its there, but will it be obvious when we look at it later, or will it be obvious to the next dev to come across it? Let's see if we can refactor that a bit to be more DRY:

```js
function calcTotal = (price, qty){
  const subtotal = price * qty
  const taxes = subtotal * TAX_RATE
  return subtotal + taxes
}
```

You might be thinking, "we took a one-liner and made it three lines, _how is this better?_" Without getting into it too deep here (we will in the future), just know less code is not always better. Think of the code you write as intended to be read by humans. Even JavaScript gets processed down into something more readable by computers. There's a reason we dont write in `0`s and `1`s.

> Less code is not always better.

Compare our two versions of `calcTotal`. Imagine another developer is trying to understand whats going on. Granted this isnt a very complex function, which one is _quicker_ to understand. Focus less on how things are being computed, but _why_. I'd say it takes slightly more cognitive effort in the first example of why we're computing `js±price * qty` more than once. The second example can surely be understood on the first pass by even the most junior devs: We get a subtotal, we compute the taxes of the subtotal, then we return the subtotal with tax.

And while these examples might seem nitpicky, it becomes more important as codebases and dev teams grow.

## More to come

So as we've seen, DRY principles will naturaly lead to more readable, thus more mantainable, code. In this series, we'll learn how to identify tell-tale signs of WET code and then understand how to apply DRY principles to make our code better.
