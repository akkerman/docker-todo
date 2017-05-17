
docker build -t akkerman/todo-proxy ./proxy
docker build -t akkerman/todo-node ./node
docker build -t akkerman/todo-python ./python

docker push akkerman/todo-proxy
docker push akkerman/todo-node
docker push akkerman/todo-python

