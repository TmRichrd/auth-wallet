#!/bin/bash

if pnpm run build; then
    tar -czvf dist.tgz dist/

    scp dist.tgz root@116.62.105.150:/deploy/app/auth

    ssh root@116.62.105.150 'bash /deploy/app/auth/online.sh'
else
    echo "Build failed. Exiting..."
    exit 1
fi