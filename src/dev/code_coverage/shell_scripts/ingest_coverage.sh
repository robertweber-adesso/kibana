#!/bin/bash

echo "### Ingesting Code Coverage"
echo ""


BUILD_ID=$1
export BUILD_ID

CI_RUN_URL=$2
export CI_RUN_URL
echo "### debug CI_RUN_URL: ${CI_RUN_URL}"

ES_HOST="https://${USER_FROM_VAULT}:${PASS_FROM_VAULT}@${HOST_FROM_VAULT}"
export ES_HOST

STATIC_SITE_URL_BASE='https://kibana-coverage.elastic.dev'
export STATIC_SITE_URL_BASE

for x in jest functional; do
  echo "### Ingesting coverage for ${x}"

  COVERAGE_SUMMARY_FILE=target/kibana-coverage/${x}-combined/coverage-summary.json

  node scripts/ingest_coverage.js --verbose --path ${COVERAGE_SUMMARY_FILE} --vcsInfoPath ./VCS_INFO.txt
done

# Need to override COVERAGE_INGESTION_KIBANA_ROOT since mocha json file has original intake worker path
COVERAGE_SUMMARY_FILE=target/kibana-coverage/mocha-combined/coverage-summary.json
export COVERAGE_INGESTION_KIBANA_ROOT=/dev/shm/workspace/kibana

node scripts/ingest_coverage.js --verbose --path ${COVERAGE_SUMMARY_FILE} --vcsInfoPath ./VCS_INFO.txt

echo "###  Ingesting Code Coverage - Complete"
echo ""
