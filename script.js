/* ═══════════════════════════════════════════════
   TAB 1 — VERİ ANALİZİ ER DİYAGRAMI
═══════════════════════════════════════════════ */

const NODES = [
  {
    id: 'collect', label: 'Veri Toplama', icon: '🗄️', color: '#3b82f6', x: 400, y: 60,
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
    id: 'clean', label: 'Veri Temizleme', icon: '🧹', color: '#8b5cf6', x: 180, y: 200,
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
    id: 'transform', label: 'Dönüştürme', icon: '⚙️', color: '#06b6d4', x: 620, y: 200,
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
    id: 'eda', label: 'Keşifsel Analiz', icon: '🔍', color: '#f59e0b', x: 400, y: 300,
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
    id: 'model', label: 'Modelleme', icon: '🤖', color: '#10b981', x: 400, y: 420,
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
    id: 'eval', label: 'Değerlendirme', icon: '📊', color: '#ec4899', x: 180, y: 420,
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
    id: 'report', label: 'Raporlama', icon: '📝', color: '#f97316', x: 620, y: 420,
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
  { from: 'collect',   to: 'clean',     label: 'ham veri' },
  { from: 'collect',   to: 'transform', label: 'ham veri' },
  { from: 'clean',     to: 'eda',       label: 'temiz veri' },
  { from: 'transform', to: 'eda',       label: 'hazır veri' },
  { from: 'eda',       to: 'model',     label: 'içgörüler' },
  { from: 'model',     to: 'eval',      label: 'tahminler' },
  { from: 'model',     to: 'report',    label: 'bulgular' },
  { from: 'eval',      to: 'report',    label: 'metrikler' },
];

/* ═══════════════════════════════════════════════
   TAB 2 — YZ MODELİ GELİŞTİRME (12 AŞAMA)
   viewBox 880×780 | diamond layout
   Sol: x=195  Merkez: x=440  Sağ: x=685
   Satırlar: y = 55,155,255,355,450,545,635,725
═══════════════════════════════════════════════ */

const AI_NODES = [
  /* ── AŞAMA 1 ─────────────────────────────── */
  {
    id: 'ai_prob', label: 'Prob. Tanımlama', icon: '🎯', color: '#6366f1',
    x: 440, y: 55,
    badge: 'Aşama 1 · Temel',
    desc: 'Tüm ML projelerinin en kritik adımıdır. Yanlış tanımlanan problem, ne kadar iyi model kurulursa kurulsun başarısızlığa mahkumdur. Google ML Universal Workflow, CRISP-DM ve Andrew Ng\'in ML Strategy metodolojilerinin ortak başlangıç noktasıdır.',
    steps: [
      'İş problemi ML problemi olarak yeniden çerçevelenir: binary/multi-class sınıflandırma, regresyon, kümeleme, sıralama (ranking), anomali tespiti veya üretken model mi?',
      'ML\'in gerçekten doğru araç olup olmadığı sorgulanır — kural tabanlı sistem, lookup tablosu veya basit heuristik daha az maliyetli olabilir',
      'Başarı kriterleri çift katmanlı tanımlanır: (a) iş metriği (churn azalması, gelir artışı, hata oranı düşüşü) ve (b) buna karşılık gelen ML proxy metriği (F1, AUC-ROC, RMSE)',
      'Mevcut en saf baseline belirlenir: tüm örneklere çoğunluk sınıfı tahmin etmek, geçen yılın değerini kullanmak — her model bunu geçmeli',
      'Veri gereksinimi ve erişilebilirlik analiz edilir: etiketli veri var mı? Yeterli mi? Toplama maliyeti nedir?',
      'Yasal, etik ve önyargı (bias) riskleri değerlendirilir: GDPR uyumu, protected attribute\'lar, model kararlarının açıklanabilirlik yükümlülükleri',
      'Proje kapsamı, zaman çizelgesi, kaynak bütçesi ve paydaşlarla başarı kriterleri yazılı hale getirilir',
    ],
    tools: ['Notion / Confluence (problem dokümantasyonu)', 'Miro (problem haritalama)', 'Google Model Card Template', 'Jira / Linear (proje takibi)'],
    pitfall: 'En sık hata: problem tanımlanmadan veriye koşmak. Bu, yanlış hedef değişken seçimine ve geriye dönük pahalı revizyonlara yol açar.',
  },
  /* ── AŞAMA 2 ─────────────────────────────── */
  {
    id: 'ai_collect', label: 'Veri Toplama', icon: '🗃️', color: '#3b82f6',
    x: 195, y: 155,
    badge: 'Aşama 2 · Kritik',
    desc: '"Garbage in, garbage out." Model kalitesinin tavanını bu aşama belirler. Verinin miktarı kadar temsil gücü, çeşitliliği ve etiketi de kritiktir. Annotation maliyeti çoğu zaman hesaplama maliyetini geçer.',
    steps: [
      'Veri kaynakları listelenir ve önceliklendirilir: kurumsal veritabanları, REST API\'ler, web scraping, sensörler, log dosyaları, açık dataset\'ler (Kaggle, HuggingFace, UCI)',
      'Annotation (etiketleme) stratejisi seçilir: insan etiketleme (Label Studio, Scale AI, Labelbox), zayıf denetim (Snorkel, weak supervision), yarı-denetimli yaklaşım veya LLM yardımlı otomatik etiketleme',
      'Veri sözleşmesi (data contract) tanımlanır: şema, format, zorunlu alanlar, beklenen değer aralıkları, güncellik SLA\'ı — teslim alan tarafla yazılı mutabakat',
      'Sınıf dengesizliği (class imbalance) riski önceden değerlendirilir; imbalance ratio >10:1 ise oversampling (SMOTE, ADASYN) veya cost-sensitive learning planlanır',
      'Gizlilik ve anonimleştirme uygulanır: PII maskeleme, k-anonymity, diferansiyel gizlilik (differential privacy), GDPR / KVKK gereklilikleri',
      'Veri versiyonlama sistemi kurulur: versiyon kontrol sistemleri (DVC, LakeFS) ile "hangi model hangi verilerle eğitildi" izlenebilirliği sağlanır',
      'Minimum veri hacmi tahmini yapılır: basit sınıflandırma için sınıf başına ≥1000, karmaşık DL için ≥100K örnek; az veriyle transfer learning önce değerlendirilir',
    ],
    tools: ['Label Studio / Scale AI / Labelbox (annotation)', 'DVC / LakeFS (veri versiyonlama)', 'Great Expectations / Soda (veri doğrulama)', 'Apache Kafka / Flink (streaming)', 'Hugging Face Datasets / Kaggle'],
    pitfall: 'Annotation kılavuzu (labeling guideline) yazılmadan başlanan etiketleme, etiketçiler arası düşük uyum (inter-annotator disagreement) üretir ve modeli gürültülü veriyle besler.',
  },
  /* ── AŞAMA 3 ─────────────────────────────── */
  {
    id: 'ai_preproc', label: 'Veri Ön İşleme', icon: '🧹', color: '#0891b2',
    x: 685, y: 155,
    badge: 'Aşama 3 · Kalite',
    desc: 'Ham verinin model için kabul edilebilir kaliteye getirildiği aşamadır. Eksik değer işleme stratejisi yanlış seçilirse model gizli bias\'larla dolu olabilir. Bu aşama çoğu zaman analiz sürecinin %70-80\'ini alır.',
    steps: [
      'Eksik değer mekanizması analiz edilir: MCAR (tamamen rastlantısal), MAR (rastlantısal), MNAR (rastlantısal değil) ayrımı yapılır — her mekanizmanın doğru doldurma yöntemi farklıdır',
      'Doldurma stratejisi seçilir: basit istatistik (medyan/mod — robust), KNN imputation (komşu tabanlı), model tabanlı (iterative imputer), ya da özelliği tamamen silme (>40% eksik)',
      'Aykırı değerler (outlier) tespit edilip işlenir: Z-score (Gaussian dağılım varsayımı), IQR (dayanıklı, non-parametrik), Isolation Forest (çok boyutlu); domain bilgisiyle gerçek outlier mi gürültü mü ayrımı yapılır',
      'Duplike ve tutarsız kayıtlar kaldırılır: fuzzy matching ile benzer kayıtlar tespit edilir, kategorik değerlerin yazım tutarsızlıkları (Istanbul/İstanbul/istanbul) normalize edilir',
      'Veri tipi dönüşümleri uygulanır: int/float/datetime/category casting, timezone normalizasyonu, boolean encoding',
      'Metin verisi için özel temizlik: HTML tag kaldırma, özel karakter normalizasyonu, dil tespiti, lowercasing, tokenizasyon',
      'Preprocessing pipeline sklearn.Pipeline veya HuggingFace tokenizer olarak kapsüllenir: eğitimde kullanılan tüm adımların production\'da da aynı sırayla çalışması garanti edilir',
    ],
    tools: ['Pandas / NumPy (temel işlemler)', 'Scikit-learn (Pipeline, SimpleImputer, IterativeImputer)', 'Missingno (görselleştirme)', 'NLTK / SpaCy (metin temizleme)', 'OpenRefine (manuel temizleme)'],
    pitfall: 'Preprocessing adımları pipeline\'a alınmadan ayrı ayrı çalıştırılırsa, validation ve test setlerinde bilgi sızıntısı (data leakage) yaşanır — scaler\'ı eğitim setiyle fit, test setiyle sadece transform yapmalısın.',
  },
  /* ── AŞAMA 4 ─────────────────────────────── */
  {
    id: 'ai_split', label: 'Veri Bölme', icon: '✂️', color: '#0d9488',
    x: 440, y: 255,
    badge: 'Aşama 4 · Kritik',
    desc: 'Modelin gerçek dünya performansını doğru ölçebilmek için verinin eğitim, doğrulama ve test setlerine doğru yöntemle ayrılması gerekir. Yanlış bölme stratejisi iyimser ama yanıltıcı sonuçlar üretir.',
    steps: [
      'Hold-out split oranı belirlenir: küçük veri (<10K) için 60/20/20, büyük veri için 80/10/10 tipik; test seti eğitim sürecinden tamamen izole tutulur ve sadece son değerlendirme için bir kez açılır',
      'Stratified split uygulanır: sınıf dağılımının her split\'te korunması için StratifiedKFold veya StratifiedShuffleSplit kullanılır — imbalanced dataset\'lerde zorunludur',
      'Temporal veri için time-based split uygulanır: gelecekteki veriyi tahmin etmek için geçmiş veriyle eğitim, sonraki zaman dilimini test olarak kullanma; gelecek bilgisinin modele sızması (lookahead bias) önlenir',
      'Group-based split uygulanır: aynı müşteriye/hastaya/kullanıcıya ait örnekler aynı split\'te olmalı — aksi takdirde model bireysel özellikleri ezberler, genelleme ölçülemez',
      'k-Fold cross-validation planlanır: k=5 veya k=10; nested CV ile aynı anda HPO + generalization estimation mümkün olur',
      'Train/val/test dağılımları karşılaştırılır: her split\'teki hedef değişken, özellik dağılımı ve veri kalitesi istatistiksel testlerle doğrulanır (KS test, chi-square)',
      'Data leakage audit yapılır: hedef değişkenin türev özelliklerinin (target encoding, cumulative features) training seti dışı veriye sızmaması denetlenir',
    ],
    tools: ['Scikit-learn (train_test_split, KFold, StratifiedKFold, GroupKFold, TimeSeriesSplit)', 'Pandas (temporal indexing)', 'Great Expectations (split validation)'],
    pitfall: 'Test setini birden fazla kez değerlendirme — her seferinde biraz daha "test\'e göre optimize edilmiş" model ortaya çıkar ve performans tahminleri iyimser olur. Test seti sadece bir kez açılır.',
  },
  /* ── AŞAMA 5 ─────────────────────────────── */
  {
    id: 'ai_feature', label: 'Özellik Müh.', icon: '⚗️', color: '#8b5cf6',
    x: 195, y: 355,
    badge: 'Aşama 5 · En Etkili',
    desc: 'Andrew Ng: "Applied ML is basically feature engineering." Özellikle klasik ML\'de modelin performansını en çok etkileyen tek adımdır. İyi özellikler basit modelleri SOTA\'ya taşıyabilir; kötü özellikler mükemmel modeli mahvedebilir.',
    steps: [
      'Domain bilgisiyle yeni özellikler türetilir: oranlar (CTR = tıklama/gösterim), farklar (son sipariş - kayıt tarihi), çarpımlar (fiyat × miktar = ciro), logaritmik dönüşümler (pozitif skewed dağılımlar için)',
      'Kategorik değişkenler encode edilir: düşük kardinalite (<15 kategori) için One-Hot Encoding, yüksek kardinalite için Target Encoding (train leakage riski var, CV gerektiren versiyonu kullan), DL için Learnable Embedding',
      'Sayısal değişkenler ölçeklendirilir: StandardScaler (Gaussian dağılım; SVM/LR için kritik), MinMaxScaler (sınırlı aralık; görüntü pixel\'ları), RobustScaler (aykırı değer varlığında), Log1p (pozitif skewed)',
      'Özellik seçimi (feature selection) uygulanır: Filter (Mutual Information, χ², ANOVA-F), Wrapper (Recursive Feature Elimination — RFE), Embedded (Lasso L1 regularization, Random Forest importance, SHAP)',
      'Boyut indirgeme uygulanır: PCA (doğrusal, varyansı koru), UMAP (non-linear, hızlı), t-SNE (non-linear, sadece görselleştirme), TruncatedSVD (sparse matrix için)',
      'Zaman serisi için özel özellikler: lag (t-1, t-7, t-30), rolling window (mean, std, max, min), Fourier özellikler (mevsimsellik kodlama), tatil/özel gün flag\'leri',
      'Feature store kurulur: eğitim ve production ortamında aynı özellik hesaplamalarının tutarlılığı için merkezi özellik deposu — training-serving skew\'u önler',
    ],
    tools: ['Featuretools (otomatik özellik türetme)', 'Scikit-learn Pipeline & ColumnTransformer', 'UMAP-learn', 'Boruta / mRMR (feature selection)', 'Feast / Tecton / Hopsworks (feature store)'],
    pitfall: 'Training-serving skew: eğitimde log(x+1) dönüşümü uygulayıp production\'da uygulamayı unutmak model tahminlerini tamamen bozar. Tüm preprocessing pipeline olarak saklanmalı.',
  },
  /* ── AŞAMA 6 ─────────────────────────────── */
  {
    id: 'ai_arch', label: 'Model Seçimi', icon: '🏗️', color: '#d97706',
    x: 685, y: 355,
    badge: 'Aşama 6 · Seçim',
    desc: 'Hangi model ailesinin seçileceği veri boyutuna, problem türüne ve hesaplama bütçesine göre belirlenir. "En karmaşık model en iyi model değildir" — Occam\'s Razor burada da geçerlidir. Her zaman basit bir baseline ile başlanır.',
    steps: [
      'Problem türü × veri türü karar ağacı uygulanır: Tablo verisi + <500K satır → Gradient Boosting (XGBoost/LightGBM). Görüntü → CNN veya Vision Transformer. Metin → BERT/GPT tabanlı Transformer. Zaman serisi → Temporal Fusion Transformer (TFT) veya PatchTST. Grafik verisi → Graph Neural Network',
      'Baseline model kurulur ve benchmark alınır: Lojistik Regresyon (sınıflandırma), Ridge/Lasso (regresyon), K-Means (kümeleme) — tüm karmaşık modeller bu performansı anlamlı biçimde geçmeli',
      'Transfer Learning değerlendirilir: veri azsa pretrained model\'leri (BERT, ResNet-50, ViT, Whisper, Llama) fine-tune etmek genellikle sıfırdan eğitimden çok daha verimlidir',
      'Model karmaşıklığı veri boyutuyla dengelenir: az veri + karmaşık model → overfitting. Veri < 10K için en iyi genellikle Gradient Boosting + güçlü regularization',
      'Ensemble stratejisi planlanır: Bagging (Random Forest — yüksek variance azaltır), Boosting (XGBoost/LightGBM — yüksek bias azaltır), Stacking (meta-model ile modelleri birleştirir), Blending (ağırlıklı ortalama)',
      'Inductive bias değerlendirilir: CNN görüntüde uzaysal lokalite ve öteleme değişmezliğini, Transformer dizilerde long-range bağımlılıkları, GNN grafiklerde mesaj geçişini otomatik öğrenir',
      'Hesaplama ve servis kısıtları dikkate alınır: model boyutu (parametre sayısı), inference latency (P99), bellek ayakizi (RAM/VRAM), deployment hedefi (cloud GPU / CPU sunucu / edge cihaz / mobil)',
    ],
    tools: ['Scikit-learn (klasik ML)', 'XGBoost / LightGBM / CatBoost (gradient boosting)', 'PyTorch / TensorFlow-Keras (DL)', 'HuggingFace Transformers (NLP/CV)', 'AutoGluon / H2O AutoML (otomatik seçim)'],
    pitfall: 'SOTA modeli seçme baskısı: en büyük Transformer\'ı kurmak çoğu gerçek dünya probleminde overkill\'dir. Tuned XGBoost, büyük bir neural network\'ü %80 vakada geçer ve 100x daha hızlı deploy edilir.',
  },
  /* ── AŞAMA 7 ─────────────────────────────── */
  {
    id: 'ai_train', label: 'Model Eğitimi', icon: '⚡', color: '#10b981',
    x: 440, y: 450,
    badge: 'Aşama 7 · Yoğun',
    desc: 'Modelin veriden öğrendiği aşamadır. Loss fonksiyonu, optimizer ve learning rate seçimi öğrenme kalitesini doğrudan belirler. Experiment tracking olmadan sistematik ilerleme mümkün değildir.',
    steps: [
      'Loss fonksiyonu problem türüne göre seçilir: CrossEntropyLoss (çok sınıflı), BCEWithLogitsLoss (ikili), MSE/MAE/Huber (regresyon — Huber aykırı değere karşı dayanıklı), Focal Loss (imbalanced sınıflandırma), Triplet/Contrastive Loss (metric learning), RLHF reward modeling (LLM fine-tuning)',
      'Optimizer seçilir ve yapılandırılır: AdamW (weight decay ile; genel kullanım — LLM fine-tuning standardı), SGD + Nesterov Momentum (büyük batch CV eğitiminde), Lion (AdamW\'dan %2-3 daha iyi, bellek tasarruflu), Sophia (second-order, 2x hız)',
      'Learning rate scheduling kurulur: Warmup + Cosine Decay (Transformer eğitiminin standardı), OneCycleLR (hızlı yakınsama), ReduceLROnPlateau (validation loss platolarında), Linear Decay (BERT fine-tuning). Çok büyük LR → divergence, çok küçük LR → yavaş yakınsama/sıkışma',
      'Regularization katmanları eklenir: Dropout (overfitting — p=0.1–0.5), L2 weight decay (tüm ağırlıklara), Batch Normalization (training hızlandırır, internal covariate shift azaltır), Layer Normalization (Transformer\'larda BN yerine), Data Augmentation (görüntüde flip/crop/color jitter; metinde back-translation/synonym replacement)',
      'Batch stratejisi ve gradient handling yapılandırılır: batch size (büyük batch → hızlı ama poor generalization; küçük batch → gürültülü ama iyi genelleme), Gradient Accumulation (GPU belleği yetersizse), Gradient Clipping (max_norm=1.0 — exploding gradient önler)',
      'Experiment tracking sistemi kurulur: her deney (run) için metrikler, hiperparametreler, artifact\'lar, model checkpoint\'leri kayıt altına alınır; hangi konfigürasyonun neden iyi/kötü çalıştığı izlenir',
      'Distributed training gerekiyorsa yapılandırılır: Data Parallel / DDP (tek makine çoklu GPU), Model Parallelism (model tek GPU\'ya sığmıyorsa), Pipeline Parallelism (büyük model sıralı GPU\'lar), Mixed Precision Training (FP16/BF16 — 2x hız, 2x bellek tasarrufu)',
    ],
    tools: ['PyTorch / JAX (framework)', 'PyTorch Lightning / HuggingFace Trainer (training loop)', 'Weights & Biases / MLflow / ClearML (experiment tracking)', 'HuggingFace Accelerate / DeepSpeed / FSDP (distributed)', 'NVIDIA CUDA / cuDNN / TensorRT'],
    pitfall: 'Learning rate en kritik hiperparametredir. LR Finder (fastai) veya küçük grid search olmadan başlamak çoğunlukla suboptimal yakınsamayla sonuçlanır. Warmup olmadan Transformer\'a büyük LR vermek divergence\'a neden olur.',
  },
  /* ── AŞAMA 8 ─────────────────────────────── */
  {
    id: 'ai_hpo', label: 'Hiperp. Opt.', icon: '🔧', color: '#db2777',
    x: 195, y: 545,
    badge: 'Aşama 8 · Optimizasyon',
    desc: 'Hiperparametre Optimizasyonu (HPO) — modelin eğitim sürecini yöneten ama veriden öğrenilemeyen parametreleri (learning rate, batch size, katman sayısı) sistematik biçimde optimize etme disiplinidir. Bayesian optimizasyon, grid search\'ten 10x daha verimlidir.',
    steps: [
      'Arama uzayı (search space) tanımlanır: hangi hiperparametrelerin optimize edileceği, aralıkları ve ölçekleri (log-scale vs linear) belirlenir — learning_rate: loguniform(1e-5, 1e-1), dropout: uniform(0.1, 0.5), num_layers: randint(2, 8)',
      'Arama stratejisi seçilir: Grid Search (küçük, birbirini bağımsız parametreler), Random Search (orta uzay — grid\'den genellikle daha iyi), Bayesian Optimization / TPE (büyük uzay, akıllı keşif — Optuna/Hyperopt), CMA-ES (evolüsyonel, sürekli uzayda), Population-Based Training (PBT — paralel worker\'lar',
      'Cross-validation entegre edilir: her hiperparametre konfigürasyonu k-fold CV ile değerlendirilir; nested CV ile HPO ve model seçiminin ayrı veri bölmelerinde yapılması sağlanır',
      'Early stopping in HPO: umut vermeyen trial\'lar erken sonlandırılır (Hyperband, ASHA — Asyncronous Successive Halving) — hesaplama bütçesi 5-10x azalabilir',
      'Compute bütçesi yönetilir: kaç trial çalıştırılacağı, her trial\'ın maximum epoch\'u, paralel worker sayısı önceden planlanır; bulut spot instance\'ları kullanılabilir',
      'AutoML alternatifleri değerlendirilir: AutoGluon, H2O AutoML, TPOT — sadece model seçimi değil, preprocessing + HPO + ensemble\'ı da otomatize eder; hızlı baseline için idealdir',
      'Optimal konfigürasyon seçilir ve belgelenir: en iyi trial\'ın tüm parametreleri kayıt altına alınır, reproducibility için random seed sabitlenir, model yeniden bu parametrelerle tam train set üzerinde eğitilir',
    ],
    tools: ['Optuna (Bayesian + Hyperband — en yaygın)', 'Ray Tune (dağıtık HPO, Optuna/HyperOpt entegrasyonu)', 'Weights & Biases Sweeps', 'Scikit-learn GridSearchCV / RandomizedSearchCV / HalvingGridSearchCV', 'AutoGluon / H2O AutoML'],
    pitfall: 'HPO\'yu test seti üzerinde doğrulayarak en iyi modeli seçmek — bu test leakage\'dır. HPO sadece validation seti kullanır; test seti son değerlendirme için muhafaza edilir.',
  },
  /* ── AŞAMA 9 ─────────────────────────────── */
  {
    id: 'ai_eval', label: 'Değerlendirme', icon: '📐', color: '#dc2626',
    x: 685, y: 545,
    badge: 'Aşama 9 · Dürüstlük',
    desc: 'Modelin gerçekten işe yarayıp yaramadığı burada anlaşılır. Tek metriğe güvenmek yanıltıcıdır. Hata analizi modelin nerede, neden yanıldığını gösterir. Fairness ve XAI (açıklanabilir YZ) günümüzde zorunlu bir adımdır.',
    steps: [
      'Problem türüne göre metrik seçimi yapılır — Sınıflandırma: imbalanced için PR-AUC ve F1-macro (Accuracy yanıltıcıdır!), multi-class için weighted F1 ve Cohen\'s Kappa, ikili için AUC-ROC. Regresyon: yüzde hata için MAPE, büyük hataları cezalandırmak için RMSE, robust için MAE. Üretici modeller: BLEU (makine çevirisi), ROUGE (özetleme), BERTScore (anlamsal benzerlik), FID/FréchetID (görüntü)',
      'Hata analizi (error analysis) yapılır: model hangi örneklerde, hangi koşullarda, hangi özellik değer aralıklarında yanılıyor? Confusion matrix\'te hangi sınıf çiftleri karışıyor? Yanlış tahminler manuel inceleniyor',
      'Model yorumlanabilirliği (XAI) uygulanır: SHAP (global + local özellik önemi, model-agnostic), LIME (tekil tahmin açıklaması), Grad-CAM (CNN\'de hangi bölgeye baktı görselleştirme), Attention visualization (Transformer), Partial Dependence Plots',
      'Bias ve fairness analizi yapılır: cinsiyet, yaş, ırk gibi protected group\'larda performans ayrı ayrı ölçülür. Fairness kriterleri: Demographic Parity (tüm gruplarda eşit pozitif tahmin oranı), Equal Opportunity (tüm gruplarda eşit TPR), Equalized Odds (eşit TPR ve FPR)',
      'Inference latency ve bellek ayakizi benchmarked edilir: P50/P95/P99 gecikme ölçülür, memory profiling yapılır, batch inference throughput hesaplanır — iş SLA\'ları ile karşılaştırılır',
      'Learning curve analizi yapılır: train/val loss eğrileri karşılaştırılır — büyük train-val gap → overfitting (daha fazla regularization veya veri), train ve val loss yüksek → underfitting (daha karmaşık model veya daha fazla eğitim)',
      'Champion-challenger karşılaştırması yapılır: mevcut production modeli (champion) ile yeni model (challenger) aynı hold-out test setinde karşılaştırılır; istatistiksel anlamlılık (McNemar testi, bootstrap CI) doğrulanır',
    ],
    tools: ['Scikit-learn metrics (sınıflandırma, regresyon)', 'SHAP (TreeExplainer, KernelExplainer)', 'LIME / Grad-CAM / Captum', 'Fairlearn / IBM AI Fairness 360', 'Evidently AI (model karşılaştırma)', 'MLflow / W&B (experiment registry)'],
    pitfall: 'Data leakage — test setinde gelecek bilgisi var mı? Cumulative sum, rolling mean, target encoding yanlış yapılmışsa F1 gerçek değerinin çok üstünde görünür. Temporal veri için time-based split zorunludur.',
  },
  /* ── AŞAMA 10 ────────────────────────────── */
  {
    id: 'ai_compress', label: 'Sıkıştırma', icon: '🗜️', color: '#f97316',
    x: 440, y: 635,
    badge: 'Aşama 10 · Optimize',
    desc: 'Model Sıkıştırma — production\'da hız, bellek ve enerji kısıtlarını karşılamak için modeli küçültme ve hızlandırma disiplinidir. Özellikle mobil, edge ve embedded deployment için kritiktir. Doğru yapıldığında %5\'ten az performans kaybıyla 4-8x hız artışı mümkündür.',
    steps: [
      'Quantization (nicemleme) uygulanır: Post-Training Quantization (PTQ) — eğitim sonrası ağırlıklar FP32\'den INT8\'e veya FP16\'ya dönüştürülür; Quantization-Aware Training (QAT) — eğitim sırasında quantization simüle edilir, PTQ\'dan daha iyi doğruluk. INT8 ile ~4x hız, ~4x bellek tasarrufu',
      'Pruning (budama) uygulanır: Unstructured Pruning — bireysel ağırlıkları sıfırla, sparse matrix (teorik hız artışı hardware desteğiyle sınırlı); Structured Pruning — tüm nöronları, attention head\'leri, katmanları kaldır (gerçek hız artışı, hardware bağımsız); Movement Pruning (fine-tune sırasında)',
      'Knowledge Distillation (bilgi damıtma) uygulanır: büyük teacher modelin "soft label" dağılımları küçük student modele öğretilir; öğrenci hem hard label\'ları hem teacher\'ın temperature-scaled softmax\'larını öğrenir. DistilBERT (BERT\'in %40 daha hızlı, %97 performans), TinyLLM\'ler bu yöntemle üretilir',
      'Neural Architecture Search (NAS) değerlendirilir: MobileNetV3, EfficientNet, MobileViT gibi donanım için optimize edilmiş mimari ailelerini kullan; DARTS/Differentiable NAS ile kısıta dayalı mimari arama',
      'ONNX formatına export edilir: PyTorch → torch.onnx.export → ONNX; framework-bağımsız deployment ve onnxruntime ile optimize inference. TensorRT (NVIDIA GPU için), TFLite (Android/iOS/embedded için), CoreML (Apple ekosistemi için) dönüşümleri yapılır',
      'Compile ve hardware-specific optimizasyon: torch.compile (PyTorch 2.0+), XLA compilation (JAX/TF), operator fusion, memory layout optimization, kernel auto-tuning',
      'Sıkıştırma sonrası doğrulama yapılır: baseline ve compressed model arasında tüm metrikler (doğruluk, gecikme, bellek) karşılaştırılır; kabul edilebilir performans düşüşü (<2% tipik threshold) içinde kalındığı doğrulanır',
    ],
    tools: ['PyTorch quantization / torch.ao', 'ONNX Runtime', 'TensorRT (NVIDIA)', 'TFLite / TensorFlow Model Optimization Toolkit', 'Hugging Face Optimum (transformer model optimize)', 'Intel Neural Compressor'],
    pitfall: 'INT8 quantization tüm katmanlara uygulandığında bazı katmanlar (özellikle ilk ve son katmanlar, aktivasyonlar) doğrulukta büyük düşüşe neden olabilir — mixed precision (kritik katmanlar FP16, gerisi INT8) çözümdür.',
  },
  /* ── AŞAMA 11 ────────────────────────────── */
  {
    id: 'ai_deploy', label: 'Deployment', icon: '🚀', color: '#0284c7',
    x: 195, y: 725,
    badge: 'Aşama 11 · Prodüksiyon',
    desc: '"80% of ML models never reach production." Deployment engineering ayrı bir uzmanlık alanıdır. Inference API tasarımı, containerization, deployment stratejisi ve CI/CD pipeline bu aşamanın bileşenleridir. Yanlış deployment mimarisi mükemmel bir modeli kullanılamaz kılar.',
    steps: [
      'Model serileştirilir: ONNX (çapraz platform, framework-bağımsız, production standardı), TorchScript (PyTorch JIT compilation — Python bağımlılığı yok), TF SavedModel (TF Serving için), Pickle/Joblib (scikit-learn için — yalnızca güvenilir ortamda)',
      'Inference API tasarlanır: REST API (FastAPI — async, OpenAPI/Swagger otomatik) veya gRPC (yüksek throughput, streaming, binary protocol); istek/yanıt şeması (schema) tanımlanır, versiyonlama yapılır (/v1/predict)',
      'Model serving altyapısı seçilir: TorchServe (PyTorch), TF Serving (TF), NVIDIA Triton (multi-framework, dynamic batching, GPU), Ollama (LLM local), vLLM (LLM high-throughput serving with PagedAttention)',
      'Containerize edilir: Docker ile tüm bağımlılıklar (Python versiyonu, kütüphaneler, model dosyası) sabitlenir; Kubernetes ile yük dengeleme, auto-scaling, sağlık kontrolü, rolling update yönetilir',
      'Deployment stratejisi seçilir: Shadow Deployment (yeni model production trafiğini gizlice alır, sonuçlar karşılaştırılır — kullanıcı etkilenmez), Canary Deployment (%5-10 trafikle başla, metrikler iyiyse genişlet), Blue-Green Deployment (iki özdeş ortam arası anlık geçiş — zero downtime), A/B Testing (istatistiksel anlamlılık testleriyle)  ',
      'CI/CD pipeline kurulur: her model güncellemesi otomatik olarak test → staging → production süreçlerinden geçer. Model validation gate\'leri: eğer yeni model challenger baseline\'ı geçemezse deploy edilmez. GitHub Actions / Jenkins / ArgoCD',
      'Güvenlik katmanları eklenir: input validation (schema enforcement, anomaly detection), rate limiting (Redis + token bucket), model extraction saldırısı koruması, adversarial input tespiti, output sanity check (bounds checking)',
    ],
    tools: ['Docker / Kubernetes (konteyner yönetimi)', 'FastAPI / gRPC (API katmanı)', 'TorchServe / NVIDIA Triton / vLLM (serving)', 'AWS SageMaker / GCP Vertex AI / Azure ML (managed deploy)', 'GitHub Actions / ArgoCD / Jenkins (CI/CD)', 'Istio (service mesh)'],
    pitfall: 'Python/kütüphane versiyonu tutarsızlığı: eğitim ortamı (Python 3.10, torch 2.1) ile production container (Python 3.8, torch 1.9) arası fark modeli sessizce bozabilir. Docker bu riski ortadan kaldırır — her zaman aynı image ile train ve serve.',
  },
  /* ── AŞAMA 12 ────────────────────────────── */
  {
    id: 'ai_mlops', label: 'MLOps & İzleme', icon: '🔭', color: '#7c3aed',
    x: 685, y: 725,
    badge: 'Aşama 12 · Sürekli',
    desc: 'Deployment bitiş değil, başlangıçtır. Gerçek dünya değiştikçe modelin performansı bozulur (model drift). MLOps, modeli canlı tutan, otomatik güncelleyen ve üretim hatalarını erkenden tespit eden mühendislik disiplinidir. Google MLOps Maturity Model 3 seviye tanımlar: Manuel → Pipeline → Full Automation.',
    steps: [
      'Model performansı gerçek zamanlı izlenir: tahmin dağılımı, confidence skoru ortalaması, business KPI\'lar (F1@production, dönüşüm oranı değişimi) dashboard\'da görüntülenir; SLA ihlalleri için alert mekanizması kurulur',
      'Data drift tespiti yapılır: girdi özelliklerinin istatistiksel dağılımı eğitim zamanıyla karşılaştırılır. PSI (Population Stability Index; >0.25 = kritik drift), Kolmogorov-Smirnov testi (sürekli değişkenler), Chi-square testi (kategorik), Jensen-Shannon divergence',
      'Concept drift tespiti yapılır: X→Y ilişkisi bozulmuş mu? Ground truth etiketler gecikimli olarak toplanır (müşterinin fiili kararı 30 gün sonra belli olabilir); CUSUM, DDM (Drift Detection Method), ADWIN algoritmalarıyla drift statitistiksel olarak tespit edilir',
      'Otomatik retraining pipeline\'ı kurulur: drift eşiği aşıldığında veya zaman bazlı schedule tetiklendiğinde, tüm eğitim + değerlendirme + deployment adımları otomatik çalışır; insan onayı gerekiyorsa approval gate eklenir (human-in-the-loop)',
      'Model registry ve versiyonlama yönetilir: hangi modelin production\'da, hangi modelin staging\'de, hangi modelin archived olduğu takip edilir; geri alma (rollback) mekanizması her an hazır tutulur; model lineage (hangi veriyle, hangi kodla, hangi hiperparametrelerle eğitildi) kaydedilir',
      'Feedback loop oluşturulur: production\'daki tahminlere kullanıcı geri bildirimi veya fiili sonuçlar (realized labels) toplanır ve sonraki eğitim setine eklenir; active learning ile en bilgilendirici örnekler öncelikli etiketlenir',
      'Maliyet ve kaynak optimizasyonu yapılır: GPU/CPU kullanım verimliliği izlenir, spot instance kullanımı artırılır, kullanım dışı saatlerde model scale-to-zero yapılır, batch inference vs real-time tradeoff değerlendirilir, carbon footprint raporlanır',
    ],
    tools: ['Evidently AI / WhyLabs / Arize (drift & model monitoring)', 'Prometheus + Grafana (altyapı ve metrik izleme)', 'MLflow Model Registry / W&B Artifacts / Neptune (model versiyonlama)', 'Apache Airflow / Prefect / Dagster (pipeline orchestration)', 'Seldon Core / BentoML (ML platform)'],
    pitfall: '"Silent failure" — izleme kurulmadan bırakılan modeller sessiz sedasız bozulur. Kullanıcılar yanlış tahminlerle karar verirken kimse fark etmez. Drift monitoring, deployment günü değil, daha önce tasarlanmalıdır.',
  },
];

const AI_EDGES = [
  /* Ana akış */
  { from: 'ai_prob',     to: 'ai_collect',  label: 'veri planı' },
  { from: 'ai_collect',  to: 'ai_preproc',  label: 'ham veri' },
  { from: 'ai_preproc',  to: 'ai_split',    label: 'temiz veri' },
  { from: 'ai_split',    to: 'ai_feature',  label: 'eğitim seti' },
  { from: 'ai_split',    to: 'ai_arch',     label: 'veri profili' },
  { from: 'ai_feature',  to: 'ai_train',    label: 'özellikler' },
  { from: 'ai_arch',     to: 'ai_train',    label: 'mimari' },
  { from: 'ai_train',    to: 'ai_hpo',      label: 'ilk model' },
  { from: 'ai_hpo',      to: 'ai_eval',     label: 'opt. model' },
  { from: 'ai_eval',     to: 'ai_compress', label: 'onaylı model' },
  { from: 'ai_compress', to: 'ai_deploy',   label: 'sıkıştırıldı' },
  { from: 'ai_deploy',   to: 'ai_mlops',    label: 'canlı sistem' },
  /* Geri bildirim döngüleri (dashed) */
  {
    from: 'ai_eval', to: 'ai_feature', label: 'hata analizi',
    feedback: true,
    sx: 607, sy: 518, ex: 273, ey: 327,
    cx: 55, cy: 422, lx: 135, ly: 408,
  },
  {
    from: 'ai_mlops', to: 'ai_collect', label: 'drift → retrain',
    feedback: true,
    sx: 638, sy: 725, ex: 118, ey: 155,
    cx: 14, cy: 440, lx: 88, ly: 528,
  },
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
   GENERIC DIAGRAM BUILDER
═══════════════════════════════════════════════ */

function makeMarker(NS, id, color, opacity) {
  const marker = document.createElementNS(NS, 'marker');
  marker.setAttribute('id', id);
  marker.setAttribute('markerWidth', '10');
  marker.setAttribute('markerHeight', '7');
  marker.setAttribute('refX', '9');
  marker.setAttribute('refY', '3.5');
  marker.setAttribute('orient', 'auto');
  const poly = document.createElementNS(NS, 'polygon');
  poly.setAttribute('points', '0 0, 10 3.5, 0 7');
  poly.setAttribute('fill', color);
  if (opacity !== 1) poly.setAttribute('opacity', String(opacity));
  marker.appendChild(poly);
  return marker;
}

function buildDiagramSVG(svgId, nodes, edges, onSelect, W = 140, H = 58) {
  const svg = document.getElementById(svgId);
  const NS = 'http://www.w3.org/2000/svg';
  const uid = svgId;

  const defs = document.createElementNS(NS, 'defs');
  defs.appendChild(makeMarker(NS, `arr-${uid}`, '#2e3248', 1));
  defs.appendChild(makeMarker(NS, `arr-fb-${uid}`, '#6c63ff', 0.7));
  svg.appendChild(defs);

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const edgeGroup = document.createElementNS(NS, 'g');
  edgeGroup.id = svgId + '-edges';
  svg.appendChild(edgeGroup);

  edges.forEach(e => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', `edge-${svgId}-${e.from}-${e.to}`);

    let d, lx, ly;
    if (e.feedback) {
      d = `M ${e.sx},${e.sy} Q ${e.cx},${e.cy} ${e.ex},${e.ey}`;
      lx = e.lx !== undefined ? e.lx : e.cx;
      ly = e.ly !== undefined ? e.ly : e.cy;
      path.setAttribute('class', 'er-edge feedback');
      path.setAttribute('marker-end', `url(#arr-fb-${uid})`);
    } else {
      const s = nodeMap[e.from], t = nodeMap[e.to];
      const dx = t.x - s.x, dy = t.y - s.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / len, uy = dy / len;
      const pad = 32;
      const x1 = s.x + ux * pad, y1 = s.y + uy * pad;
      const x2 = t.x - ux * (pad + 6), y2 = t.y - uy * (pad + 6);
      lx = (x1 + x2) / 2;
      ly = (y1 + y2) / 2;
      d = `M${x1},${y1} Q${lx},${ly} ${x2},${y2}`;
      path.setAttribute('class', 'er-edge');
      path.setAttribute('marker-end', `url(#arr-${uid})`);
    }

    path.setAttribute('d', d);
    edgeGroup.appendChild(path);

    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x', lx);
    lbl.setAttribute('y', ly - 6);
    lbl.setAttribute('class', 'edge-label');
    lbl.textContent = e.label;
    edgeGroup.appendChild(lbl);
  });

  nodes.forEach(node => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'er-node');
    g.setAttribute('id', `node-${svgId}-${node.id}`);
    g.setAttribute('transform', `translate(${node.x - W / 2}, ${node.y - H / 2})`);

    const shadow = document.createElementNS(NS, 'rect');
    shadow.setAttribute('x', '3'); shadow.setAttribute('y', '5');
    shadow.setAttribute('width', W); shadow.setAttribute('height', H);
    shadow.setAttribute('rx', '10'); shadow.setAttribute('fill', node.color);
    shadow.setAttribute('opacity', '0.2');
    g.appendChild(shadow);

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('width', W); rect.setAttribute('height', H);
    rect.setAttribute('rx', '10'); rect.setAttribute('fill', node.color);
    rect.setAttribute('stroke', '#ffffff22'); rect.setAttribute('stroke-width', '1.5');
    g.appendChild(rect);

    const icon = document.createElementNS(NS, 'text');
    icon.setAttribute('x', '24'); icon.setAttribute('y', H / 2 + 1);
    icon.setAttribute('class', 'node-icon');
    icon.textContent = node.icon;
    g.appendChild(icon);

    const label = document.createElementNS(NS, 'text');
    label.setAttribute('x', (W + 20) / 2 + 6);
    label.setAttribute('y', H / 2 + 1);
    label.setAttribute('class', 'node-label');
    label.textContent = node.label;
    g.appendChild(label);

    g.addEventListener('click', () => onSelect(node.id));
    svg.appendChild(g);
  });
}

/* ═══════════════════════════════════════════════
   DIAGRAM 1 — VERİ ANALİZİ
═══════════════════════════════════════════════ */

let activeNode = null;

function selectNode(id) {
  if (activeNode) {
    document.getElementById(`node-diagram-svg-${activeNode}`).classList.remove('active');
    EDGES.forEach(e => {
      const el = document.getElementById(`edge-diagram-svg-${e.from}-${e.to}`);
      if (el) el.classList.remove('highlight');
    });
  }
  if (activeNode === id) {
    activeNode = null;
    document.getElementById('detail-content').style.display = 'none';
    document.querySelector('.detail-placeholder').style.display = 'flex';
    return;
  }
  activeNode = id;
  document.getElementById(`node-diagram-svg-${id}`).classList.add('active');
  EDGES.forEach(e => {
    if (e.from === id || e.to === id) {
      const el = document.getElementById(`edge-diagram-svg-${e.from}-${e.to}`);
      if (el) el.classList.add('highlight');
    }
  });
  renderDetail(NODES.find(n => n.id === id), 'detail-content', 'detail-placeholder');
}

/* ═══════════════════════════════════════════════
   DIAGRAM 2 — YZ MODELİ
═══════════════════════════════════════════════ */

let activeAINode = null;

function selectAINode(id) {
  if (activeAINode) {
    document.getElementById(`node-ai-svg-${activeAINode}`).classList.remove('active');
    AI_EDGES.forEach(e => {
      const el = document.getElementById(`edge-ai-svg-${e.from}-${e.to}`);
      if (el) el.classList.remove('highlight');
    });
  }
  if (activeAINode === id) {
    activeAINode = null;
    document.getElementById('ai-detail-content').style.display = 'none';
    document.getElementById('ai-placeholder').style.display = 'flex';
    return;
  }
  activeAINode = id;
  document.getElementById(`node-ai-svg-${id}`).classList.add('active');
  AI_EDGES.forEach(e => {
    if (e.from === id || e.to === id) {
      const el = document.getElementById(`edge-ai-svg-${e.from}-${e.to}`);
      if (el) el.classList.add('highlight');
    }
  });
  renderDetail(AI_NODES.find(n => n.id === id), 'ai-detail-content', 'ai-placeholder');
}

/* ═══════════════════════════════════════════════
   DETAIL PANEL RENDERER
═══════════════════════════════════════════════ */

function renderDetail(node, contentId, placeholderId) {
  document.getElementById(placeholderId).style.display = 'none';
  const content = document.getElementById(contentId);
  content.style.display = 'block';

  const pitfallBlock = node.pitfall ? `
    <h3>Kritik Uyarı</h3>
    <div class="pitfall-box">${node.pitfall}</div>
  ` : '';

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
    ${pitfallBlock}
  `;
}

/* ═══════════════════════════════════════════════
   TAB 3 — İSTATİSTİK
═══════════════════════════════════════════════ */

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
   TAB 4 — KAYNAKLAR
═══════════════════════════════════════════════ */

const RESOURCES_DATA = [
  { icon: '📚', name: 'Kaggle Learn', desc: 'Ücretsiz veri analizi, makine öğrenmesi ve derin öğrenme kursları. Her ders notebook ile uygulamalı.', tag: 'Kurs · Ücretsiz' },
  { icon: '🎓', name: 'Coursera – IBM Data Science', desc: 'IBM\'in kapsamlı veri bilimi sertifika programı. Python, SQL ve ML konularını kapsar.', tag: 'Sertifika · Ücretli' },
  { icon: '📖', name: 'Python for Data Analysis (Wes McKinney)', desc: 'Pandas\'ın yaratıcısından kapsamlı veri analizi kitabı. NumPy ve Pandas derinlemesine ele alınıyor.', tag: 'Kitap' },
  { icon: '🤗', name: 'Hugging Face', desc: 'Makine öğrenmesi modelleri ve dataset\'leri için en büyük açık topluluk. Transformers merkezi.', tag: 'Platform' },
  { icon: '📊', name: 'Towards Data Science (Medium)', desc: 'Veri bilimcilerin deneyim ve tutorial makaleleri paylaştığı Medium yayını.', tag: 'Blog' },
  { icon: '🛠️', name: 'Scikit-learn Docs', desc: 'Her ML algoritması için örnekli, kapsamlı ve kullanıcı dostu dokümantasyon.', tag: 'Dokümantasyon' },
  { icon: '🗂️', name: 'UCI ML Repository', desc: 'Makine öğrenmesi araştırmalarında kullanılan klasik veri setlerinin arşivi.', tag: 'Dataset' },
];

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

buildDiagramSVG('diagram-svg', NODES, EDGES, selectNode, 140, 58);
buildDiagramSVG('ai-svg', AI_NODES, AI_EDGES, selectAINode, 155, 54);
buildStats();
buildResources();
