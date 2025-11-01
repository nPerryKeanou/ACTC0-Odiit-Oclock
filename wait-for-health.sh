#!/bin/bash

echo "Waiting for the API health check..."

while ! curl -s http://localhost:3000/health | grep "OK" > /dev/null; do
  echo "Waiting for the server to be healthy..."
  sleep 2
done

echo "Server is healthy! Starting the app..."
exec "$@"