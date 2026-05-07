/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */

const NODES = [
  {
    id: 'collect',
    label: 'Veri Toplama',
    icon: '🗄️',
    color: '#3b82f6',
    x: 400, y: 60,
    badge: 'Aşama 1',
    desc: 'Ham veriyi iç veya dış kaynaklardan toplayarak analiz sürecine hazır hale getirme aşamasıdır. Verinin kalitesi burada belirlenir.',
    steps: [
      'Veri kaynakları belirlenir (API, DB, CSV, web scraping)',
      'Veri toplama yöntemi seçilir',
      'Veriler tek bir havuzda birleştirilir',
      'Veri boyutu ve türü doğrulanır',
      'Ham veri yedeklenir',
    ],
    tools: ['Python', 'SQL', 'Pandas', 'BeautifulSoup', 'APIs'],
  },
  {
    id: 'clean',
    label: 'Veri Temizleme',
    icon: '🧹',
    color: '#8b5cf6',
    x: 180, y: 200,
    badge: 'Aşama 2a',
    desc: 'Eksik değerlerin, aykırı gözlemlerin ve tutarsızlıkların giderildiği kritik aşamadır. Çoğu zaman analistin zamanının %80\'ini alır.',
    steps: [
      'Eksik değerler (NaN) tespit edilir',
      'Doldurma stratejisi seçilir (medyan, mod, silme)',
      'Aykırı değerler (outlier) analiz edilir',
      'Veri tipleri düzenlenir (dtype dönüşümü)',
      'Duplike satırlar kaldırılır',
      'Tutarsız kategorik değerler normalize edilir',
    ],
    tools: ['Pandas', 'NumPy', 'Missingno', 'PyOD'],
  },
  {
    id: 'transform',
    label: 'Dönüştürme',
    icon: '⚙️',
    color: '#06b6d4',
    x: 620, y: 200,
    badge: 'Aşama 2b',
    desc: 'Verinin model veya analize uygun forma sokulduğu aşamadır. Özellik mühendisliği de bu kapsamda değerlendirilir.',
    steps: [
      'Normalizasyon/Standardizasyon uygulanır',
      'Kategorik değişkenler encode edilir (One-Hot, Label)',
      'Yeni türetilmiş özellikler oluşturulur',
      'Boyut indirgeme uygulanır (PCA, t-SNE)',
      'Zaman serisi için lag özellikleri eklenir',
    ],
    tools: ['Scikit-learn', 'FeatureTools', 'Pandas'],
  },
  {
    id: 'eda',
    label: 'Keşifsel Analiz',
    icon: '🔍',
    color: '#f59e0b',
    x: 400, y: 300,
    badge: 'Aşama 3',
    desc: 'EDA (Exploratory Data Analysis) — verinin dağılımını, ilişkilerini ve örüntülerini anlamak için yapılan görsel ve istatistiksel incelemedir.',
    steps: [
      'Tanımlayıcı istatistikler hesaplanır (mean, std, quartile)',
      'Dağılım grafikleri çizilir (histogram, boxplot)',
      'Korelasyon matrisi oluşturulur',
      'Hedef değişken ile bağımsız değişkenler karşılaştırılır',
      'Hipotez testleri yapılır',
    ],
    tools: ['Matplotlib', 'Seaborn', 'Plotly', 'Pandas Profiling', 'SweetViz'],
  },
  {
    id: 'model',
    label: 'Modelleme',
    icon: '🤖',
    color: '#10b981',
    x: 400, y: 420,
    badge: 'Aşama 4',
    desc: 'EDA bulgularına göre uygun makine öğrenmesi veya istatistiksel modelin seçilip eğitildiği aşamadır.',
    steps: [
      'Problem türü belirlenir (sınıflandırma, regresyon, kümeleme)',
      'Eğitim/test seti ayrılır (train-test split)',
      'Temel model (baseline) kurulur',
      'Hiperparametre optimizasyonu yapılır',
      'Cross-validation ile genelleme ölçülür',
    ],
    tools: ['Scikit-learn', 'XGBoost', 'LightGBM', 'TensorFlow', 'PyTorch'],
  },
  {
    id: 'eval',
    label: 'Değerlendirme',
    icon: '📊',
    color: '#ec4899',
    x: 180, y: 420,
    badge: 'Aşama 5',
    desc: 'Modelin gerçek dünya performansını ölçerek iş kararlarına uygunluğunu test ettiğimiz aşamadır.',
    steps: [
      'Uygun metrik seçilir (F1, RMSE, AUC-ROC)',
      'Confusion matrix analiz edilir',
      'Özellik önem sıralaması (feature importance) çıkarılır',
      'Model karşılaştırması yapılır',
      'İş gereksinimleriyle sonuçlar değerlendirilir',
    ],
    tools: ['Scikit-learn metrics', 'SHAP', 'LIME', 'MLflow'],
  },
  {
    id: 'report',
    label: 'Raporlama',
    icon: '📝',
    color: '#f97316',
    x: 620, y: 420,
    badge: 'Aşama 6',
    desc: 'Analiz bulgularının paydaşlara aktarıldığı son aşamadır. Teknik olmayan kitlelere sade, anlaşılır sunumlar hazırlanır.',
    steps: [
      'Bulgular hikaye anlatımıyla (storytelling) sunulur',
      'İnteraktif dashboard\'lar hazırlanır',
      'Uygulanabilir öneriler (actionable insights) çıkarılır',
      'Model izleme planı kurulur (model drift)',
      'Dökümanlar ve kod paylaşıma açılır',
    ],
    tools: ['Tableau', 'Power BI', 'Streamlit', 'Jupyter', 'Notion'],
  },
];

const EDGES = [
  { from: 'collect', to: 'clean',     label: 'ham veri' },
  { from: 'collect', to: 'transform', label: 'ham veri' },
  { from: 'clean',   to: 'eda',       label: 'temiz veri' },
  { from: 'transform', to: 'eda',     label: 'hazır veri' },
  { from: 'eda',     to: 'model',     label: 'içgörüler' },
  { from: 'model',   to: 'eval',      label: 'tahminler' },
  { from: 'model',   to: 'report',    label: 'bulgular' },
  { from: 'eval',    to: 'report',    label: 'metrikler' },
];

const TOOLS_DATA = [
  { icon: '🐍', name: 'Python', category: 'Dil', desc: 'Veri analizinin fiili standardı. Kapsamlı ekosistemi ile her aşamada kullanılır.' },
  { icon: '🐼', name: 'Pandas', category: 'Veri İşleme', desc: 'DataFrame tabanlı veri manipülasyonu için temel kütüphane.' },
  { icon: '🔢', name: 'NumPy', category: 'Hesaplama', desc: 'Çok boyutlu diziler ve yüksek performanslı matematiksel işlemler.' },
  { icon: '📈', name: 'Matplotlib', category: 'Görselleştirme', desc: 'Python\'un temel grafik kütüphanesi. Her türlü statik grafik.' },
  { icon: '🎨', name: 'Seaborn', category: 'Görselleştirme', desc: 'İstatistiksel görselleştirmeler için Matplotlib üstüne inşa edilmiş.' },
  { icon: '✨', name: 'Plotly', category: 'Görselleştirme', desc: 'İnteraktif ve web tabanlı grafikler için tercih edilir.' },
  { icon: '🤖', name: 'Scikit-learn', category: 'ML', desc: 'Makine öğrenmesi algoritmalarının kapsamlı Python kütüphanesi.' },
  { icon: '⚡', name: 'XGBoost', category: 'ML', desc: 'Gradient boosting ile tablo verilerinde çoğunlukla kazanan algoritma.' },
  { icon: '💡', name: 'LightGBM', category: 'ML', desc: 'Büyük veri setlerinde XGBoost\'tan çok daha hızlı çalışır.' },
  { icon: '🗄️', name: 'SQL', category: 'Veri Toplama', desc: 'İlişkisel veritabanlarından veri çekme ve sorgulama.' },
  { icon: '🌊', name: 'Streamlit', category: 'Raporlama', desc: 'Sadece Python ile veri uygulamaları ve dashboard oluşturur.' },
  { icon: '📓', name: 'Jupyter', category: 'Ortam', desc: 'Kod, metin ve görselleştirmeyi bir arada sunan notebook ortamı.' },
];

const STATS_DATA = [
  {
    section: 'Merkezi Eğilim Ölçüleri',
    cards: [
      { name: 'Ortalama (Mean)', desc: 'Tüm değerlerin toplamının gözlem sayısına bölümü. Aykırı değerlere duyarlıdır.', formula: 'μ = Σxᵢ / n' },
      { name: 'Medyan (Median)', desc: 'Sıralanmış verinin ortasındaki değer. Aykırı değerlere karşı dirençlidir.', formula: 'Sıralı veri ortası' },
      { name: 'Mod (Mode)', desc: 'En sık tekrar eden değer. Kategorik veri için tercih edilir.', formula: 'max f(xᵢ)' },
    ],
  },
  {
    section: 'Dağılım Ölçüleri',
    cards: [
      { name: 'Varyans', desc: 'Değerlerin ortalamadan ne kadar saptığının kareli ortalaması.', formula: 'σ² = Σ(xᵢ-μ)² / n' },
      { name: 'Standart Sapma', desc: 'Varyansın karekökü. Orijinal birimde yorumlanabilir.', formula: 'σ = √(σ²)' },
      { name: 'IQR', desc: 'Çeyrekler arası açıklık. Aykırı değer tespitinde kullanılır.', formula: 'Q3 - Q1' },
    ],
  },
  {
    section: 'Korelasyon ve İlişki',
    cards: [
      { name: 'Pearson r', desc: 'İki sürekli değişken arasındaki doğrusal ilişkinin gücü ve yönü.', formula: '-1 ≤ r ≤ +1' },
      { name: 'Spearman ρ', desc: 'Sıralama tabanlı korelasyon. Doğrusal olmayan ilişkilerde kullanılır.', formula: 'Rank tabanlı r' },
      { name: 'p-değeri', desc: 'H₀ doğruyken gözlenen sonucun görülme olasılığı. p<0.05 anlamlı kabul edilir.', formula: 'P(X ≥ x | H₀)' },
    ],
  },
];

const RESOURCES_DATA = [
  { icon: '📚', name: 'Kaggle Learn', desc: 'Ücretsiz veri analizi, makine öğrenmesi ve derin öğrenme kursları. Her ders notebook ile uygulamalı.', tag: 'Kurs · Ücretsiz' },
  { icon: '🎓', name: 'Coursera – IBM Data Science', desc: 'IBM\'in kapsamlı veri bilimi sertifika programı. Python, SQL ve ML konularını kapsar.', tag: 'Sertifika · Ücretli' },
  { icon: '📖', name: 'Python for Data Analysis (Wes McKinney)', desc: 'Pandas\'ın yaratıcısından kapsamlı veri analizi kitabı. NumPy ve Pandas derinlemesine ele alınıyor.', tag: 'Kitap' },
  { icon: '🤗', name: 'Hugging Face', desc: 'Makine öğrenmesi modelleri ve dataset\'leri için en büyük açık topluluk. Transformers merkezi.', tag: 'Platform' },
  { icon: '📊', name: 'Towards Data Science (Medium)', desc: 'Veri bilimcilerin deneyim ve tutorial makaleleri paylaştığı Medium yayını.', tag: 'Blog' },
  { icon: '🛠️', name: 'Scikit-learn Docs', desc: 'Her ML algoritması için örnekli, kapsamlı ve kullanıcı dostu dokümantasyon.', tag: 'Dokümantasyon' },
  { icon: '🗂️', name: 'UCI ML Repository', desc: 'Makine öğrenmesi araştırmalarında kullanılan klasik veri setlerinin arşivi.', tag: 'Dataset' },
];

/* ═══════════════════════════════════════════════
   TABS
═══════════════════════════════════════════════ */

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ═══════════════════════════════════════════════
   ER DIAGRAM
═══════════════════════════════════════════════ */

function buildDiagram() {
  const svg = document.getElementById('diagram-svg');
  const NS = 'http://www.w3.org/2000/svg';

  // Defs: arrowhead marker
  const defs = document.createElementNS(NS, 'defs');
  defs.innerHTML = `
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#2e3248"/>
    </marker>
    <marker id="arrow-hl" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#6c63ff"/>
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  const nodeMap = {};
  NODES.forEach(n => { nodeMap[n.id] = n; });

  const W = 140, H = 58;

  // Draw edges first (behind nodes)
  const edgeGroup = document.createElementNS(NS, 'g');
  edgeGroup.id = 'edges';
  svg.appendChild(edgeGroup);

  EDGES.forEach(e => {
    const s = nodeMap[e.from], t = nodeMap[e.to];
    const dx = t.x - s.x, dy = t.y - s.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const pad = 34;
    const x1 = s.x + ux * pad, y1 = s.y + uy * pad;
    const x2 = t.x - ux * (pad + 6), y2 = t.y - uy * (pad + 6);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;

    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', `M${x1},${y1} Q${mx},${my} ${x2},${y2}`);
    path.setAttribute('class', 'er-edge');
    path.setAttribute('id', `edge-${e.from}-${e.to}`);
    edgeGroup.appendChild(path);

    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x', mx);
    lbl.setAttribute('y', my - 7);
    lbl.setAttribute('class', 'edge-label');
    lbl.textContent = e.label;
    edgeGroup.appendChild(lbl);
  });

  // Draw nodes
  NODES.forEach(node => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'er-node');
    g.setAttribute('id', 'node-' + node.id);
    g.setAttribute('transform', `translate(${node.x - W / 2}, ${node.y - H / 2})`);

    // Shadow rect
    const shadow = document.createElementNS(NS, 'rect');
    shadow.setAttribute('x', '3'); shadow.setAttribute('y', '5');
    shadow.setAttribute('width', W); shadow.setAttribute('height', H);
    shadow.setAttribute('rx', '10'); shadow.setAttribute('ry', '10');
    shadow.setAttribute('fill', node.color);
    shadow.setAttribute('opacity', '0.25');
    g.appendChild(shadow);

    // Main rect
    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('width', W); rect.setAttribute('height', H);
    rect.setAttribute('rx', '10'); rect.setAttribute('ry', '10');
    rect.setAttribute('fill', node.color);
    rect.setAttribute('stroke', '#ffffff22');
    rect.setAttribute('stroke-width', '1.5');
    rect.setAttribute('class', 'node-rect');
    g.appendChild(rect);

    // Icon
    const icon = document.createElementNS(NS, 'text');
    icon.setAttribute('x', '24'); icon.setAttribute('y', H / 2 + 1);
    icon.setAttribute('class', 'node-icon');
    icon.textContent = node.icon;
    g.appendChild(icon);

    // Label
    const label = document.createElementNS(NS, 'text');
    label.setAttribute('x', (W + 20) / 2 + 6);
    label.setAttribute('y', H / 2 + 1);
    label.setAttribute('class', 'node-label');
    label.textContent = node.label;
    g.appendChild(label);

    g.addEventListener('click', () => selectNode(node.id));
    svg.appendChild(g);
  });
}

let activeNode = null;

function selectNode(id) {
  // Reset previous
  if (activeNode) {
    document.getElementById('node-' + activeNode).classList.remove('active');
    EDGES.forEach(e => {
      const el = document.getElementById(`edge-${e.from}-${e.to}`);
      if (el) el.classList.remove('highlight');
    });
  }

  if (activeNode === id) {
    // Deselect
    activeNode = null;
    document.getElementById('detail-content').style.display = 'none';
    document.querySelector('.detail-placeholder').style.display = 'flex';
    return;
  }

  activeNode = id;
  document.getElementById('node-' + id).classList.add('active');

  // Highlight connected edges
  EDGES.forEach(e => {
    if (e.from === id || e.to === id) {
      const el = document.getElementById(`edge-${e.from}-${e.to}`);
      if (el) el.classList.add('highlight');
    }
  });

  renderDetail(NODES.find(n => n.id === id));
}

function renderDetail(node) {
  document.querySelector('.detail-placeholder').style.display = 'none';
  const content = document.getElementById('detail-content');
  content.style.display = 'block';

  content.innerHTML = `
    <h2>${node.icon} ${node.label}</h2>
    <span class="detail-badge" style="background:${node.color}">${node.badge}</span>
    <p>${node.desc}</p>
    <h3>Yapılacak İşlemler</h3>
    <ul class="step-list">
      ${node.steps.map((s, i) => `
        <li>
          <span class="step-num">${i + 1}</span>
          <span>${s}</span>
        </li>`).join('')}
    </ul>
    <h3>Kullanılan Araçlar</h3>
    <div class="tool-chips">
      ${node.tools.map(t => `<span class="chip accent">${t}</span>`).join('')}
    </div>
  `;
}

/* ═══════════════════════════════════════════════
   TOOLS TAB
═══════════════════════════════════════════════ */

function buildTools() {
  const grid = document.getElementById('tools-grid');
  grid.innerHTML = TOOLS_DATA.map(t => `
    <div class="tool-card">
      <div class="tool-card-icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <span class="category-tag">${t.category}</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════
   STATS TAB
═══════════════════════════════════════════════ */

function buildStats() {
  const container = document.getElementById('stats-container');
  container.innerHTML = STATS_DATA.map(section => `
    <div class="stats-section">
      <h2>${section.section}</h2>
      <div class="stats-cards">
        ${section.cards.map(c => `
          <div class="stat-card">
            <h4>${c.name}</h4>
            <p>${c.desc}</p>
            <div class="formula">${c.formula}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════
   RESOURCES TAB
═══════════════════════════════════════════════ */

function buildResources() {
  const list = document.getElementById('resources-list');
  list.innerHTML = RESOURCES_DATA.map(r => `
    <div class="resource-item">
      <span class="resource-icon">${r.icon}</span>
      <div class="resource-info">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
        <span class="resource-tag">${r.tag}</span>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */

buildDiagram();
buildTools();
buildStats();
buildResources();
