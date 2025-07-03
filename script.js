// DOM Elementlerini Seç
const pointsSpan = document.getElementById('points');
const levelSpan = document.getElementById('level');
const earnPointsBtn = document.getElementById('earn-points-btn');
const messagesContainer = document.getElementById('messages');
const badgesContainer = document.getElementById('badges-container');
const noBadgesMsg = document.getElementById('no-badges-msg');
const levelProgressBar = document.getElementById('level-progress-bar');
const levelProgressText = document.getElementById('level-progress-text');

// Oyun Durumunu Sakla (localStorage'dan yükle veya varsayılan değerler)
let player = JSON.parse(localStorage.getItem('gamifiedPlayer')) || {
    points: 0,
    level: 1,
    earnedBadges: [] // Kazandığı rozetlerin ID'lerini tutacak dizi
};

// Tüm olası rozetler (ID, ad, açıklama, görsel yolu)
const allBadges = [
    { id: 'first_click', name: 'İlk Dokunuş', description: 'İlk puanını kazandın!', imageUrl: 'https://via.placeholder.com/50/FFD700/FFFFFF?text=1' },
    { id: 'apprentice', name: 'Çırak Tıklayıcı', description: 'Toplam 50 puan kazandın!', imageUrl: 'https://via.placeholder.com/50/C0C0C0/FFFFFF?text=50' },
    { id: 'master_clicker', name: 'Usta Tıklayıcı', description: 'Toplam 200 puan kazandın!', imageUrl: 'https://via.placeholder.com/50/B87333/FFFFFF?text=200' },
    { id: 'level_2_achiever', name: 'Seviye 2 Başarısı', description: '2. seviyeye ulaştın!', imageUrl: 'https://via.placeholder.com/50/ADD8E6/FFFFFF?text=L2' },
    { id: 'champion', name: 'Şampiyon', description: 'Toplam 500 puan kazandın!', imageUrl: 'https://via.placeholder.com/50/800080/FFFFFF?text=500' }
];

// Oyuncunun durumunu ve UI'ı güncelle
function updateUI() {
    pointsSpan.textContent = player.points;
    levelSpan.textContent = player.level;

    // Seviye İlerleme Çubuğu Güncellemesi
    const pointsForNextLevel = player.level * 50; // Her seviye için 50 puan artış varsayalım
    let progressPercentage = (player.points / pointsForNextLevel) * 100;
    if (progressPercentage > 100) progressPercentage = 100; // %100'ü geçmesin

    levelProgressBar.style.width = `${progressPercentage}%`;
    if (player.points >= pointsForNextLevel) {
        levelProgressText.textContent = `Seviye ${player.level} Tamamlandı!`;
    } else {
        const remainingPoints = pointsForNextLevel - player.points;
        levelProgressText.textContent = `Sonraki Seviyeye Kalan: ${remainingPoints} Puan (${Math.round(progressPercentage)}%)`;
    }

    // Rozetleri Göster
    renderBadges();

    // localStorage'a kaydet
    localStorage.setItem('gamifiedPlayer', JSON.stringify(player));
}

// Rozetleri render et
function renderBadges() {
    badgesContainer.innerHTML = ''; // Öncekileri temizle

    if (player.earnedBadges.length === 0) {
        noBadgesMsg.style.display = 'block'; // Rozet yoksa mesajı göster
    } else {
        noBadgesMsg.style.display = 'none'; // Rozet varsa mesajı gizle
        player.earnedBadges.forEach(badgeId => {
            const badge = allBadges.find(b => b.id === badgeId);
            if (badge) {
                const badgeItem = document.createElement('div');
                badgeItem.className = 'badge-item';
                badgeItem.innerHTML = `
                    <img src="${badge.imageUrl}" alt="${badge.name}">
                    <h3>${badge.name}</h3>
                    <p>${badge.description}</p>
                `;
                badgesContainer.appendChild(badgeItem);
            }
        });
    }
}

// Mesaj gösterme fonksiyonu
function showMessage(text, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesContainer.prepend(messageDiv); // En üste ekle

    // Birkaç saniye sonra mesajı kaldır
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Puan Kazanma Fonksiyonu
function earnPoints() {
    const pointsToAdd = 10;
    player.points += pointsToAdd;
    showMessage(`+${pointsToAdd} Puan Kazandınız!`, 'primary');

    // Seviye Atlama Kontrolü
    const pointsForNextLevel = player.level * 50; // Her seviye için 50 puan varsayımımız
    if (player.points >= pointsForNextLevel) {
        player.level++;
        showMessage(`Tebrikler! Seviye ${player.level} oldunuz!`, 'success');
        checkAndAwardBadge('level_2_achiever', player.level >= 2); // Örnek: Seviye 2 rozeti
    }

    // Rozet Kontrolleri
    checkAndAwardBadge('first_click', player.points >= 10);
    checkAndAwardBadge('apprentice', player.points >= 50);
    checkAndAwardBadge('master_clicker', player.points >= 200);
    checkAndAwardBadge('champion', player.points >= 500);


    updateUI(); // UI'ı ve localStorage'ı güncelle
}

// Rozet kontrol ve verme fonksiyonu
function checkAndAwardBadge(badgeId, condition) {
    if (condition && !player.earnedBadges.includes(badgeId)) {
        player.earnedBadges.push(badgeId);
        const badge = allBadges.find(b => b.id === badgeId);
        if (badge) {
            showMessage(`Yeni rozet kazandınız: **${badge.name}**!`, 'info');
        }
    }
}


// Olay Dinleyicileri
earnPointsBtn.addEventListener('click', earnPoints);

// Sayfa yüklendiğinde UI'ı ilk kez güncelle
document.addEventListener('DOMContentLoaded', updateUI);