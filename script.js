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
  { from: 'collect',    to: 'clean',     label: 'ham veri' },
  { from: 'collect',    to: 'transform', label: 'ham veri' },
  { from: 'clean',      to: 'eda',       label: 'temiz veri' },
  { from: 'transform',  to: 'eda',       label: 'hazır veri' },
  { from: 'eda',        to: 'model',     label: 'içgörüler' },
  { from: 'model',      to: 'eval',      label: 'tahminler' },
  { from: 'model',      to: 'report',    label: 'bulgular' },
  { from: 'eval',       to: 'report',    label: 'metrikler' },
];

/* ═══════════════════════════════════════════════
   TAB 2 — YZ MODELİ TASARIM SÜRECİ
═══════════════════════════════════════════════ */

const AI_NODES = [
  {
    id: 'ai_problem', label: 'Problem Tanımlama', icon: '🎯', color: '#6366f1', x: 400, y: 50,
    badge: 'Aşama 1 · Temel',
    desc: 'Tüm ML projelerinin en kritik adımıdır. Hatalı tanımlanan bir problem, ne kadar iyi model kurulursa kurulsun başarısızlığa mahkumdur. CRISP-DM, Google ML Universal Workflow ve Andrew Ng\'in ML Strategy metodolojilerinin ortak başlangıç noktasıdır.',
    steps: [
      'İş problemi teknik ML problemi olarak yeniden çerçevelenir: Sınıflandırma mı? Regresyon mu? Kümeleme mi? Sıralama mı? Üretken model mi?',
      'Başarı metrikleri iş hedefleriyle hizalanır — iş metriği (gelir, churn) ile ML metriği (F1, RMSE) arasındaki köprü kurulur',
      'Mevcut en basit baseline belirlenir: "Herkes çoğunluk sınıfını tahmin etse ne olur?" sorusu yanıtlanır',
      'Veri gereksinimi ve erişilebilirlik analiz edilir — etiketli veri var mı? Yeterli mi?',
      'ML\'in doğru çözüm olup olmadığı sorgulanır: Kural tabanlı sistem veya basit heuristik daha verimli olabilir mi?',
      'Etik, hukuki ve önyargı (bias) riskleri değerlendirilir (GDPR, fairness, protected attributes)',
      'Proje kapsamı, zaman çizelgesi ve kaynak bütçesi netleştirilir',
    ],
    tools: ['Notion / Confluence (dokümantasyon)', 'Miro (problem haritalama)', 'Jira (proje yönetimi)', 'Model Card Template (Google)'],
    pitfall: 'En sık yapılan hata: iş problemi netleşmeden veri toplamaya başlamak. Bu, yanlış hedef değişken seçimine yol açar.',
  },
  {
    id: 'ai_collect', label: 'Veri Toplama', icon: '🗃️', color: '#3b82f6', x: 175, y: 165,
    badge: 'Aşama 2 · Kritik',
    desc: 'Model kalitesinin tavanını belirleyen aşamadır: "Garbage in, garbage out." Verinin miktarı kadar, temsil gücü ve kalitesi de son derece önemlidir. Annotation (etiketleme) maliyeti burada planlanır.',
    steps: [
      'Veri kaynakları belirlenir: İç DB, harici API, web scraping, sensörler, açık dataset\'ler, sentetik veri üretimi',
      'Annotation (etiketleme) stratejisi seçilir: İnsan etiketleme (Label Studio, Scale AI), weak supervision (Snorkel), semi-supervised yaklaşım',
      'Sınıf dengesizliği (class imbalance) riski önceden değerlendirilir; gerekirse oversampling (SMOTE) planlanır',
      'Veri sözleşmesi (data contract) tanımlanır: şema, format, beklenen değer aralıkları, zorunlu alanlar',
      'Gizlilik ve anonimleştirme politikaları uygulanır (PII maskeleme, k-anonymity)',
      'Veri versiyonlama sistemi kurulur — kod gibi veri de versiyon kontrolüne tabi tutulur',
      'Yeterli veri hacmi tahmini yapılır: genellikle sınıf başına minimum 1000 örnek, karmaşık DL için çok daha fazlası',
    ],
    tools: ['Label Studio / Scale AI (annotation)', 'DVC (veri versiyonlama)', 'Great Expectations (veri doğrulama)', 'Apache Kafka (streaming veri)', 'Hugging Face Datasets'],
    pitfall: 'Veri toplandıktan sonra etiketleme stratejisi değiştirilirse tüm süreç başa dönebilir. Önce küçük pilot, sonra büyük ölçek.',
  },
  {
    id: 'ai_eda', label: 'EDA & Veri Anlama', icon: '🔬', color: '#06b6d4', x: 625, y: 165,
    badge: 'Aşama 3 · Keşif',
    desc: 'Veriyi anlamadan model kurmak, haritasız arazi geçmeye benzer. Bu aşamada verinin yapısı, gizli örüntüler, sorunlu bölgeler ve hipotezler ortaya çıkarılır. EDA sonuçları hem feature engineering hem model seçimini doğrudan etkiler.',
    steps: [
      'Tanımlayıcı istatistikler hesaplanır: mean, median, std, skewness, kurtosis, min/max, çeyrekler',
      'Hedef değişken dağılımı incelenir: imbalance ratio, normal dağılımdan sapma, log-dönüşüm gerekliliği',
      'Tüm özellikler için missing value oranı ve örüntüsü analiz edilir: MCAR/MAR/MNAR ayrımı yapılır',
      'Özellikler arası korelasyon matrisi ve scatter plot matrix çizilir (multicollinearity tespiti)',
      'Aykırı değerler görselleştirilir: boxplot, z-score, IQR yöntemi karşılaştırılır',
      'Özellik-hedef ilişkileri her değişken için ayrı ayrı incelenir (ANOVA, mutual information)',
      'Temporal pattern analizi yapılır: zaman serisi ise trend, seasonality, autocorrelation (ACF/PACF)',
    ],
    tools: ['Pandas Profiling / YData Profiling', 'SweetViz', 'Lux (otomatik görselleştirme)', 'Plotly / Seaborn', 'Evidently (data drift analizi)'],
    pitfall: 'EDA\'yı atlayıp direkt modele geçmek, feature engineering hatalarını çok geç fark ettirir ve geri dönüş masraflı olur.',
  },
  {
    id: 'ai_feature', label: 'Özellik Mühendisliği', icon: '⚗️', color: '#8b5cf6', x: 400, y: 275,
    badge: 'Aşama 4 · En Etkili',
    desc: 'Andrew Ng\'e göre: "Applied ML is basically feature engineering." Özellikle klasik ML\'de modelin performansını en çok etkileyen tek adımdır. Derin öğrenmede bazı feature engineering otomatik yapılsa da iyi özellikler hâlâ kritiktir.',
    steps: [
      'Ham özellikler domain bilgisiyle zenginleştirilir: oranlar, farklar, çarpımlar, logaritmik dönüşümler',
      'Kategorik değişkenler encode edilir: OHE (düşük kardinalite), Target Encoding (yüksek kardinalite), Embedding (DL)',
      'Sayısal değişkenler ölçeklendirilir: StandardScaler (Gaussian), MinMaxScaler (sınırlı aralık), RobustScaler (aykırı değer)',
      'Özellik seçimi (feature selection) yapılır: Filter (MI, χ², ANOVA-F), Wrapper (RFE), Embedded (Lasso/Ridge, tree importance)',
      'Boyut indirgeme uygulanır: PCA (doğrusal, varyansı koru), UMAP/t-SNE (non-linear, görselleştirme)',
      'Zaman serisi için lag özellikleri, rolling window (mean, std, max), Fourier transform ve holiday feature\'ları eklenir',
      'Özellik deposu (feature store) kurulur: eğitim ve servis ortamında aynı özellik hesaplamalarının tutarlılığı sağlanır',
    ],
    tools: ['Featuretools (otomatik FE)', 'Scikit-learn Pipeline', 'UMAP-learn', 'Feast / Tecton (feature store)', 'Boruta (feature selection)'],
    pitfall: 'Training-serving skew: eğitimde hesaplanan özellikler ile production\'da hesaplananlar farklı olursa model bozulur. Feature store bu riski minimize eder.',
  },
  {
    id: 'ai_arch', label: 'Model Mimarisi', icon: '🏗️', color: '#f59e0b', x: 185, y: 385,
    badge: 'Aşama 5 · Seçim',
    desc: 'Hangi model ailesinin seçileceği, veri boyutuna, problem türüne ve hesaplama bütçesine göre belirlenir. "En karmaşık model en iyi model değildir" — Occam\'s Razor ML\'de de geçerlidir. Her zaman basit bir baseline ile başlanır.',
    steps: [
      'ML vs. DL kararı verilir: Tablo verisi + <100K satır → Gradient Boosting. Görüntü → CNN/ViT. Metin → Transformer. Zaman serisi → LSTM veya TFT',
      'Transfer Learning değerlendirilir: mevcut pretrained modeller (BERT, ResNet, ViT, Whisper) fine-tune edilebilir mi?',
      'Baseline model kurulur: Lojistik regresyon veya ortalama tahmini — tüm karmaşık modeller bunu geçmeli',
      'Model karmaşıklığı ile veri boyutu dengelenir: az veri → basit model + regularization, çok veri → daha derin mimari',
      'Ensemble stratejisi planlanır: Bagging (Random Forest), Boosting (XGBoost, LightGBM), Stacking, Blending',
      'Mimari kararlar belgelenir: katman sayısı, attention head sayısı, hidden dimension, aktivasyon fonksiyonu seçimi',
      'Hesaplama ve bellek kısıtları gözetilir: model büyüklüğü, inference latency, deployment hedefi (cloud/edge/mobil)',
    ],
    tools: ['Scikit-learn (klasik ML)', 'XGBoost / LightGBM / CatBoost', 'PyTorch / TensorFlow-Keras', 'HuggingFace Transformers', 'AutoGluon / H2O AutoML'],
    pitfall: 'SOTA (state-of-the-art) modeli seçmek her zaman doğru değildir. Basit bir XGBoost modeli çoğu zaman büyük bir Transformer\'ı geçer.',
  },
  {
    id: 'ai_train', label: 'Eğitim & Optimizasyon', icon: '⚡', color: '#10b981', x: 615, y: 385,
    badge: 'Aşama 6 · Yoğun',
    desc: 'Modelin veriden öğrendiği aşamadır. Loss fonksiyonu, optimizer ve learning rate seçimi modelin öğrenme kalitesini doğrudan belirler. Hiperparametre optimizasyonu burada yapılır. MLOps altyapısı experiment tracking için devreye girer.',
    steps: [
      'Loss fonksiyonu seçilir: CrossEntropy (çok sınıflı), BCE (ikili), MSE/MAE/Huber (regresyon), Focal Loss (imbalanced), Triplet Loss (metric learning)',
      'Optimizer seçilir: Adam/AdamW (genel kullanım), SGD+Momentum (büyük batch derin ağlar), Lion (yeni nesil, bellek tasarruflu)',
      'Learning rate scheduling kurulur: Warmup + Cosine Decay, OneCycleLR, ReduceLROnPlateau — çok büyük veya çok küçük LR en yaygın başarısızlık sebebidir',
      'Regularization uygulanır: Dropout (DL), L1/L2 weight decay, Data Augmentation (görüntü/metin), Early Stopping, Batch Normalization',
      'Hiperparametre optimizasyonu yapılır: Grid Search (küçük uzay), Random Search (orta), Bayesian Optimization / TPE (büyük uzay, Optuna/Ray Tune)',
      'Experiment tracking sistemi kurulur: her deney metrik, parametre ve artifact ile kayıt altına alınır',
      'Distributed training gerekiyorsa yapılandırılır: Data Parallel (DDP), Model Parallel, Mixed Precision (FP16/BF16) ile hız ve bellek optimize edilir',
    ],
    tools: ['PyTorch Lightning / HuggingFace Trainer', 'Optuna / Ray Tune (HPO)', 'Weights & Biases / MLflow (experiment tracking)', 'HuggingFace Accelerate (distributed)', 'NVIDIA CUDA / cuDNN'],
    pitfall: 'Learning rate en kritik hiperparametredir. Learning Rate Finder algoritması kullanmadan başlamak çoğunlukla zaman kaybıdır.',
  },
  {
    id: 'ai_eval', label: 'Değerlendirme', icon: '📐', color: '#ec4899', x: 400, y: 465,
    badge: 'Aşama 7 · Dürüstlük',
    desc: 'Modelin gerçekten işe yarayıp yaramadığı burada anlaşılır. Tek bir metriğe güvenmek yanıltıcı olabilir — her zaman birden fazla boyuttan değerlendirme yapılır. Hata analizi, nerede ve neden yanıldığımızı gösterir.',
    steps: [
      'Problem türüne göre metrik seçilir: Sınıflandırma → F1/AUC-ROC/PR-AUC/Cohen\'s Kappa (imbalanced ise PR-AUC kritik). Regresyon → RMSE/MAE/MAPE/R². Üretici → BLEU/ROUGE/BERTScore/FID/FRéchet',
      'Hata analizi (error analysis) yapılır: model hangi örneklerde yanılıyor? Hangi koşullarda? (kaotik label mı, dağılım kayması mı?)',
      'Model yorumlanabilirliği (XAI) uygulanır: SHAP değerleri ile hangi özelliğin kararı ne kadar etkilediği görselleştirilir',
      'Bias ve fairness analizi yapılır: protected group\'lar (cinsiyet, yaş, ırk) için ayrı performans ölçülür (Equalized Odds, Demographic Parity)',
      'Çıkarım hızı (inference latency) ve bellek kullanımı ölçülür — iş gereksinimleriyle karşılaştırılır',
      'Overfitting/Underfitting analizi yapılır: train/val/test loss eğrileri karşılaştırılır, learning curve çizilir',
      'Rakip model karşılaştırması yapılır: champion-challenger framewok ile en iyi model belirlenir',
    ],
    tools: ['Scikit-learn metrics', 'SHAP / LIME / Grad-CAM', 'Fairlearn / AI Fairness 360', 'Evidently AI', 'MLflow / W&B (model comparison)'],
    pitfall: 'Test seti kirlenmesi (data leakage): gelecek bilgisinin modele sızması F1\'i yapay şişirir. Temporal veri için time-based split zorunludur.',
  },
  {
    id: 'ai_deploy', label: 'Deployment', icon: '🚀', color: '#f97316', x: 185, y: 545,
    badge: 'Aşama 8 · Prodüksiyon',
    desc: 'Model dünyaya açılır. "80% of ML models never make it to production" — deployment engineering ayrı bir uzmanlık alanıdır. Servis mimarisinin yanlış kurulması, mükemmel bir modeli anlamsız kılar.',
    steps: [
      'Model serileştirilir: ONNX (çapraz platform), TorchScript (PyTorch), TF SavedModel, Pickle/Joblib (klasik ML)',
      'Model optimizasyonu yapılır: Quantization (INT8/FP16 ile 4x hız), Pruning (gereksiz ağırlıkları sil), Knowledge Distillation (büyük modeli küçük modele öğret)',
      'Serving API oluşturulur: FastAPI (hafif, hızlı), TorchServe, TF Serving, NVIDIA Triton Inference Server (yüksek throughput)',
      'Containerize edilir: Docker ile ortam bağımlılıkları sabitlenir; Kubernetes ile ölçeklendirme ve yük dengeleme kurulur',
      'CI/CD pipeline oluşturulur: her model güncellemesi test → staging → production aşamalarından geçer (GitHub Actions, Jenkins)',
      'A/B testi veya Canary deployment uygulanır: yeni model önce küçük bir trafik dilimine açılır; istatistiksel anlamlılık sağlandıktan sonra tam geçiş yapılır',
      'Güvenlik denetimi yapılır: adversarial robustness testi, input validation (schema enforcement), rate limiting, model extraction saldırılarına karşı koruma',
    ],
    tools: ['Docker / Kubernetes', 'FastAPI / BentoML', 'AWS SageMaker / GCP Vertex AI / Azure ML', 'ONNX Runtime', 'GitHub Actions / ArgoCD (CI/CD)'],
    pitfall: 'Model ve servis ortamı arasındaki Python/kütüphane versiyonu farkları production\'ı anında durdurabilir. Docker bu riski ortadan kaldırır.',
  },
  {
    id: 'ai_mlops', label: 'MLOps & İzleme', icon: '🔭', color: '#ef4444', x: 615, y: 545,
    badge: 'Aşama 9 · Sürekli',
    desc: 'Deployment bitiş değil, başlangıçtır. Dünya değiştikçe modelin performansı bozulur (model drift). MLOps, modeli canlı tutan ve otomatik güncelleyen mühendislik disiplinidir. Google MLOps Maturity Model\'e göre bu aşama 0-3 seviyeye ayrılır.',
    steps: [
      'Model performansı gerçek zamanlı izlenir: tahmin dağılımı, confidence skorları, business KPI\'lar dashboard\'da görüntülenir',
      'Data drift tespiti yapılır: girdi özelliklerinin dağılımı değişiyor mu? PSI (Population Stability Index), KS testi, Jensen-Shannon divergence kullanılır',
      'Concept drift tespiti yapılır: özellik-label ilişkisi bozulmuş mu? Gerçek etiketler (ground truth) gecikimli de olsa toplanır ve model performansı monitör edilir',
      'Otomatik yeniden eğitim (retraining) pipeline\'ı kurulur: drift eşiği aşılınca tetiklenen tam otomatik veya insan onaylı retraining akışı',
      'Model versiyonlama ve registry yönetilir: hangi modelin production\'da, hangi modelin staging\'de olduğu takip edilir; geri alma (rollback) mekanizması hazır tutulur',
      'Feedback loop oluşturulur: production\'daki tahminlere gelen gerçek etiketler toplanarak gelecek eğitim setine eklenir',
      'Maliyet optimizasyonu yapılır: spot instance kullanımı, model caching, batch inference, inference-at-edge alternatifleri değerlendirilir',
    ],
    tools: ['Evidently AI / WhyLabs (drift monitoring)', 'Prometheus + Grafana (altyapı izleme)', 'MLflow Model Registry / W&B Artifacts', 'Apache Airflow / Prefect (pipeline orchestration)', 'Arize AI (ML observability)'],
    pitfall: 'İzleme kurulmadan bırakılan modeller sessiz sedasız bozulur. "Silent failure" — yanlış tahmin yapar ama kimse fark etmez.',
  },
];

const AI_EDGES = [
  { from: 'ai_problem', to: 'ai_collect',  label: 'gereksinimler' },
  { from: 'ai_problem', to: 'ai_eda',      label: 'gereksinimler' },
  { from: 'ai_collect', to: 'ai_feature',  label: 'ham veri' },
  { from: 'ai_eda',     to: 'ai_feature',  label: 'içgörüler' },
  { from: 'ai_feature', to: 'ai_arch',     label: 'özellik seti' },
  { from: 'ai_arch',    to: 'ai_train',    label: 'mimari' },
  { from: 'ai_train',   to: 'ai_eval',     label: 'eğitilmiş model' },
  { from: 'ai_eval',    to: 'ai_deploy',   label: 'onaylı model' },
  { from: 'ai_deploy',  to: 'ai_mlops',    label: 'canlı sistem' },
  // feedback loops — manually controlled curves
  {
    from: 'ai_eval', to: 'ai_feature', label: 'iterasyon',
    feedback: true, sx: 478, sy: 460, ex: 478, ey: 300, cx: 590, cy: 375,
  },
  {
    from: 'ai_mlops', to: 'ai_collect', label: 'drift → retraining',
    feedback: true, sx: 538, sy: 542, ex: 215, ey: 190, cx: 38, cy: 360,
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
  const uid = svgId; // unique prefix for marker IDs

  const defs = document.createElementNS(NS, 'defs');
  defs.appendChild(makeMarker(NS, `arr-${uid}`, '#2e3248', 1));
  defs.appendChild(makeMarker(NS, `arr-fb-${uid}`, '#6c63ff', 0.7));
  svg.appendChild(defs);

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Edges
  const edgeGroup = document.createElementNS(NS, 'g');
  edgeGroup.id = svgId + '-edges';
  svg.appendChild(edgeGroup);

  edges.forEach(e => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', `edge-${svgId}-${e.from}-${e.to}`);

    let d, mx, my;
    if (e.feedback) {
      d = `M ${e.sx},${e.sy} Q ${e.cx},${e.cy} ${e.ex},${e.ey}`;
      mx = (e.sx + e.ex) / 2;
      my = (e.sy + e.ey) / 2;
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
      mx = (x1 + x2) / 2; my = (y1 + y2) / 2;
      d = `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
      path.setAttribute('class', 'er-edge');
      path.setAttribute('marker-end', `url(#arr-${uid})`);
    }

    path.setAttribute('d', d);
    edgeGroup.appendChild(path);

    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x', e.feedback ? e.cx : mx);
    lbl.setAttribute('y', (e.feedback ? e.cy : my) - 6);
    lbl.setAttribute('class', 'edge-label');
    lbl.textContent = e.label;
    edgeGroup.appendChild(lbl);
  });

  // Nodes
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
buildDiagramSVG('ai-svg', AI_NODES, AI_EDGES, selectAINode, 155, 56);
buildStats();
buildResources();
