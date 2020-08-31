#!/bin/bash

###########
# PURPOSE #
###########
# Type-check all code examples

for f in *.slq; do
	echo "Checking $f..."
	silq $f
done