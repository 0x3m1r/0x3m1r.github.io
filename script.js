function test(){
  var tabsNewAnim = $('#navbarSupportedContent');
  var activeItemNewAnim = tabsNewAnim.find('li.active');
  if(activeItemNewAnim.length == 0) return;

  var activeHeight = activeItemNewAnim.innerHeight();
  var activeWidth = activeItemNewAnim.innerWidth();
  var itemPos = activeItemNewAnim.position();

  $(".hori-selector").css({
    "top": itemPos.top + "px",
    "left": itemPos.left + "px",
    "height": activeHeight + "px",
    "width": activeWidth + "px"
  });
}

$(document).ready(function(){
  setTimeout(test, 100);

  $("#navbarSupportedContent").on("click", "li", function(){
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    test();
  });
});

$(window).on('resize', function(){
  setTimeout(test, 500);
});

$(".navbar-toggler").click(function(){
  $(".navbar-collapse").slideToggle(300);
  setTimeout(test, 300);
});

(function(){
  var tabButtons = document.querySelectorAll('.analysis-tab');
  var panels = document.querySelectorAll('.analysis-tab-panel');
  var diagramDetails = document.getElementById('diagramDetails');
  var stageNodes = document.querySelectorAll('.er-node');

  var details = {
    source: [
      'Veri kaynaklarını belirleyin ve güvenilir veri setlerini seçin.',
      'Veri formatlarını kontrol edin, eksik veri varsa not alın.',
      'Verinin güncelliğini ve kapsamını değerlendirin.'
    ],
    cleaning: [
      'Eksik değerleri tamamlayın veya veri kaynağından yeniden alın.',
      'Hatalı, tekrar eden ve tutarsız kayıtları temizleyin.',
      'Veriyi normalleştirin ve gereksiz sütunları kaldırın.'
    ],
    features: [
      'Özellikleri ölçeklendirin, kategorik verileri kodlayın.',
      'Yeni değişkenler türetin ve önemli özellikleri seçin.',
      'Verinin modelleme için uygun hale geldiğinden emin olun.'
    ],
    modeling: [
      'Doğru model tipini seçin ve eğitim/test kümelerini ayırın.',
      'Modeli eğitin, performansını ölçün ve hiperparametre ayarlayın.',
      'Sonuçları yorumlayın ve raporlayın.'
    ]
  };

  function switchTab(targetId) {
    tabButtons.forEach(function(button){
      button.classList.toggle('active', button.dataset.tab === targetId);
    });
    panels.forEach(function(panel){
      panel.classList.toggle('active', panel.id === 'tab-' + targetId);
    });
  }

  tabButtons.forEach(function(button){
    button.addEventListener('click', function(){
      switchTab(button.dataset.tab);
    });
  });

  function showStage(stageId) {
    stageNodes.forEach(function(node){
      node.classList.toggle('active', node.dataset.stage === stageId);
    });
    var stepList = details[stageId] || [];
    diagramDetails.innerHTML = '<h4>' + document.querySelector('.er-node[data-stage="' + stageId + '"]').textContent + '</h4>' +
      '<ul>' + stepList.map(function(item){ return '<li>' + item + '</li>'; }).join('') + '</ul>';
  }

  stageNodes.forEach(function(node){
    node.addEventListener('click', function(){
      showStage(node.dataset.stage);
    });
  });

  if(stageNodes.length){
    showStage(stageNodes[0].dataset.stage);
  }
})();
