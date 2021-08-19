#!/bin/sh

if [[ -z $2 ]]; then
    # First argument is the project's current name
    OLD_NAME='RNBoilerplate'
    # Second argument is the project's new name
    NEW_NAME=$2
else
    # First argument is the project's current name
    OLD_NAME=$1
    # Second argument is the project's new name
    NEW_NAME=$2
fi


# Changes to lower case
OLD_NAME_LOWER=${OLD_NAME,,}
NEW_NAME_LOWER=${NEW_NAME,,}


# Changes to lower case
OLD_NAME_TESTS=$OLD_NAME'Tests'
NEW_NAME_TESTS=$NEW_NAME'Tests'


# Prints
echo 'Old project name: '$OLD_NAME
echo 'Old project name lowercase: '$OLD_NAME_LOWER

echo 'New project name: '$NEW_NAME
echo 'New project name lowercase: '$NEW_NAME_LOWER


# Changes the title occourence inside every file to the new one
find . -path ./.git -prune -false -o -type f -exec sed -i 's/'$OLD_NAME_LOWER'/'$NEW_NAME_LOWER'/g' {} \;
find . -path ./.git -prune -false -o -type f -exec sed -i 's/'$OLD_NAME'/'$NEW_NAME'/g' {} \;


# Changes directories and files names
mv android/app/src/debug/java/com/$OLD_NAME_LOWER android/app/src/debug/java/com/$NEW_NAME_LOWER
mv android/app/src/main/java/com/$OLD_NAME_LOWER android/app/src/main/java/com/$NEW_NAME_LOWER
mv ios/$OLD_NAME/ ios/$NEW_NAME/
mv ios/$OLD_NAME_TESTS/$OLD_NAME_TESTS.m ios/$OLD_NAME_TESTS/$NEW_NAME_TESTS.m
mv ios/$OLD_NAME_TESTS/ ios/$NEW_NAME_TESTS/
mv ios/$OLD_NAME.xcodeproj ios/$NEW_NAME.xcodeproj
