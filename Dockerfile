FROM alpine
RUN apk --no-cache add kubectl busybox-extras bind-tools
WORKDIR /www
COPY . .
CMD ["httpd",  "-vfp80"]
