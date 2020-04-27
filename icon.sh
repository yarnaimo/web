#!/bin/sh

ASSETS=public/assets

cp $1 $ASSETS/icon.svg

pwa-asset-generator \
  $ASSETS/icon.svg $ASSETS/icons \
  --icon-only --favicon --opaque false --padding 0

# convert \
#   $ASSETS/icon.svg \
#   -resize 288 -gravity center -background white -extent 620x324 \
#   $ASSETS/summary-large.png
