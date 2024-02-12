# adv-webdev-group2

#Command codes


node index.js

docker build -t artan .

docker tag artan localhost:5000/artan

docker push localhost:5000/artan

kubectl port-forward svc/artan-service 3000:3000-n jkpgcity