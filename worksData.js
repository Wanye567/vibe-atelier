const worksData = [
  {
    id: "vibe-atelier",
    title: "Vibe Atelier",
    date: "2026-07-18",
    tags: ["个人网站", "Vibe Coding", "作品管理", "液态玻璃"],
    coverImage:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23fbfcff'/%3E%3Cstop offset='1' stop-color='%23e8eef0'/%3E%3C/linearGradient%3E%3Cfilter id='shadow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='18' stdDeviation='22' flood-color='%23172433' flood-opacity='.16'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='640' height='360' rx='38' fill='url(%23bg)'/%3E%3Ccircle cx='142' cy='86' r='92' fill='%234a7c68' opacity='.12'/%3E%3Ccircle cx='525' cy='265' r='128' fill='%23a8c5ba' opacity='.22'/%3E%3Cg filter='url(%23shadow)'%3E%3Crect x='82' y='58' width='476' height='244' rx='30' fill='white' opacity='.72' stroke='white' stroke-width='2'/%3E%3Crect x='112' y='92' width='112' height='176' rx='22' fill='%23f5f7f9' stroke='white'/%3E%3Ccircle cx='168' cy='134' r='28' fill='%234a7c68' opacity='.22'/%3E%3Crect x='142' y='184' width='52' height='8' rx='4' fill='%234a7c68' opacity='.32'/%3E%3Crect x='138' y='204' width='60' height='7' rx='3.5' fill='%2394a3b8' opacity='.28'/%3E%3Crect x='248' y='96' width='238' height='18' rx='9' fill='%231f2937' opacity='.78'/%3E%3Crect x='248' y='136' width='260' height='12' rx='6' fill='%234a7c68' opacity='.38'/%3E%3Crect x='248' y='162' width='208' height='12' rx='6' fill='%2394a3b8' opacity='.34'/%3E%3Crect x='248' y='206' width='82' height='44' rx='14' fill='white' opacity='.78' stroke='white'/%3E%3Crect x='348' y='206' width='82' height='44' rx='14' fill='white' opacity='.7' stroke='white'/%3E%3Crect x='448' y='206' width='60' height='44' rx='14' fill='white' opacity='.62' stroke='white'/%3E%3C/g%3E%3Cpath d='M109 60 C194 22 281 35 340 67 C420 110 493 75 554 38' fill='none' stroke='white' stroke-width='2' opacity='.7'/%3E%3C/svg%3E",
    summary: "一个把 Vibe Coding 灵感、制作过程、代码片段和作品反馈整理到一起的个人创作工作室网站。",
    readme: `
# Vibe Atelier

Vibe Atelier 是我为自己的 Vibe Coding 作品搭建的个人创作工作室。它不是一个传统意义上的作品集，也不想完全做成代码仓库，而是把作品、过程、关键代码、阅读说明和反馈收集放在同一个网页里，让每一次制作都有可以回看的记录。

## 项目概述

目前网站采用单页结构，通过左侧导航切换首页、创作理念、作品记录、制作过程、评论建议和管理后台。作品列表负责快速浏览，详情弹窗负责承载更完整的内容：README、文件树、关键代码片段、点赞收藏和评论示例。

我希望打开一个作品时，不只是看到“成品截图”，也能看到它是怎么被想出来、怎么被拆成结构、哪些代码片段值得留下。这是这个网站最重要的部分。

## 创作初衷

我开始做 Vibe Coding 之后，发现很多有价值的东西其实不只在最终页面里。比如某次对布局的判断、一次和 AI 来回调整的过程、一段刚好写得很顺的交互逻辑，都会随着项目结束慢慢丢掉。

所以我想做一个更像创作日志的作品站：它可以公开展示，也可以让我自己管理。它不像 GitHub 那样偏工程归档，也不像普通作品集那样只展示结果，而是留住“制作过程中的判断”。

## 功能亮点

- 作品列表：用卡片展示作品标题、摘要、日期、收藏和特别关注状态。
- 作品详情：点击卡片后打开全屏详情弹窗，不离开当前页面就能阅读完整内容。
- README 展示：用接近 GitHub README 的节奏讲清楚作品背景、想法和进度。
- 关键代码片段：挑选真正值得记录的代码，而不是把所有文件都堆出来。
- 文件树展示：保留项目结构感，但不把网站变成仓库。
- 本地交互：点赞、收藏、特别关注和管理后台先用浏览器本地存储实现。

## 技术实现

第一版没有引入框架，主要使用 HTML、CSS 和原生 JavaScript 完成。这样做的好处是结构足够透明，任何一个模块都能直接看见，也方便后面逐步升级。

数据层目前集中在 worksData.js。作品列表和详情页都从同一份作品数组读取内容，避免列表和详情各写一套硬编码。管理后台保存的数据会进入 localStorage；开发模式下会优先用 worksData.js 做打底，避免旧缓存把默认示例内容覆盖掉。

视觉上使用亮色液态玻璃风格：浅灰到白色的背景、半透明面板、柔和阴影和圆角。目标不是炫技，而是让页面保持安静、干净、有一点 Apple 生态界面的通透感。

## 当前进度

- 已完成首页、侧边导航和多视图切换。
- 已完成作品列表、作品详情弹窗、README、文件树和代码片段展示。
- 已完成点赞、收藏、特别关注的前端本地交互。
- 已完成简单管理员登录和本地内容管理雏形。
- 正在把占位 demo 替换成真实作品内容，让详情页更值得阅读。

## 后续计划

- 继续完善 Prompt Cards 等真实作品内容。
- 给管理后台增加更舒服的编辑体验，例如 Markdown 预览和代码片段排序。
- 后续考虑接入真实后端，让评论、收藏夹和特别关注可以跨设备保存。
- 增加更真实的作品预览区，让读者能同时看到创作说明和最终效果。
    `,
    codeSnippets: [
      {
        file: "script.js",
        title: "作品列表渲染",
        language: "JavaScript",
        code: `function renderWorksList() {
  if (!worksGrid) return;

  const visibleWorks = getVisibleWorks();
  updateWorkFilterUI();

  if (!visibleWorks.length) {
    worksGrid.innerHTML = \`
      <article class="works-empty glass-panel" aria-live="polite">
        <h3>这里还没有作品</h3>
        <p>可以先在作品卡片或详情页里标记收藏、特别关注，再回到这里查看。</p>
      </article>
    \`;
    return;
  }

  worksGrid.innerHTML = visibleWorks.map(renderWorkCard).join("");
  bindWorkCards();
}`
      },
      {
        file: "script.js",
        title: "作品详情弹窗填充",
        language: "JavaScript",
        code: `function openWorkDetail(workId) {
  const work = getWorkById(workId);
  if (!work || !workDetailModal) return;

  activeWorkId = workId;
  workDetailImage.src = work.coverImage?.trim() || getDefaultCoverImage();
  workDetailImage.alt = \`\${work.title} 作品主图预览\`;
  workDetailTitle.textContent = work.title;
  workDetailDate.textContent = formatDisplayDate(work.date);
  workDetailTags.innerHTML = (work.tags ?? [])
    .map((tag) => \`<span class="work-detail-tag">\${escapeHTML(tag)}</span>\`)
    .join("");
  workDetailReadme.innerHTML = createReadmeMarkup(work.readme);
  workDetailSnippets.innerHTML = createSnippetMarkup(work.codeSnippets ?? []);
  workDetailFiles.innerHTML = createFilesMarkup(work.fileTree);
  workDetailComments.innerHTML = createCommentsMarkup(work.comments ?? []);

  workLikeState = readWorkLikes();
  workStatusState = readWorkStatus();
  syncLikeUI(workId);
  syncWorkStatusUI(workId);

  workDetailModal.hidden = false;
  workDetailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  window.requestAnimationFrame(() => {
    workDetailModal.classList.add("is-open");
  });
}`
      },
      {
        file: "script.js",
        title: "关键代码片段渲染",
        language: "JavaScript",
        code: `function createSnippetMarkup(snippets) {
  const visibleSnippets = snippets.filter((snippet) => {
    return snippet && (snippet.title || snippet.file || snippet.code);
  });

  if (!visibleSnippets.length) {
    return \`
      <article class="code-snippet-empty glass-panel">
        <h4>暂未整理代码片段</h4>
        <p>这部分后面可以继续补上更精炼的实现片段。</p>
      </article>
    \`;
  }

  return visibleSnippets
    .map((snippet, index) => {
      const snippetTitle = snippet.title || \`代码片段 \${index + 1}\`;
      const snippetFile = snippet.file || "未命名文件";
      const snippetLanguage = snippet.language || "text";
      const snippetCode = snippet.code?.trim() || "// 这里暂时还没有填写完整代码内容。";

      return \`
        <article class="code-snippet-card">
          <div class="code-snippet-head">
            <div>
              <h4>\${escapeHTML(snippetTitle)}</h4>
              <p>\${escapeHTML(snippetFile)} · \${escapeHTML(snippetLanguage)}</p>
            </div>
          </div>
          <pre tabindex="0"><code>\${escapeHTML(snippetCode)}</code></pre>
        </article>
      \`;
    })
    .join("");
}`
      },
      {
        file: "script.js",
        title: "收藏与特别关注状态",
        language: "JavaScript",
        code: `function toggleWorkStatus(workId, action) {
  const work = getWorkById(workId);
  if (!work) return;

  const currentStatus = getWorkStatus(work);
  const nextStatus = {
    ...currentStatus,
    isCollected: action === "collect" ? !currentStatus.isCollected : currentStatus.isCollected,
    isFeatured: action === "feature" ? !currentStatus.isFeatured : currentStatus.isFeatured
  };

  workStatusState[workId] = nextStatus;
  writeWorkStatus(workStatusState);
  renderWorksList();

  if (activeWorkId === workId) {
    syncWorkStatusUI(workId);
  }
}`
      }
    ],
    fileTree: [
      { name: "README.md", type: "file", language: "Markdown" },
      { name: "index.html", type: "file", language: "HTML" },
      { name: "styles.css", type: "file", language: "CSS" },
      { name: "script.js", type: "file", language: "JavaScript" },
      { name: "worksData.js", type: "file", language: "JavaScript" },
      {
        name: "assets",
        type: "folder",
        children: [{ name: "preview.svg", type: "file", language: "Image" }]
      }
    ],
    likes: 0,
    isCollected: false,
    isFeatured: true,
    comments: [
      { author: "AY", time: "今天", text: "先把作品的结构和节奏收紧，之后再慢慢扩内容。" },
      { author: "Luna", time: "2小时前", text: "首页很安静，但作品详情一打开就有信息密度了。" },
      { author: "Ming", time: "昨天", text: "README 这种阅读方式很适合创作记录站。" }
    ]
  },
  {
    id: "prompt-cards",
    title: "Prompt Cards",
    date: "2026-07-19",
    tags: ["Prompt", "AI 协作", "卡片工具", "知识整理"],
    coverImage:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23fcfbf8'/%3E%3Cstop offset='1' stop-color='%23edf2ef'/%3E%3C/linearGradient%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='16' stdDeviation='18' flood-color='%23172433' flood-opacity='.14'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='640' height='360' rx='38' fill='url(%23bg)'/%3E%3Ccircle cx='110' cy='282' r='110' fill='%234a7c68' opacity='.1'/%3E%3Ccircle cx='520' cy='96' r='92' fill='%23d8c7b8' opacity='.28'/%3E%3Cg filter='url(%23s)'%3E%3Crect x='126' y='96' width='188' height='168' rx='26' fill='white' opacity='.74' stroke='white' stroke-width='2'/%3E%3Crect x='166' y='132' width='80' height='12' rx='6' fill='%234a7c68' opacity='.5'/%3E%3Crect x='166' y='166' width='108' height='9' rx='4.5' fill='%2394a3b8' opacity='.36'/%3E%3Crect x='166' y='190' width='86' height='9' rx='4.5' fill='%2394a3b8' opacity='.28'/%3E%3Crect x='236' y='78' width='196' height='192' rx='28' fill='white' opacity='.82' stroke='white' stroke-width='2'/%3E%3Crect x='280' y='122' width='86' height='14' rx='7' fill='%231f2937' opacity='.72'/%3E%3Crect x='280' y='162' width='112' height='10' rx='5' fill='%234a7c68' opacity='.42'/%3E%3Crect x='280' y='188' width='86' height='10' rx='5' fill='%2394a3b8' opacity='.3'/%3E%3Crect x='358' y='112' width='156' height='156' rx='24' fill='white' opacity='.68' stroke='white' stroke-width='2'/%3E%3Crect x='392' y='152' width='76' height='11' rx='5.5' fill='%23d8c7b8' opacity='.8'/%3E%3Crect x='392' y='184' width='92' height='9' rx='4.5' fill='%2394a3b8' opacity='.3'/%3E%3Crect x='392' y='208' width='70' height='9' rx='4.5' fill='%2394a3b8' opacity='.24'/%3E%3C/g%3E%3C/svg%3E",
    summary: "一个整理常用 Prompt、AI 协作方法和创作表达模板的卡片式小工具。",
    readme: `
# Prompt Cards

Prompt Cards 是一个用来整理提示词和 AI 协作方法的小工具。它的目标不是把 prompt 堆成一大篇文档，而是把常用表达拆成一张张可以复用、比较、修改的卡片。

## 核心想法

我在 Vibe Coding 里经常会反复使用一些结构：比如让 AI 先确认目标、限制不要新增复杂功能、要求输出 diff、要求保留现有视觉系统。它们不是一次性的输入，更像一组可以持续打磨的创作材料。

所以 Prompt Cards 会把这些材料卡片化。每张卡片只解决一个问题：定义角色、限制范围、描述视觉方向、生成代码、复盘 bug，或者把混乱想法整理成计划。

## 当前功能设想

- 按使用场景保存 Prompt，例如视觉优化、JS 交互、内容填充、代码审查。
- 每张卡片保留标题、标签、正文和简短说明。
- 支持快速复制，方便在不同项目里复用。
- 后续可以记录每张 Prompt 的实际使用效果。

## 后续计划

- 增加分类筛选和搜索。
- 增加收藏与常用标记。
- 增加复制按钮和编辑历史。
- 把真实使用过的 Vibe Coding 指令逐步整理进去。
    `,
    codeSnippets: [
      {
        file: "prompt-data.js",
        title: "Prompt 卡片数据结构",
        language: "JavaScript",
        code: `const promptCards = [
  {
    id: "visual-upgrade",
    title: "视觉升级指令",
    category: "UI",
    tags: ["液态玻璃", "简洁", "高端感"],
    description: "用于约束视觉方向，避免页面过度装饰。",
    prompt: "只优化样式，不改变现有 HTML 结构和功能逻辑。保持亮色液态玻璃风格，提升留白、层级和可读性。"
  },
  {
    id: "data-first",
    title: "数据结构先行",
    category: "Architecture",
    tags: ["作品数据", "可维护", "详情页"],
    description: "先定义作品数据，再让列表和详情统一读取。",
    prompt: "请先设计数组加对象的数据结构，字段覆盖 title、summary、readme、codeSnippets 和 fileTree。"
  }
];`
      },
      {
        file: "script.js",
        title: "按分类筛选 Prompt",
        language: "JavaScript",
        code: `function getVisiblePromptCards(activeCategory) {
  if (activeCategory === "all") {
    return promptCards;
  }

  return promptCards.filter((card) => {
    return card.category === activeCategory || card.tags.includes(activeCategory);
  });
}

function renderPromptCards(activeCategory = "all") {
  const visibleCards = getVisiblePromptCards(activeCategory);

  promptGrid.innerHTML = visibleCards
    .map((card) => \`
      <article class="prompt-card" data-prompt-id="\${card.id}">
        <p class="overline">\${card.category}</p>
        <h3>\${card.title}</h3>
        <p>\${card.description}</p>
      </article>
    \`)
    .join("");
}`
      }
    ],
    fileTree: [
      { name: "README.md", type: "file", language: "Markdown" },
      { name: "index.html", type: "file", language: "HTML" },
      { name: "prompt-data.js", type: "file", language: "JavaScript" },
      { name: "styles.css", type: "file", language: "CSS" }
    ],
    likes: 0,
    isCollected: false,
    isFeatured: false,
    comments: [
      { author: "Nora", time: "1小时前", text: "这种卡片式 prompt 整理会很适合日常积累。" },
      { author: "AY", time: "昨天", text: "先写最常用的，再慢慢补标签和检索。" },
      { author: "Echo", time: "前天", text: "内容密度刚好，不会太像仓库。" }
    ]
  },
  {
    id: "tiny-lab",
    title: "Tiny Lab",
    date: "2026-07-20",
    tags: ["交互实验", "UI Demo", "Prototype"],
    coverImage:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' rx='32' fill='%23eef1f4'/%3E%3Cpath d='M180 230 C250 100 390 100 460 230' stroke='%23cfd9df' stroke-width='28' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
    summary: "一个收集小型交互实验、界面动效和视觉想法的轻量实验室。",
    readme: `
# Tiny Lab

Tiny Lab 是我用来快速验证交互想法的小实验集合。

## 设计原则

每个实验只解决一个小问题，不追求复杂完整，重点是快速看到效果。

## 示例方向

- 按钮微交互
- 卡片 hover
- 液态玻璃组件
- 页面切换动画
    `,
    fileTree: [
      {
        name: "experiments",
        type: "folder",
        children: [
          { name: "glass-card.html", type: "file", language: "HTML" },
          { name: "hover-button.css", type: "file", language: "CSS" }
        ]
      },
      { name: "README.md", type: "file", language: "Markdown" }
    ],
    likes: 0,
    isCollected: false,
    isFeatured: true,
    comments: [
      { author: "AY", time: "今天", text: "小实验不一定完整，但必须足够干净。" },
      { author: "Kai", time: "3小时前", text: "这种页面很适合放动画和状态切换。" },
      { author: "Mina", time: "昨天", text: "像一个可持续更新的实验室目录。" }
    ]
  },
  {
    id: "ai-reading-notes",
    title: "AI Reading Notes",
    date: "2026-07-21",
    tags: ["阅读", "AI 总结", "知识管理"],
    coverImage:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' rx='32' fill='%23f1f2ef'/%3E%3Crect x='160' y='92' width='320' height='176' rx='26' fill='%23dce3d9'/%3E%3C/svg%3E",
    summary: "一个记录 AI 辅助阅读、批注和知识整理过程的作品原型。",
    readme: `
# AI Reading Notes

这个作品用于整理我和 AI 一起阅读文章、书籍、资料时产生的思考。

## 重点

不是单纯总结内容，而是记录我如何判断、筛选和吸收信息。

## 可能功能

- 阅读摘要
- 关键句摘录
- AI 批注
- 个人复盘
    `,
    fileTree: [
      { name: "reader.html", type: "file", language: "HTML" },
      { name: "notes.json", type: "file", language: "JSON" },
      { name: "summary.js", type: "file", language: "JavaScript" }
    ],
    likes: 0,
    isCollected: false,
    isFeatured: false,
    comments: [
      { author: "AY", time: "今天", text: "我想把阅读判断也当成作品的一部分来记录。" },
      { author: "June", time: "2小时前", text: "这种内容特别适合 README 式的讲述。" },
      { author: "Theo", time: "昨天", text: "文件列表和评论一起看，会很完整。" }
    ]
  }
];
