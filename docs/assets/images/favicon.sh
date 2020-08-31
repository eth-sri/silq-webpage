#!/bin/bash

# navigate to current directory
cd "$(dirname "$(readlink -f "$0")")"

# generate favicon
convert -background transparent -density 384 favicon.svg -define icon:auto-resize favicon.ico
