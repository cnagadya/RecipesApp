#!/usr/bin/env bash

docker run \
       -d \
       --rm \
       -p 8088:8088 \
       -v $(pwd):/app \
       openjdk:8u131-jre-alpine \
       java -jar /app/srch-standalone.jar
