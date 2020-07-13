#!/usr/bin/env bash

GITHUB_REPO_URL="https://github.com/RechInformatica/rech-editor-batch"
GITHUB_REPO_NAME=$(echo "${GITHUB_REPO_URL}" | command grep -oE '[^/]*$')

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_DIR="${SCRIPT_DIR}"
SRC_DIR="${REPO_DIR}/${GITHUB_REPO_NAME}"
DIST_DIR="${REPO_DIR}/out"


# -------- #
# clean up #
# -------- #

pushd "${REPO_DIR}" || exit

rm -rf \
    "${DIST_DIR}" \
    "package.json" "package-lock.json"

popd || exit


# ------------------------- #
# download the source codes #
# ------------------------- #

pushd "${REPO_DIR}" || exit

echo 'Enter commit SHA, branch or tag (for example 2.1.0) to build'
read -rp 'SHA, branch or tag (default: master): ' ref

# use the "master" branch by default
if [ "${ref}" = "" ]; then
    ref="master"
fi

temp_zip="src-${ref}.zip"
curl -L "${GITHUB_REPO_URL}/archive/${ref}.zip" -o "${temp_zip}"
unzip -z "${temp_zip}" | tr -d '\r' > update-info.log
unzip "${temp_zip}" && rm -f "${temp_zip}"
mv "${GITHUB_REPO_NAME}-"* "${SRC_DIR}"

popd || exit


# ------------ #
# prepare deps #
# ------------ #

pushd "${SRC_DIR}" || exit

npm install
npm install -D typescript

popd || exit


# ------- #
# compile #
# ------- #

pushd "${SRC_DIR}" || exit

# we don't need the post-install script which is for VSCode
sed package.json -i'' \
    -e 's/"main":.*/"main": ".\/out\/server.js",/g' \
    -e 's/"postinstall":/"commented-postinstall":/g' \
    --

npx tsc --newLine LF -p .

popd || exit


# -------------------- #
# collect output files #
# -------------------- #

pushd "${REPO_DIR}" || exit

mv "${SRC_DIR}/out/lsp" "${DIST_DIR}"
cp "${SRC_DIR}/package.json" .
cp "${SRC_DIR}/package-lock.json" .

popd || exit


# -------- #
# clean up #
# -------- #

pushd "${REPO_DIR}" || exit

rm -rf "${SRC_DIR}"

popd || exit

