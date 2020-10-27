
all: setup
	npm run dev

export: setup
	npm run export

setup: content/eep/eeps/eep-0000.html content/blog/.git node_modules

node_modules:
	npm i

content/eep/.git content/blog/.git:
	git submodule update --init
content/eep/eeps/eep-0000.html: content/eep/.git
	cd content/eep/ && ./build.pl

docker:
	docker build --build-arg "GITHUB_TOKEN=${GITHUB_TOKEN}" -t erlang-org -f Dockerfile .		

docker_run: docker
	docker run --rm --name erlang-org -it -p 3000:80 erlang-org