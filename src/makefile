
all: build
	cd ../dist/chrome/ && google-chrome --load-and-launch-app=/home/ryan/Documents/Development/bplayer3/dist/chrome

build: compile
	cd ../dist/chrome/ && sh build.sh
	
compile:
	haxe build.hxml
