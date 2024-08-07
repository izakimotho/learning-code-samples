FROM openjdk:17-jdk-alpine

# Install ffmpeg and ffprobe
RUN apk update \
    && apk add ffmpeg

# Add group and user
RUN addgroup -S pe && adduser -S pe -G pe
USER pe:pe


ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
