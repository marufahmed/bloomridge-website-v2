#!/bin/sh
# Tell Bing, Yandex and the other IndexNow engines about every URL in the live sitemap.
# Run after a deploy that adds or changes pages:  npm run indexnow
# The key is the public file public/<key>.txt; IndexNow checks it to confirm we own the site.
set -e
HOST=www.bloomridgesprings.com
KEY=a6aa5ba8ee2896660cd4e3a26c6eaeaa

URLS=$(curl -fsS "https://$HOST/sitemap-0.xml" | grep -o '<loc>[^<]*' | sed 's/<loc>//' \
  | awk 'BEGIN{ORS=","} {printf "\"%s\",", $0}' | sed 's/,$//')

curl -sS -o /dev/null -w "IndexNow: HTTP %{http_code}\n" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":[$URLS]}" \
  https://api.indexnow.org/indexnow
