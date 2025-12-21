# 🚀 Vercel 部署指南

## 方法一：直接从GitHub部署（推荐）

### 1. 访问 Vercel
- 打开浏览器，访问：https://vercel.com
- 点击 "Sign in with GitHub" 并授权登录

### 2. 导入项目
- 点击 "New Project"
- 找到并选择你的仓库：`xingyun7842/-`
- 点击 "Import"

### 3. 配置项目
- Framework: 自动检测为 "Next.js"
- Build Command: `npm run build`
- Output Directory: `.next`

### 4. 添加环境变量
在 "Environment Variables" 部分添加：
```
Name: NEXT_PUBLIC_API_KEY
Value: sk-IvD0fdxjJUKqxYWSW71u3SCbuZkPBjDdAacMU9u3nOSSgDhG
Environment: Production, Preview, Development (全部勾选)
```

### 5. 部署
- 点击 "Deploy"
- 等待部署完成（约2-3分钟）

## 方法二：手动上传部署

### 1. 访问 Vercel
- 打开：https://vercel.com
- 点击 "New Project"

### 2. 选择上传方式
- 选择 "Other" 选项
- 或者直接拖拽项目文件夹到浏览器

### 3. 上传项目文件
- 将除了 `node_modules` 和 `.git` 之外的所有文件上传
- 或者使用已打包的 `argument-winner.tar.gz` 文件

### 4. 配置环境变量
同方法一的步骤4

### 5. 部署
点击 "Deploy" 按钮

## 🎯 部署完成后

你的网站将在以下地址可用：
- **生产环境**: `https://your-project-name.vercel.app`
- **预览环境**: 每次推送代码都会生成新的预览链接

## 📱 测试网站

部署完成后，你可以：
1. 在手机浏览器中测试响应式设计
2. 测试API调用是否正常
3. 检查历史记录功能

## 🔧 如果遇到问题

1. **构建失败**: 检查 `package.json` 和依赖版本
2. **API调用失败**: 确认环境变量设置正确
3. **页面空白**: 查看Vercel的Function Logs

---

✅ **准备好后，直接访问 [Vercel](https://vercel.com) 开始部署！**