export const commitMsg =
  "#!/bin/sh\n" +
  '. "$(dirname "$0")/_/husky.sh"\n' +
  "\n" +
  'npx --no-install commitlint --config $COMMITLINT_CONFIG_PATH/commitlint.config.js --edit "$1"\n' +
  "\n" +
  "# START EMOJI\n" +
  "commit_msg=$(cat .git/COMMIT_EDITMSG)\n" +
  "\n" +
  'commit_types=("build" "chore" "ci" "docs" "feat" "fix" "perf" "refactor" "revert" "style" "test")\n' +
  'emoji_types=(":building_construction:" ":wrench:" ":construction_worker:" ":memo:" ":sparkles:" ":bug:" ":zap:" ":recycle:" ":rewind:" ":lipstick:" ":white_check_mark:")\n' +
  "\n" +
  "match_index=0\n" +
  "index=0\n" +
  "\n" +
  "for item in ${commit_types[@]}; do\n" +
  '  type_regex="^${item}"\n' +
  "\n" +
  "  if [[ $commit_msg =~ $type_regex ]]; then\n" +
  "    let match_index=$index\n" +
  "  fi\n" +
  "\n" +
  "  let index=${index}+1\n" +
  "done\n" +
  "\n" +
  "match_emoji=${emoji_types[$match_index]}\n" +
  "\n" +
  'res_msg=$(echo $commit_msg | sed "s/^${commit_types[$match_index]}/"$match_emoji"/")\n' +
  "\n" +
  "echo $res_msg >.git/COMMIT_EDITMSG\n" +
  "# END EMOJI\n";

export const preCommit =
  "#!/bin/sh\n" +
  '. "$(dirname "$0")/_/husky.sh"\n' +
  "\n" +
  "# email check\n" +
  "# EMAIL=$(git config user.email)\n" +
  "# if [[ ! $EMAIL =~ ^[.[:alpha:]]+@lizhi\\.fm$ ]];\n" +
  "# then\n" +
  '#   echo "Your git information is not valid";\n' +
  '#   echo "Please run:"\n' +
  `#   echo '   git config --local user.name "<your name>"'\n` +
  `#   echo '   git config --local user.email "<your name>@lizhi.fm"'\n` +
  "#   echo 'to fix.'\n" +
  "#   exit 1;\n" +
  "# fi;\n" +
  "\n" +
  "# staged file check\n" +
  'npx --no-install lint-staged --config $LINT_STAGED_CONFIG_PATH/lint-staged.config.js --allow-empty "$1"\n';
