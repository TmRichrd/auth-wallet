#!/bin/bash

# csdn部署

if pnpm run build; then
    tar -czvf dist.tgz dist/

    scp dist.tgz root@43.225.157.57:/deploy/csdn/auth

    ssh root@43.225.157.57 'bash /deploy/csdn/auth/online.sh'
else
    echo "Build failed. Exiting..."
    exit 1
fi