LOGNAME=$(whoami) || true
UID=$(id -u) || true
GID=$(id -g) || true
export LOGNAME || true
export UID || true
export GID || true
