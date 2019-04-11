#!/bin/bash

# remove old builds
rm -rf cmi-www/t

for i in acim jsb raj wom www; do
  dir="cmi-${i}"
  cd $dir
  echo "building $dir"
  npm run deploy:prod
  cd ..
done
