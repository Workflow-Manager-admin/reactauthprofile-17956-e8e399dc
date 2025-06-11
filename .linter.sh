#!/bin/bash
cd /home/kavia/workspace/code-generation/reactauthprofile-17956-e8e399dc/reactauthprofile
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

