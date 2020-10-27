# Erlang.org website

Source code for the Erlang.org website.

The erlang.org website is written using typescript and
[next.js](http://www.nextjs.org) as a static site generator (SSG). The content of the website can be customized by editing the files in
[content](/content).

New blogposts, releases and EEPs are automatically pulled from their respective repositories.

## GITHUB_TOKEN

Since github rate-limits the REST API requests that you are allowed
to make from annonymous connections it is recommended that you set the
`GITHUB_TOKEN` environment variable in your shell to a valid [Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

## Develop

The easiest way to setup a dev environment is to just use the makefile
and call `make`. This will update the correct git submodules and start
nodejs.

If you want to run node directly instead, you can run `make setup` and
then `npm run dev`.

## Deploy

All the pages are statically generated. To do that you can run `make export`
which will output the webpages to the out folder.

## Docker

There are dockerfiles that can be used to setup an nginx image that will
serve erlang-org at [http://localhost:3000]. To build run `make docker` and
to build and run do `make docker_run`.

## TODO

This this not a complete migration yet. This still needs to be done:
* RSS feeds (news, releases, blog)
* Github actions auto-deploy
* Better downloads integrated with versions tree
* Review HTML and CSS styling
 * use sass
 * update bootstrap version
* Migrate all news to markdown

## License

```
Copyright 2016 Industrial Erlang User Group

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
