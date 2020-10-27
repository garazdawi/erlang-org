FROM nginx

RUN apt-get update && apt-get -y upgrade && \
    apt-get -y install nodejs git build-essential

RUN curl https://www.npmjs.com/install.sh | sh

WORKDIR /buildroot/

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /buildroot/

COPY . /buildroot/

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

RUN echo ${GITHUB_TOKEN}

RUN make export && cp -r out/* /usr/share/nginx/html/