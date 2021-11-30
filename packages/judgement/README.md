## Tarot Series / Judgement

通过 husky 来注册 git hooks，目前支持 pre-commit 和 commit-msg 两者

pre-commit 对在暂存区中，指定后缀的文件进行格式检查、修正

commit-msg 对 commit message 的格式进行检查，检查规范参考 @commitlint/config-conventional。检查完毕后会对前面的 type 内容，用 emoji 进行替换提交