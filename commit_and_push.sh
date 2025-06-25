#!/bin/bash
set -e

cd reactauthprofile

git add .
git commit -m "Update login page with 'Employee Portal' title, add footer, and fix PUBLIC_URL build issues as per requirement document."
git push
