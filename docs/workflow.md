# Recommended workflow

## 1. Keep source material private

将未公开小说放在仓库之外。公开仓库只保留脱敏 fixture、规则、脚本和可复现测试。

## 2. Separate working and publishing files

工作稿可以包含概要、章末钩子和自检记录；发布稿只保留标题与正文。生成发布稿后，用 `story-qc --release` 检查元数据是否泄漏。

## 3. Treat checks as alarms

命中套话、信息边界或段落统计并不等于文本有错。先定位命中语境，再由作者判断是否修改。工具不输出“AI生成概率”。

## 4. Review the change set

每批改稿都应记录：输入版本、修改范围、硬数据检查、人工复读结论和未决风险。没有这些证据，不把一次成功运行称为质量提升。
