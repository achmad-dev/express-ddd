# express-ddd

## prerequisites
 - docker
 - docker-compose (optional)
 - bun
 - minikube (optional)
 - kubectl (optional)
 - helm (optional)

## description
this is an express project that uses DDD principles, with simple wallet concept 


## how to run

### start minikube
```bash
minikube start --driver=docker
```

### start postgres

- claim the persistent volume
```bash
kubectl apply -f ./deployment//postgres-pvc.yaml
```

- start the postgres pod
```bash
kubectl apply -f ./deployment/postgres-deployment.yaml
```

### build the docker image
```bash
docker build -t express-ddd:latest .
```

### start the app
```bash
kubectl apply -f deployment/app-deployment.yaml
```


### check if the service is running
```bash
kubectl get po -A
```

### check the url of the service
```bash
minikube service app --url
```

then you can test this service by using curl or postman with the url

### if you to use helm
you can use helm to deploy the app
```bash
helm install express-ddd ./express-ddd
```


## to run with docker-compose
```bash
docker-compose up -d
```

and then you can check the running services and check the url is like above when using a kubectl command
and you can test like above too


## below is the original readme from bun init
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run ./bin/index.ts
```

This project was created using `bun init` in bun v1.1.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
