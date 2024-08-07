
### Docker Deploy

- build the project by running the following command

```sh
 docker compose -f "docker-compose.yml" up -d --build
  docker build -t registry1.lunna.chat/fullstack:thorntree .
```

- login to the docker registry

```sh
  docker login registry1.lunna.chat
```

- Push the image to the docker registry

```sh
  docker push registry1.lunna.chat/fullstack:thorntree
```

- Login into the server

ssh ads@192.168.20.63

- inside the manifest directory you will find the fullstack.yml

```sh
cd ~/manifest
```

- run the following command to kill the existing image

```sh
sudo docker compose -f fullstack.yml down
```

- run the following command to kill the existing image.delete fullstack image and run docker-compose file

```sh
sudo docker rmi 'fullstack-id'
```
docker login registry1.lunna.chat
- run the following command to recreate image.

```sh
sudo docker compose -f fullstack.yml up -d --force-recreate
```
