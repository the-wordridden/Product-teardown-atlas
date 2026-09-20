@echo off
rem Dev-server launcher: puts the scoop Node install on PATH for the child process,
rem then runs the Next dev server from the repo root. Used by .claude/launch.json.
set "PATH=C:\Users\rushabhj\scoop\apps\nodejs-lts\current;C:\Users\rushabhj\scoop\apps\nodejs-lts\current\bin;%PATH%"
cd /d "C:\Users\rushabhj\Downloads\Projects\product-teardown-atlas"
call npm run dev
