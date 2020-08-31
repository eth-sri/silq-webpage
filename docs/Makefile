# serve on localhost
run:
	jekyll serve --watch --trace

# build webpage (store in _site)
build:
	jekyll build

# deploy via ssh (temporary setup)
deploy: build
	cd _site && scp -r . websrl:/import/vechev/h1/htdocs-silq
