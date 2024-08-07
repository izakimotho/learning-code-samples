# Build

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Docker build and run

For build and run:
`docker build . -t angular-boda`  
 `docker run -p 8080:80 -e ENVIRONMENT=Production -t angular-boda`



### Docker Deploy
- build the project by running the following command
```sh
  docker build -t registry1.lunna.chat/webchat:thorntree .
```
- login to the docker registry
```sh
  docker login registry1.lunna.chat
```
 
- Push the image to the docker registry
```sh
  docker push registry1.lunna.chat/webchat:thorntree
```
- Login into the server
 
ssh ads@192.168.20.63
- inside the manifest directory you will find the webchat.yml 
```sh
cd ~/manifest
```
- run the following command to kill the existing image
```sh
sudo docker compose -f webchat.yml down
```

- run the following command to kill the existing image.delete webchat image and run docker-compose file
```sh
sudo docker rmi 'webchat-id'
```

- run the following command to recreate image.
```sh
sudo docker compose -f webchat.yml up -d --force-recreate
```
