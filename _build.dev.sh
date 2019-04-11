#!/bin/bash

for i in acim acol jsb raj wom www; do
  dir="cmi-${i}"
  cd $dir
  echo "building $dir"
  npm run deploy:dev
  cd ..
done
