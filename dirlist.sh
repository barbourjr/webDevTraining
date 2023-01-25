#! /usr/bin/bash

#find . -mindepth 1 -maxdepth 2 -type d > /home/barbourj/list_of_dirs.txt
> /home/barbourj/list_of_dirs.txt
for r in */ ; do
    [ -L "${r%/}" ] && continue
    if [ -r "${r/}" ] ; then
        echo "$r"
        echo "$r" >> /home/barbourj/list_of_dirs.txt
        cd ${r}
        for s in */ ; do
            if [ -r "$s" ] ; then
                echo "$r$s"
                echo "$r$s" >> /home/barbourj/list_of_dirs.txt
            fi
            done
        cd ../
    fi
done
