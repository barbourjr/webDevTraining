#! /usr/bin/bash

#find . -mindepth 1 -maxdepth 2 -type d > /home/barbourj/list_of_dirs.txt
> /home/barbourj/list_of_dirs.txt
for d in */ ; do
    [ -L "${d%/}" ] && continue
    if [ -d "${d/}" ] ; then
        echo "$d"
        echo "$d" >> /home/barbourj/list_of_dirs.txt
        cd ${d}
        for e in */ ; do
            if [ -d "$e" ] ; then
                echo "$d$e"
                echo "$d$e" >> /home/barbourj/list_of_dirs.txt
            fi
            done
        cd ../
    fi
done
