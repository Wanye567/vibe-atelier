// 元素获取
const navButtons = document.querySelectorAll(".nav-item[data-view]");
const viewPanels = document.querySelectorAll(".view-panel[data-panel]");
const viewKicker = document.querySelector("#viewKicker");
const viewTitle = document.querySelector("#viewTitle");
const viewContent = document.querySelector("#viewContent");

// 视图映射
const viewMeta = {
  home: { kicker: "welcome", title: "先快速了解我在做什么" },
  story: { kicker: "idea", title: "创作理念与灵感来源" },
  works: { kicker: "gallery", title: "全部作品记录" },
  process: { kicker: "log", title: "完整制作流程记录" },
  feedback: { kicker: "message", title: "评论与建议收集" },
  admin: { kicker: "admin", title: "管理后台" }
};

const storageKey = "vibe-atelier-current-view";
const adminAuthStorageKey = "vibe-atelier-admin-auth";
const fadeMs = 250;
let currentView = "home";
let isSwitching = false;

const adminCredentials = {
  username: "admin",
  password: "123456"
};

const authModal = document.querySelector("#authModal");
const authForm = document.querySelector("#authForm");
const authUsername = document.querySelector("#authUsername");
const authPassword = document.querySelector("#authPassword");
const authError = document.querySelector("#authError");
const loginTrigger = document.querySelector("#loginTrigger");
const adminLogoutBtn = document.querySelector("#adminLogoutBtn");

function isAdminLoggedIn() {
  return localStorage.getItem(adminAuthStorageKey) === "true";
}

function updateAdminAccessUI() {
  const isLoggedIn = isAdminLoggedIn();

  if (loginTrigger) {
    loginTrigger.textContent = isLoggedIn ? "已登录后台" : "管理员登录";
    loginTrigger.setAttribute("aria-label", isLoggedIn ? "打开管理后台" : "打开管理员登录窗口");
  }
}

function openAuthModal() {
  if (!authModal) return;

  authModal.hidden = false;
  authModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  authError.hidden = true;
  authError.textContent = "";

  window.requestAnimationFrame(() => {
    authModal.classList.add("is-open");
    authUsername?.focus();
  });
}

function closeAuthModal() {
  if (!authModal || authModal.hidden) return;

  authModal.classList.remove("is-open");
  authModal.setAttribute("aria-hidden", "true");
  authModal.hidden = true;
  document.body.classList.remove("modal-open");
  authForm?.reset();
}

function handleAdminLogin(event) {
  event.preventDefault();

  const username = authUsername?.value.trim() ?? "";
  const password = authPassword?.value ?? "";

  if (username !== adminCredentials.username || password !== adminCredentials.password) {
    authError.textContent = "账号或密码不正确";
    authError.hidden = false;
    return;
  }

  localStorage.setItem(adminAuthStorageKey, "true");
  updateAdminAccessUI();
  closeAuthModal();
  switchView("admin");
}

function logoutAdmin() {
  localStorage.removeItem(adminAuthStorageKey);
  updateAdminAccessUI();

  if (currentView === "admin") {
    switchView("home");
  }
}

function showLoading() {
  viewContent.setAttribute("aria-busy", "true");
  if (!viewContent.querySelector(".loading-hint")) {
    const loading = document.createElement("p");
    loading.className = "loading-hint";
    loading.textContent = "正在切换内容...";
    viewContent.appendChild(loading);
  }
}

function hideLoading() {
  viewContent.removeAttribute("aria-busy");
  viewContent.querySelector(".loading-hint")?.remove();
}

function applyView(viewName, shouldStore = true) {
  if (viewName === "admin" && !isAdminLoggedIn()) {
    viewName = "home";
  }

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  viewPanels.forEach((panel) => {
    const isTarget = panel.dataset.panel === viewName;
    panel.hidden = !isTarget;
    panel.classList.toggle("active", isTarget);
    panel.classList.remove("is-fading");
  });

  viewKicker.textContent = viewMeta[viewName].kicker;
  viewTitle.textContent = viewMeta[viewName].title;
  document.body.dataset.view = viewName;
  currentView = viewName;

  if (shouldStore) {
    localStorage.setItem(storageKey, viewName);
  }
}

// 切换函数
function switchView(viewName) {
  if (viewName === "admin" && !isAdminLoggedIn()) {
    openAuthModal();
    return;
  }

  if (!viewMeta[viewName] || viewName === currentView || isSwitching) return;

  isSwitching = true;
  showLoading();

  const activePanel = document.querySelector(`.view-panel.active[data-panel="${currentView}"]`);
  activePanel?.classList.add("is-fading");

  window.setTimeout(() => {
    viewPanels.forEach((panel) => {
      const isTarget = panel.dataset.panel === viewName;
      panel.hidden = !isTarget;
      panel.classList.toggle("active", isTarget);
      panel.classList.toggle("is-fading", isTarget);
    });

    viewKicker.textContent = viewMeta[viewName].kicker;
    viewTitle.textContent = viewMeta[viewName].title;
    document.body.dataset.view = viewName;
    navButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.view === viewName);
    });
    localStorage.setItem(storageKey, viewName);
    currentView = viewName;

    hideLoading();
    isSwitching = false;

    const targetPanel = document.querySelector(`.view-panel.active[data-panel="${viewName}"]`);
    window.requestAnimationFrame(() => targetPanel?.classList.remove("is-fading"));
  }, fadeMs);
}

// 本地存储初始化
function initView() {
  const savedView = localStorage.getItem(storageKey);
  const initialView = viewMeta[savedView] ? savedView : "home";
  updateAdminAccessUI();
  applyView(initialView, false);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

loginTrigger?.addEventListener("click", () => {
  if (isAdminLoggedIn()) {
    switchView("admin");
    return;
  }

  openAuthModal();
});

adminLogoutBtn?.addEventListener("click", logoutAdmin);
authForm?.addEventListener("submit", handleAdminLogin);

authModal?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("[data-auth-close]")) {
    closeAuthModal();
  }
});

initView();

// 作品详情弹窗
const worksGrid = document.querySelector(".works-grid");
const workDetailModal = document.querySelector("#workDetailModal");
const workDetailImage = document.querySelector("#workDetailImage");
const workDetailTitle = document.querySelector("#workDetailTitle");
const workDetailDate = document.querySelector("#workDetailDate");
const workDetailTags = document.querySelector("#workDetailTags");
const workDetailLikeCount = document.querySelector("#workDetailLikeCount");
const workDetailCommentCount = document.querySelector("#workDetailCommentCount");
const workDetailReadme = document.querySelector("#workDetailReadme");
const workDetailSnippets = document.querySelector("#workDetailSnippets");
const workDetailFiles = document.querySelector("#workDetailFiles");
const workDetailComments = document.querySelector("#workDetailComments");
const workDetailLikeButton = document.querySelector("#workDetailLikeButton");
const workDetailLikeButtonCount = document.querySelector("#workDetailLikeButtonCount");
const workDetailCollectButton = document.querySelector("#workDetailCollectButton");
const workDetailFeatureButton = document.querySelector("#workDetailFeatureButton");
const workFilterButtons = document.querySelectorAll(".work-filter-btn[data-work-filter]");
const workCountAll = document.querySelector("#workCountAll");
const workCountCollected = document.querySelector("#workCountCollected");
const workCountFeatured = document.querySelector("#workCountFeatured");
const worksFilterHint = document.querySelector("#worksFilterHint");
const adminAddWorkBtn = document.querySelector("#adminAddWorkBtn");
const adminWorkList = document.querySelector("#adminWorkList");
const workEditorModal = document.querySelector("#workEditorModal");
const workEditorForm = document.querySelector("#workEditorForm");
const workEditorTitle = document.querySelector("#workEditorTitle");
const workEditorId = document.querySelector("#workEditorId");
const workEditorTitleInput = document.querySelector("#workEditorTitleInput");
const workEditorDate = document.querySelector("#workEditorDate");
const workEditorTags = document.querySelector("#workEditorTags");
const workEditorCover = document.querySelector("#workEditorCover");
const workEditorSummary = document.querySelector("#workEditorSummary");
const workEditorReadme = document.querySelector("#workEditorReadme");
const workEditorFileTree = document.querySelector("#workEditorFileTree");
const workEditorError = document.querySelector("#workEditorError");
const addSnippetBtn = document.querySelector("#addSnippetBtn");
const snippetEditorList = document.querySelector("#snippetEditorList");

const workLikeStorageKey = "vibe-atelier-work-likes";
const workStatusStorageKey = "vibe-atelier-work-status";
const managedWorksStorageKey = "vibe-atelier-managed-works";
const defaultWorks = typeof worksData !== "undefined" && Array.isArray(worksData) ? worksData : [];
const isDevelopmentMode =
  window.location.protocol === "file:" ||
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

workDetailImage?.addEventListener("error", () => {
  const fallbackCover = getDefaultCoverImage();

  if (workDetailImage.src === fallbackCover) return;
  workDetailImage.src = fallbackCover;
});

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function hasMeaningfulSnippetContent(snippets) {
  return Array.isArray(snippets) && snippets.some((snippet) => String(snippet?.code ?? "").trim().length > 0);
}

function mergeWorkRecord(baseWork, savedWork) {
  if (!baseWork) return cloneData(savedWork);
  if (!savedWork || typeof savedWork !== "object") return cloneData(baseWork);

  const merged = cloneData(baseWork);

  Object.entries(savedWork).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      if (key === "codeSnippets") {
        merged[key] = hasMeaningfulSnippetContent(value) ? cloneData(value) : cloneData(baseWork[key] ?? []);
        return;
      }

      if (key === "fileTree") {
        merged[key] = value.length ? cloneData(value) : cloneData(baseWork[key] ?? []);
        return;
      }

      merged[key] = cloneData(value);
      return;
    }

    if (typeof value === "string") {
      merged[key] = value.trim() || merged[key] || "";
      return;
    }

    merged[key] = cloneData(value);
  });

  if (!Array.isArray(merged.codeSnippets) || !merged.codeSnippets.length) {
    merged.codeSnippets = cloneData(baseWork.codeSnippets ?? []);
  }

  if (!merged.coverImage?.trim()) {
    merged.coverImage = baseWork.coverImage ?? getDefaultCoverImage();
  }

  return merged;
}

function readManagedWorks() {
  try {
    const savedWorks = JSON.parse(localStorage.getItem(managedWorksStorageKey));
    if (!Array.isArray(savedWorks) || !savedWorks.length) {
      return cloneData(defaultWorks);
    }

    if (!isDevelopmentMode) {
      return savedWorks;
    }

    const savedById = new Map(savedWorks.filter((work) => work && work.id).map((work) => [work.id, work]));
    const mergedWorks = defaultWorks.map((work) => mergeWorkRecord(work, savedById.get(work.id)));
    const extraWorks = savedWorks
      .filter((work) => work && work.id && !defaultWorks.some((baseWork) => baseWork.id === work.id))
      .map((work) => cloneData(work));

    return [...mergedWorks, ...extraWorks];
  } catch {
    return cloneData(defaultWorks);
  }
}

const allWorks = readManagedWorks();

function saveManagedWorks() {
  localStorage.setItem(managedWorksStorageKey, JSON.stringify(allWorks));
}

function readWorkLikes() {
  try {
    return JSON.parse(localStorage.getItem(workLikeStorageKey)) ?? {};
  } catch {
    return {};
  }
}

function writeWorkLikes(value) {
  localStorage.setItem(workLikeStorageKey, JSON.stringify(value));
}

function readWorkStatus() {
  try {
    return JSON.parse(localStorage.getItem(workStatusStorageKey)) ?? {};
  } catch {
    return {};
  }
}

function writeWorkStatus(value) {
  localStorage.setItem(workStatusStorageKey, JSON.stringify(value));
}

let workLikeState = readWorkLikes();
let workStatusState = readWorkStatus();
let activeWorkId = null;
let activeWorkFilter = "all";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getWorkById(workId) {
  return allWorks.find((work) => work.id === workId);
}

function getDefaultWorkById(workId) {
  return defaultWorks.find((work) => work.id === workId);
}

function getDisplayCodeSnippets(work) {
  const snippets = Array.isArray(work.codeSnippets) ? work.codeSnippets : [];

  if (hasMeaningfulSnippetContent(snippets)) {
    return snippets;
  }

  const defaultWork = getDefaultWorkById(work.id);
  const defaultSnippets = Array.isArray(defaultWork?.codeSnippets) ? defaultWork.codeSnippets : [];

  return hasMeaningfulSnippetContent(defaultSnippets) ? defaultSnippets : snippets;
}

function getWorkStatus(work) {
  return {
    isCollected: workStatusState[work.id]?.isCollected ?? work.isCollected ?? false,
    isFeatured: workStatusState[work.id]?.isFeatured ?? work.isFeatured ?? false
  };
}

function getVisibleWorks() {
  return allWorks.filter((work) => {
    const status = getWorkStatus(work);

    if (activeWorkFilter === "collected") return status.isCollected;
    if (activeWorkFilter === "featured") return status.isFeatured;
    return true;
  });
}

function formatDisplayDate(date) {
  return date.replaceAll("-", ".");
}

function renderWorkCard(work) {
  const status = getWorkStatus(work);
  const badges = [
    status.isFeatured ? `<span class="work-status-badge">特别关注</span>` : "",
    status.isCollected ? `<span class="work-status-badge">已收藏</span>` : ""
  ].join("");

  return `
    <article class="work-card" data-work-id="${escapeHTML(work.id)}" aria-label="作品 ${escapeHTML(work.title)}">
      <figure class="work-cover">
        <img src="${escapeHTML(work.coverImage)}" alt="${escapeHTML(work.title)} 作品预览图" loading="lazy" />
      </figure>
      <div class="work-card-topline">
        <div class="work-card-badges" aria-label="作品状态">${badges}</div>
        <div class="work-card-actions" aria-label="作品快捷操作">
          <button class="work-card-action ${status.isCollected ? "is-active" : ""}" type="button" data-work-action="collect" aria-pressed="${status.isCollected}" aria-label="${status.isCollected ? "取消收藏" : "收藏"} ${escapeHTML(work.title)}">
            ${status.isCollected ? "★" : "☆"}
          </button>
          <button class="work-card-action ${status.isFeatured ? "is-active" : ""}" type="button" data-work-action="feature" aria-pressed="${status.isFeatured}" aria-label="${status.isFeatured ? "取消特别关注" : "特别关注"} ${escapeHTML(work.title)}">
            ${status.isFeatured ? "✦" : "◇"}
          </button>
        </div>
      </div>
      <h3>${escapeHTML(work.title)}</h3>
      <p>${escapeHTML(work.summary)}</p>
      <time datetime="${escapeHTML(work.date)}">${escapeHTML(formatDisplayDate(work.date))}</time>
    </article>
  `;
}

function updateWorkFilterUI() {
  const collectedCount = allWorks.filter((work) => getWorkStatus(work).isCollected).length;
  const featuredCount = allWorks.filter((work) => getWorkStatus(work).isFeatured).length;

  if (workCountAll) workCountAll.textContent = String(allWorks.length);
  if (workCountCollected) workCountCollected.textContent = String(collectedCount);
  if (workCountFeatured) workCountFeatured.textContent = String(featuredCount);

  workFilterButtons.forEach((button) => {
    const isActive = button.dataset.workFilter === activeWorkFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (!worksFilterHint) return;

  const hintMap = {
    all: "展示全部作品",
    collected: collectedCount ? "只看已收藏作品" : "还没有收藏作品",
    featured: featuredCount ? "只看特别关注作品" : "还没有特别关注作品"
  };

  worksFilterHint.textContent = hintMap[activeWorkFilter];
}

function renderWorksList() {
  if (!worksGrid) return;

  const visibleWorks = getVisibleWorks();
  updateWorkFilterUI();

  if (!visibleWorks.length) {
    worksGrid.innerHTML = `
      <article class="works-empty glass-panel" aria-live="polite">
        <h3>这里还没有作品</h3>
        <p>可以先在作品卡片或详情页里标记收藏、特别关注，再回到这里查看。</p>
      </article>
    `;
    return;
  }

  worksGrid.innerHTML = visibleWorks.map(renderWorkCard).join("");

  bindWorkCards();
}

function refreshWorkViews() {
  renderWorksList();
  renderAdminWorkList();

  if (activeWorkId && getWorkById(activeWorkId)) {
    openWorkDetail(activeWorkId);
  }
}

function renderAdminWorkList() {
  if (!adminWorkList) return;

  if (!allWorks.length) {
    adminWorkList.innerHTML = `
      <article class="timeline-item admin-work-row">
        <h3>还没有作品</h3>
        <p>点击“新增作品”开始添加第一条记录。</p>
      </article>
    `;
    return;
  }

  adminWorkList.innerHTML = allWorks
    .map(
      (work) => `
        <article class="timeline-item admin-work-row" data-admin-work-id="${escapeHTML(work.id)}">
          <div class="admin-work-main">
            <h3>${escapeHTML(work.title)}</h3>
            <p>${escapeHTML(work.summary)}</p>
            <div class="work-card-badges" aria-label="作品标签">
              ${(work.tags ?? []).map((tag) => `<span class="work-status-badge">${escapeHTML(tag)}</span>`).join("")}
            </div>
          </div>
          <div class="admin-work-meta">
            <time datetime="${escapeHTML(work.date)}">${escapeHTML(formatDisplayDate(work.date))}</time>
            <div class="work-detail-actions">
              <button class="work-action-btn" type="button" data-admin-action="edit" data-admin-work-id="${escapeHTML(work.id)}">编辑</button>
              <button class="work-action-btn" type="button" data-admin-action="delete" data-admin-work-id="${escapeHTML(work.id)}">删除</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function createWorkId(title) {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const fallback = `work-${Date.now()}`;
  const seed = base || fallback;
  let nextId = seed;
  let index = 2;

  while (getWorkById(nextId)) {
    nextId = `${seed}-${index}`;
    index += 1;
  }

  return nextId;
}

function getDefaultCoverImage() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' rx='32' fill='%23eef2f5'/%3E%3Ccircle cx='320' cy='180' r='58' fill='%23d9e4e0'/%3E%3C/svg%3E";
}

function openWorkEditor(workId = null) {
  if (!workEditorModal || !workEditorForm) return;

  const work = workId ? getWorkById(workId) : null;
  workEditorForm.reset();
  workEditorError.hidden = true;
  workEditorError.textContent = "";
  snippetEditorList.innerHTML = "";

  workEditorTitle.textContent = work ? "编辑作品" : "新增作品";
  workEditorId.value = work?.id ?? "";
  workEditorTitleInput.value = work?.title ?? "";
  workEditorDate.value = work?.date ?? new Date().toISOString().slice(0, 10);
  workEditorTags.value = (work?.tags ?? []).join(", ");
  workEditorCover.value = work?.coverImage ?? getDefaultCoverImage();
  workEditorSummary.value = work?.summary ?? "";
  workEditorReadme.value = work?.readme?.trim() ?? "# 新作品\n\n这里写作品介绍。";
  workEditorFileTree.value = JSON.stringify(
    work?.fileTree ?? [{ name: "README.md", type: "file", language: "Markdown" }],
    null,
    2
  );

  (work?.codeSnippets ?? []).forEach((snippet) => addSnippetEditor(snippet));

  if (!snippetEditorList.children.length) {
    addSnippetEditor();
  }

  workEditorModal.hidden = false;
  workEditorModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  window.requestAnimationFrame(() => {
    workEditorModal.classList.add("is-open");
    workEditorTitleInput.focus();
  });
}

function closeWorkEditor() {
  if (!workEditorModal || workEditorModal.hidden) return;

  workEditorModal.classList.remove("is-open");
  workEditorModal.setAttribute("aria-hidden", "true");
  workEditorModal.hidden = true;
  document.body.classList.remove("modal-open");
  workEditorForm?.reset();
}

function addSnippetEditor(snippet = {}) {
  if (!snippetEditorList) return;

  const snippetItem = document.createElement("article");
  snippetItem.className = "timeline-item admin-snippet-item";
  snippetItem.innerHTML = `
    <div class="section-head">
      <div>
        <p class="overline">snippet</p>
        <h3>代码片段</h3>
      </div>
      <button class="work-action-btn" type="button" data-snippet-remove>删除片段</button>
    </div>
    <div class="admin-form-grid">
      <label class="auth-field">
        <span>file</span>
        <input type="text" data-snippet-field="file" value="${escapeHTML(snippet.file ?? "")}" />
      </label>
      <label class="auth-field">
        <span>title</span>
        <input type="text" data-snippet-field="title" value="${escapeHTML(snippet.title ?? "")}" />
      </label>
      <label class="auth-field">
        <span>language</span>
        <input type="text" data-snippet-field="language" value="${escapeHTML(snippet.language ?? "JavaScript")}" />
      </label>
      <label class="auth-field admin-form-wide">
        <span>code</span>
        <textarea rows="8" data-snippet-field="code">${escapeHTML(snippet.code ?? "")}</textarea>
      </label>
    </div>
  `;

  snippetEditorList.appendChild(snippetItem);
}

function collectSnippetEditors() {
  return Array.from(snippetEditorList?.querySelectorAll(".admin-snippet-item") ?? [])
    .map((item) => {
      const getField = (field) => item.querySelector(`[data-snippet-field="${field}"]`)?.value.trim() ?? "";

      return {
        file: getField("file"),
        title: getField("title"),
        language: getField("language"),
        code: item.querySelector('[data-snippet-field="code"]')?.value ?? ""
      };
    })
    .filter((snippet) => snippet.file || snippet.title || snippet.code);
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function handleWorkEditorSubmit(event) {
  event.preventDefault();

  try {
    const editingId = workEditorId.value;
    const title = workEditorTitleInput.value.trim();
    const fileTree = JSON.parse(workEditorFileTree.value || "[]");

    if (!title) {
      throw new Error("标题不能为空");
    }

    if (!Array.isArray(fileTree)) {
      throw new Error("fileTree 必须是 JSON 数组");
    }

    const existingWork = editingId ? getWorkById(editingId) : null;
    const savedWork = {
      ...(existingWork ?? {}),
      id: editingId || createWorkId(title),
      title,
      date: workEditorDate.value,
      tags: parseTags(workEditorTags.value),
      coverImage: workEditorCover.value.trim() || getDefaultCoverImage(),
      summary: workEditorSummary.value.trim(),
      readme: workEditorReadme.value,
      codeSnippets: collectSnippetEditors(),
      fileTree,
      likes: existingWork?.likes ?? 0,
      isCollected: existingWork?.isCollected ?? false,
      isFeatured: existingWork?.isFeatured ?? false,
      comments: existingWork?.comments ?? []
    };

    if (existingWork) {
      const index = allWorks.findIndex((work) => work.id === editingId);
      allWorks.splice(index, 1, savedWork);
    } else {
      allWorks.unshift(savedWork);
    }

    saveManagedWorks();
    closeWorkEditor();
    refreshWorkViews();
  } catch (error) {
    workEditorError.textContent = error.message || "保存失败，请检查表单内容";
    workEditorError.hidden = false;
  }
}

function deleteManagedWork(workId) {
  const work = getWorkById(workId);
  if (!work) return;

  const shouldDelete = window.confirm(`确认删除「${work.title}」吗？`);
  if (!shouldDelete) return;

  const index = allWorks.findIndex((item) => item.id === workId);
  allWorks.splice(index, 1);
  saveManagedWorks();

  if (activeWorkId === workId) {
    closeWorkDetail();
  }

  refreshWorkViews();
}

function createReadmeMarkup(markdown) {
  const lines = markdown.trim().split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];

  function flushParagraph() {
    if (!paragraph.length) return;

    blocks.push(`<p>${escapeHTML(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!listItems.length) return;

    blocks.push(`<ul>${listItems.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h4>${escapeHTML(line.slice(2))}</h4>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h4>${escapeHTML(line.slice(3))}</h4>`);
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return `<article class="readme-block">${blocks.join("")}</article>`;
}

function getFileIcon(file) {
  if (file.type === "folder") return "DIR";

  const language = file.language?.toLowerCase() ?? "";
  if (language.includes("html")) return "HTML";
  if (language.includes("css")) return "{}";
  if (language.includes("javascript")) return "JS";
  if (language.includes("json")) return "{}";
  if (language.includes("markdown")) return "MD";
  if (language.includes("image")) return "IMG";
  return "FILE";
}

function createFilesMarkup(files, depth = 0) {
  return files
    .map((file) => {
      const label = file.type === "folder" ? "folder" : file.language ?? "file";
      const row = `
        <div class="file-row" role="listitem" aria-label="${escapeHTML(file.name)}，${escapeHTML(label)}" style="--file-depth: ${depth}">
          <div class="file-name">
            <span class="file-icon" aria-hidden="true">${escapeHTML(getFileIcon(file))}</span>
            <span>${escapeHTML(file.name)}</span>
          </div>
          <span class="file-type">${escapeHTML(label)}</span>
        </div>
      `;

      if (file.type === "folder" && Array.isArray(file.children)) {
        return row + createFilesMarkup(file.children, depth + 1);
      }

      return row;
    })
    .join("");
}

function createCommentsMarkup(comments) {
  return comments
    .map(
      (comment) => `
        <article class="comment-card">
          <div class="comment-meta">
            <span class="comment-author">${escapeHTML(comment.author)}</span>
            <span class="comment-time">${escapeHTML(comment.time)}</span>
          </div>
          <p>${escapeHTML(comment.text)}</p>
        </article>
      `
    )
    .join("");
}

function createSnippetMarkup(snippets) {
  const visibleSnippets = snippets.filter((snippet) => snippet && (snippet.title || snippet.file || snippet.code));

  if (!visibleSnippets.length) {
    return `
      <article class="code-snippet-empty glass-panel">
        <h4>暂未整理代码片段</h4>
        <p>这部分后面可以继续补上更精炼的实现片段。</p>
      </article>
    `;
  }

  return visibleSnippets
    .map(
      (snippet, index) => {
        const snippetTitle = snippet.title || `代码片段 ${index + 1}`;
        const snippetFile = snippet.file || "未命名文件";
        const snippetLanguage = snippet.language || "text";
        const snippetCode = snippet.code?.trim() || "// 这里暂时还没有填写完整代码内容。";
        const hasCode = Boolean(snippet.code?.trim());

        return `
        <article class="code-snippet-card ${hasCode ? "has-code" : "is-empty-code"}">
          <div class="code-snippet-head">
            <div>
              <h4>${escapeHTML(snippetTitle)}</h4>
              <p>${escapeHTML(snippetFile)} · ${escapeHTML(snippetLanguage)}</p>
            </div>
          </div>
          <pre class="code-snippet-codeblock" tabindex="0"><code>${escapeHTML(snippetCode)}</code></pre>
        </article>
      `;
      }
    )
    .join("");
}

function syncLikeUI(workId) {
  const work = getWorkById(workId);
  if (!work) return;

  const storedLikes = Number(workLikeState[workId]);
  const currentLikes = Number.isFinite(storedLikes) && storedLikes >= work.likes ? storedLikes : work.likes;
  const isLiked = currentLikes > work.likes;

  workDetailLikeCount.textContent = String(currentLikes);
  workDetailLikeButtonCount.textContent = String(currentLikes);
  workDetailCommentCount.textContent = String(work.comments?.length ?? 0);
  workDetailLikeButton.classList.toggle("is-liked", isLiked);
}

function syncWorkStatusUI(workId) {
  const work = getWorkById(workId);
  if (!work) return;

  const status = getWorkStatus(work);

  if (workDetailCollectButton) {
    workDetailCollectButton.classList.toggle("is-active", status.isCollected);
    workDetailCollectButton.setAttribute("aria-pressed", String(status.isCollected));
    workDetailCollectButton.setAttribute("aria-label", status.isCollected ? "取消收藏作品" : "收藏作品");
    workDetailCollectButton.querySelector("span:first-child").textContent = status.isCollected ? "★" : "☆";
    workDetailCollectButton.querySelector("span:last-child").textContent = status.isCollected ? "已收藏" : "收藏";
  }

  if (workDetailFeatureButton) {
    workDetailFeatureButton.classList.toggle("is-active", status.isFeatured);
    workDetailFeatureButton.setAttribute("aria-pressed", String(status.isFeatured));
    workDetailFeatureButton.setAttribute("aria-label", status.isFeatured ? "取消特别关注作品" : "特别关注作品");
    workDetailFeatureButton.querySelector("span:first-child").textContent = status.isFeatured ? "✦" : "◇";
    workDetailFeatureButton.querySelector("span:last-child").textContent = status.isFeatured ? "已关注" : "关注";
  }
}

function openWorkDetail(workId) {
  const work = getWorkById(workId);
  if (!work || !workDetailModal) return;

  activeWorkId = workId;
  workDetailImage.src = work.coverImage?.trim() || getDefaultCoverImage();
  workDetailImage.alt = `${work.title} 作品主图预览`;
  workDetailTitle.textContent = work.title;
  workDetailDate.textContent = formatDisplayDate(work.date);
  workDetailTags.innerHTML = (work.tags ?? []).map((tag) => `<span class="work-detail-tag">${escapeHTML(tag)}</span>`).join("");
  workDetailReadme.innerHTML = createReadmeMarkup(work.readme);
  workDetailSnippets.innerHTML = createSnippetMarkup(getDisplayCodeSnippets(work));
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
}

function closeWorkDetail() {
  if (!workDetailModal || workDetailModal.hidden) return;

  workDetailModal.classList.remove("is-open");
  workDetailModal.setAttribute("aria-hidden", "true");
  workDetailModal.hidden = true;
  document.body.classList.remove("modal-open");
  activeWorkId = null;
}

function bindWorkCards() {
  document.querySelectorAll(".work-card[data-work-id]").forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const label = card.getAttribute("aria-label") ?? "作品卡片";
    card.setAttribute("aria-label", `${label}，按回车打开详情`);

    card.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const actionButton = target?.closest("[data-work-action]");

      if (actionButton) {
        event.stopPropagation();
        toggleWorkStatus(card.dataset.workId, actionButton.dataset.workAction);
        return;
      }

      openWorkDetail(card.dataset.workId);
    });
    card.addEventListener("keydown", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-work-action]")) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWorkDetail(card.dataset.workId);
      }
    });
  });
}

function toggleWorkStatus(workId, action) {
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
}

workFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.workFilter === activeWorkFilter) return;

    activeWorkFilter = button.dataset.workFilter;
    renderWorksList();
  });
});

adminAddWorkBtn?.addEventListener("click", () => openWorkEditor());
workEditorForm?.addEventListener("submit", handleWorkEditorSubmit);
addSnippetBtn?.addEventListener("click", () => addSnippetEditor());

adminWorkList?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const actionButton = target?.closest("[data-admin-action]");
  if (!actionButton) return;

  const workId = actionButton.dataset.adminWorkId;

  if (actionButton.dataset.adminAction === "edit") {
    openWorkEditor(workId);
  }

  if (actionButton.dataset.adminAction === "delete") {
    deleteManagedWork(workId);
  }
});

snippetEditorList?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const removeButton = target?.closest("[data-snippet-remove]");
  if (!removeButton) return;

  removeButton.closest(".admin-snippet-item")?.remove();
});

workEditorModal?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("[data-work-editor-close]")) {
    closeWorkEditor();
  }
});

workDetailModal?.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const closeTrigger = target?.closest("[data-work-detail-close]");
  if (closeTrigger) {
    closeWorkDetail();
  }
});

workDetailLikeButton?.addEventListener("click", () => {
  if (!activeWorkId) return;

  const work = getWorkById(activeWorkId);
  if (!work) return;

  const currentLikes = Number(workLikeState[activeWorkId]);
  const nextLikes = Number.isFinite(currentLikes) && currentLikes >= work.likes ? currentLikes + 1 : work.likes + 1;

  workLikeState[activeWorkId] = nextLikes;
  writeWorkLikes(workLikeState);
  syncLikeUI(activeWorkId);
});

workDetailCollectButton?.addEventListener("click", () => {
  if (!activeWorkId) return;
  toggleWorkStatus(activeWorkId, "collect");
});

workDetailFeatureButton?.addEventListener("click", () => {
  if (!activeWorkId) return;
  toggleWorkStatus(activeWorkId, "feature");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && workEditorModal && !workEditorModal.hidden) {
    closeWorkEditor();
    return;
  }

  if (event.key === "Escape" && authModal && !authModal.hidden) {
    closeAuthModal();
    return;
  }

  if (event.key === "Escape" && workDetailModal && !workDetailModal.hidden) {
    closeWorkDetail();
  }
});

renderWorksList();
renderAdminWorkList();
