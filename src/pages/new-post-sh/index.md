---
title: Create posts from the command line
date: "2020-01-24"
description: "Automate new Gastsby posts with a simple bash script."
---

As programmers, its our job to be lazy (read efficient). If you find yourself doing something repetitive and mundane, consider the variables that go into it. For instance, lets look at creating an new post for this blog:

 1. Create new new post directory in `src/pages`
 2. Create a new `index.md` file
 3. Format the markdown with some metadata (title, date, description)

The only variable that really changes every time I complete the process above, is the actual name of the folder. This sounds like a good candidate for automation!

## Setting up permissions

To accomplish this, we'll put together a simple shell script that can be run from the command line. Create a new script in the project root:

```bash
touch new-post.sh
```

By default, you probably won't be able to run it. You can try with `./new-post.sh`. If you get a permission denied error, we can grant it execution permission with:

```bash
chmod +x new-post.sh
```

Now when you run it, nothing should happen. Since we haven't scripted anything yet, that makes sense.

## Automating workflows with bash

Let's start with the simple workflow outlined above, and worry about handling potential hidden steps as they pop up.

First, we need to create a new folder. We've already considered the folder name will be different every time, so lets run with passing a new folder name as a command argument, making our command look something like this:

```bash
./new-post.sh my-new-folder
```

To handle that in our script, we'll read the argument (`$1`) and append it to our known post directory:

```bash
POSTS_PATH="./src/pages/"
NEW_FOLDER=$1
NEW_PATH="$POSTS_PATH/$NEW_FOLDER"

mkdir $NEW_PATH
```

The code above could easily be written on a single line, but we should get into the habit of clearly naming variables both for others and our future selves.

If you're thinking ahead you might have considered a couple scenarios where we wouldn't want to blindly run the `mkdir` command. What if no argumants are provided? Let check by counting (`$#`) the arguments before doing anything, and exiting the script if there are none:

```bash
if [ $# == 0 ]
then
  echo "You must include a new folder name"
  exit 1
fi
```

Something else we'd want to check for is that wether or not of the directory already exists. If so, we'll print a message and exit the program:


```bash
POSTS_PATH="./src/pages/"
NEW_FOLDER=$1
NEW_PATH="$POSTS_PATH/$NEW_FOLDER"

//highlight-start
if [ -d $NEW_PATH ]
then
  echo "Folder $NEW_FOLDER already exists"
  exit 1
fi"
//highlight-end

mkdir $NEW_PATH
```
Now we're only making the new directory if we were given a param and it doesn't already exists. Let's move on to creating the file:

```bash
NEW_FILE_PATH="$NEW_PATH/index.html"
touch $NEW_FILE_PATH"
```

With the file created, lets populate the new file with a template that looks like:

```
---
title:
date: "YYY-MM-DD"
description: ""
---

```

To do so, you can `echo` a string replacing newlines with `\n` and escaping quotes with `\"`. As a bonus, we'll go ahead and put the current formatted date on the date line:

```bash
TODAY=$(date +"%Y-%m-%d")
TEMPLATE="---\ntitle:\ndate: \"$TODAY\"\ndescription: \"\"\n---\n\n"
echo $TEMPLATE > $NEW_FILE_PATH
```

That wraps up our workflow. The last thing we can do is to go ahead and open the file for editing:

```bash
vi $NEW_FILE_PATH
```

Our final script looks like this:

```bash
# Check command arguments
if [ $# == 0 ]
then
  echo "You must include a new folder name: ./new-post.sh hello-world"
  exit 1
fi

# Check the new path
POSTS_PATH="./src/pages"
NEW_FOLDER=$1
NEW_PATH="$POSTS_PATH/$NEW_FOLDER"
if [ -d $NEW_PATH ]
then
  echo "Folder $NEW_FOLDER already exists"
  exit 1
fi

# Create new post directory
mkdir $NEW_PATH

# Create new post file template
NEW_FILE_PATH="$NEW_PATH/index.md"
touch $NEW_FILE_PATH
TODAY=$(date +"%Y-%m-%d")
TEMPLATE="---\ntitle:\ndate: \"$TODAY\"\ndescription: \"\"\n---\n\n"
echo $TEMPLATE > $NEW_FILE_PATH

# Open the new post in Vim
vi $NEW_FILE_PATH

```

Now we can quickly create new posts with `bash±./new-post.sh post-name`. What other features could we add to this? What other workflows could benefit from scripting? Let me know!
