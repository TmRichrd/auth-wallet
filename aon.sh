#!/bin/bash

# aon部署

if pnpm run build; then
    tar -czvf dist.tgz dist/

    scp dist.tgz root@43.225.157.57:/deploy/csdn/authlaunch

    ssh root@43.225.157.57 'cd /deploy/csdn/authlaunch && tar -xzvf dist.tgz && rm dist.tgz'
else
    echo "Build failed. Exiting..."
    exit 1
fi