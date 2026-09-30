#!/bin/bash
set -euo pipefail
cd /workspace

if curl -sf -o /dev/null http://127.0.0.1:8080/; then
  exit 0
fi

if [ ! -x /workspace/.venv/bin/python ]; then
  python3 -m venv /workspace/.venv
  /workspace/.venv/bin/pip install -q -r /workspace/requirements.txt
fi

npm run dev >/tmp/velvet-dev.log 2>&1 &

for i in $(seq 1 90); do
  if curl -sf -o /dev/null http://127.0.0.1:8080/; then
    exit 0
  fi
  sleep 2
done

echo "VelvetAI failed to start on 8080" >&2
tail -n 80 /tmp/velvet-dev.log >&2 || true
exit 1
