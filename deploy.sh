#!/bin/bash

version="${ENV:-latest}"
echo "Version: $version"

imageName=${INAME}
containerName=${CNAME:-$imageName}

dockerfile=${DOCKERFILE:-"Dockerfile"}

hostUser=${HOST_USER}
hostName=${HOST_NAME}
host="$hostUser@$hostName"

imageTag="$imageName:$version"
echo "Image tag: $imageTag"

echo "Building image..."
buildResult=$(docker build --pull -q -f "$dockerfile" -t "$imageTag" ".")
echo "Build result: $buildResult"

echo "Uploading to cloud..."
uploadToCloud=$(docker save $imageTag | ssh -C $host -- "docker load")
echo "Upload result: $uploadToCloud"

stopAndRemove=$(ssh -C $host -- "docker stop $containerName && docker rm $containerName")
echo "Stop and remove: $stopAndRemove"

runContainer=$(ssh -C $host -- "docker run --name $containerName --restart always --network nginx -d $imageTag")
echo "Run: $runContainer"

pruneImages=$(ssh -C $host -- "docker image prune -f")
echo "Prune Images: $pruneImages"
