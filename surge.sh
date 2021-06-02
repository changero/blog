#! /usr/bin/env bash

cd $1

for file in $(ls .);
do
    if [ -d "./$file" ];then
        rm -rf "./$file"
    fi
done

npx surge --domain changero.surge.sh
