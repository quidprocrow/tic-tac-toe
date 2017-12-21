#!/bin/bash

# ID=2 sh scripts/json/change-password.sh

curl "http://tic-tac-toe.wdibos.com/sign-out/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
