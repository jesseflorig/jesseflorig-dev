#!/bin/zsh
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
