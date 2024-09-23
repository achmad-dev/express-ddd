# express-ddd

## prerequisites
 - docker
 - docker-compose
 - bun
 - minikube
 - kubectl
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

### check if the service is running
```bash
kubectl get po -A
```

### check the url of the service
```bash
minikube service app --url
```

then you can test this service by useing curl or postman with the url




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
