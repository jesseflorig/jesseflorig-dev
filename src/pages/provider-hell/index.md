---
title: Provider Hell
date: "2020-02-28"
description: "Detangle your React App component."
---

If you're familiar with [React Context Providers](https://reactjs.org/docs/context.html), you know how quickly your `App.js` can turn into something like this:

```js
const App = () => (
  <ThemeProvider>
    <CSSReset />
    <ColorModeProvider>
      <SocketIOProvider>
        <UserProvider>
          <SomeOtherDataProvider>
            <Routes />
          </SomeOtherDataProvider>
        </UserProvider>
      </SocketIOProvider>
    </ColorModeProvider>
  </ThemeProvider>
)
```

It's really not that bad, but when it comes to adding new providers to your `App.js`, it's not always clear where it should go in the tree. Looking at the example above, you might have noticed there are two main types of providers being used: style and data providers. If you didn't notice, then you understand why it might be difficult for other devs to know where to add new providers.

We can easily fix this by creating a couple provider components that group similar concerns together.

## Higher Order Providers

Let's create a `js±<StyleProvider />` and `js±<DataProvider />` that contains their respective providers. Since we'll use both to wrap the content of our app, we'll desctructure `children` from `props`.

### Style Provider

First lets put all the style related providers into a component:

```js
const StyleProvider = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    <ColorModeProvider>
      {children}
    </ColorModeProvider>
  </ThemeProvider>
)
```

### Data Provider

Then we can do the same for our data related providers:

```js
const StyleProvider = ({ children }) => (
  <SocketProvider>
    <UserProvider>
      <SomeOtherDataProvider>
        {children}
      </SomeOtherDataProvider>
    </UserProvider>
  </SocketProvider>
)
```

## Putting it back together

With our grouped providers created, we can use them to clean up our `js±<App />` component:

```js
const App = () => (
  <StyleProvider>
    <DataProvider>
      <Routes />
    </DataProvider>
  </StyleProvider>
)
```

Now its very clear that if we ever need to add style or data providers, we can add them to their respective higher order provider. And should we ever have a provider not fall into either of those buckets, we can add them directly to the `js±<App/>` component or create a new higher order component.
