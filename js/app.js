// MBTI City Test - Main Application
(function() {
  'use strict';

  // MBTI axis scores: E/I, S/N, T/F, J/P
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let currentQuestion = 0;
  const totalQuestions = 8;

  // Questions mapped to MBTI axes
  const questions = [
    { key: 'q1', axis: 'EI' },   // exploring a new city -> E/I
    { key: 'q2', axis: 'SN' },   // neighborhood appeal -> S/N
    { key: 'q3', axis: 'TF' },   // restaurant choice -> T/F
    { key: 'q4', axis: 'JP' },   // travel planning -> J/P
    { key: 'q5', axis: 'EI' },   // perfect evening -> E/I
    { key: 'q6', axis: 'SN' },   // what catches your eye -> S/N
    { key: 'q7', axis: 'TF' },   // street performer -> T/F
    { key: 'q8', axis: 'JP' },   // flight delayed -> J/P
  ];

  // City results for each MBTI type
  const cityResults = {
    INTJ: { city: 'tokyo', traits: ['strategic', 'efficient', 'futuristic'] },
    ENFP: { city: 'barcelona', traits: ['colorful', 'creative', 'spontaneous'] },
    ISTJ: { city: 'london', traits: ['traditional', 'reliable', 'structured'] },
    INFP: { city: 'paris', traits: ['romantic', 'artistic', 'dreamy'] },
    ENTP: { city: 'newYork', traits: ['innovative', 'fastPaced', 'debateLover'] },
    ISFJ: { city: 'copenhagen', traits: ['cozy', 'caring', 'community'] },
    ENTJ: { city: 'singapore', traits: ['ambitious', 'organized', 'powerful'] },
    INFJ: { city: 'kyoto', traits: ['spiritual', 'deep', 'harmonious'] },
    ESTP: { city: 'dubai', traits: ['bold', 'action', 'luxury'] },
    ISFP: { city: 'florence', traits: ['artistic', 'sensory', 'beautiful'] },
    ESTJ: { city: 'berlin', traits: ['practical', 'direct', 'leader'] },
    INTP: { city: 'reykjavik', traits: ['intellectual', 'unique', 'solitary'] },
    ESFP: { city: 'rio', traits: ['party', 'vibrant', 'joyful'] },
    ISTP: { city: 'oslo', traits: ['minimal', 'independent', 'functional'] },
    ESFJ: { city: 'seoul', traits: ['social', 'warm', 'trendy'] },
    ENFJ: { city: 'amsterdam', traits: ['inclusive', 'progressive', 'passionate'] },
  };

  // City skyline SVGs for results
  const citySkylines = {
    tokyo: '<svg viewBox="0 0 180 100" fill="none"><rect x="20" y="10" width="8" height="90" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="22" y="5" width="4" height="5" fill="var(--primary-light)" opacity="0.8"/><rect x="35" y="30" width="20" height="70" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="60" y="20" width="15" height="80" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="80" y="35" width="18" height="65" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="103" y="25" width="14" height="75" rx="1" fill="var(--primary-light)" opacity="0.6"/><rect x="122" y="40" width="16" height="60" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="143" y="15" width="12" height="85" rx="1" fill="var(--primary-light)" opacity="0.7"/><circle cx="24" cy="3" r="2" fill="var(--primary-light)" opacity="0.9"/></svg>',
    barcelona: '<svg viewBox="0 0 180 100" fill="none"><path d="M30 40 L40 15 L50 40" stroke="var(--primary)" stroke-width="2" fill="var(--primary)" opacity="0.5"/><rect x="35" y="40" width="10" height="60" fill="var(--primary)" opacity="0.6"/><rect x="55" y="35" width="20" height="65" rx="2" fill="var(--primary-light)" opacity="0.5"/><path d="M85 30 Q95 10 105 30" stroke="var(--primary-light)" stroke-width="2" fill="var(--primary)" opacity="0.4"/><rect x="85" y="30" width="20" height="70" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="110" y="45" width="15" height="55" rx="1" fill="var(--primary-light)" opacity="0.7"/><rect x="130" y="25" width="18" height="75" rx="1" fill="var(--primary)" opacity="0.5"/></svg>',
    london: '<svg viewBox="0 0 180 100" fill="none"><rect x="15" y="30" width="25" height="70" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="24" y="20" width="7" height="10" fill="var(--primary-light)" opacity="0.7"/><rect x="26" y="10" width="3" height="10" fill="var(--primary)" opacity="0.8"/><circle cx="80" cy="40" r="25" stroke="var(--primary-light)" stroke-width="2" fill="none" opacity="0.5"/><rect x="78" y="15" width="4" height="50" fill="var(--primary)" opacity="0.4"/><rect x="110" y="35" width="20" height="65" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="135" y="40" width="18" height="60" rx="1" fill="var(--primary-light)" opacity="0.5"/></svg>',
    paris: '<svg viewBox="0 0 180 100" fill="none"><path d="M70 100 L90 15 L110 100" stroke="var(--primary)" stroke-width="2" fill="var(--primary)" opacity="0.4"/><rect x="85" y="10" width="10" height="5" fill="var(--primary-light)" opacity="0.6"/><line x1="90" y1="5" x2="90" y2="10" stroke="var(--primary-light)" stroke-width="2"/><rect x="20" y="50" width="20" height="50" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="130" y="45" width="22" height="55" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="45" y="55" width="15" height="45" rx="1" fill="var(--primary-light)" opacity="0.6"/></svg>',
    newYork: '<svg viewBox="0 0 180 100" fill="none"><rect x="10" y="35" width="16" height="65" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="30" y="20" width="14" height="80" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="48" y="10" width="18" height="90" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="70" y="25" width="12" height="75" rx="1" fill="var(--primary-light)" opacity="0.6"/><rect x="86" y="5" width="15" height="95" rx="1" fill="var(--primary)" opacity="0.8"/><rect x="105" y="30" width="16" height="70" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="125" y="15" width="14" height="85" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="143" y="40" width="18" height="60" rx="1" fill="var(--primary-light)" opacity="0.7"/></svg>',
    copenhagen: '<svg viewBox="0 0 180 100" fill="none"><rect x="20" y="50" width="22" height="50" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M20 50 L31 35 L42 50" fill="var(--primary-light)" opacity="0.4"/><rect x="50" y="55" width="18" height="45" rx="1" fill="var(--primary-light)" opacity="0.6"/><path d="M50 55 L59 40 L68 55" fill="var(--primary)" opacity="0.4"/><rect x="75" y="45" width="20" height="55" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="100" y="30" width="8" height="70" rx="1" fill="var(--primary-light)" opacity="0.7"/><rect x="115" y="50" width="22" height="50" rx="1" fill="var(--primary)" opacity="0.6"/><path d="M115 50 L126 35 L137 50" fill="var(--primary-light)" opacity="0.4"/></svg>',
    singapore: '<svg viewBox="0 0 180 100" fill="none"><rect x="15" y="20" width="18" height="80" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="37" y="10" width="14" height="90" rx="1" fill="var(--primary-light)" opacity="0.6"/><rect x="55" y="25" width="20" height="75" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="80" y="30" width="25" height="70" rx="2" fill="var(--primary-light)" opacity="0.5"/><rect x="80" y="25" width="25" height="8" rx="4" fill="var(--primary)" opacity="0.6"/><rect x="110" y="15" width="16" height="85" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="130" y="35" width="18" height="65" rx="1" fill="var(--primary-light)" opacity="0.6"/></svg>',
    kyoto: '<svg viewBox="0 0 180 100" fill="none"><path d="M40 100 L40 40 L55 35 L55 100" fill="var(--primary)" opacity="0.4"/><path d="M35 45 L47.5 25 L60 45" fill="var(--primary-light)" opacity="0.5"/><path d="M38 35 L47.5 18 L57 35" fill="var(--primary)" opacity="0.4"/><path d="M41 25 L47.5 12 L54 25" fill="var(--primary-light)" opacity="0.5"/><rect x="80" y="55" width="30" height="45" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M75 55 L95 40 L115 55" fill="var(--primary-light)" opacity="0.4"/><rect x="125" y="60" width="20" height="40" rx="1" fill="var(--primary)" opacity="0.4"/></svg>',
    dubai: '<svg viewBox="0 0 180 100" fill="none"><rect x="75" y="5" width="10" height="95" rx="1" fill="var(--primary)" opacity="0.8"/><path d="M78 5 L80 0 L82 5" fill="var(--primary-light)" opacity="0.9"/><rect x="20" y="40" width="18" height="60" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="45" y="25" width="15" height="75" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="95" y="30" width="20" height="70" rx="1" fill="var(--primary-light)" opacity="0.6"/><path d="M120 50 Q135 20 150 50" stroke="var(--primary)" stroke-width="2" fill="var(--primary)" opacity="0.4"/><rect x="120" y="50" width="30" height="50" rx="1" fill="var(--primary)" opacity="0.5"/></svg>',
    florence: '<svg viewBox="0 0 180 100" fill="none"><rect x="70" y="40" width="40" height="60" rx="1" fill="var(--primary)" opacity="0.5"/><ellipse cx="90" cy="40" rx="20" ry="18" fill="var(--primary-light)" opacity="0.4"/><rect x="87" y="20" width="6" height="20" fill="var(--primary)" opacity="0.6"/><rect x="20" y="55" width="22" height="45" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="28" y="45" width="6" height="10" fill="var(--primary-light)" opacity="0.6"/><rect x="130" y="50" width="20" height="50" rx="1" fill="var(--primary-light)" opacity="0.5"/></svg>',
    berlin: '<svg viewBox="0 0 180 100" fill="none"><rect x="60" y="40" width="60" height="60" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="65" y="40" width="10" height="60" fill="var(--primary-light)" opacity="0.3"/><rect x="75" y="40" width="10" height="60" fill="var(--primary)" opacity="0.3"/><rect x="85" y="40" width="10" height="60" fill="var(--primary-light)" opacity="0.3"/><rect x="95" y="40" width="10" height="60" fill="var(--primary)" opacity="0.3"/><rect x="105" y="40" width="10" height="60" fill="var(--primary-light)" opacity="0.3"/><rect x="20" y="30" width="15" height="70" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="140" y="35" width="18" height="65" rx="1" fill="var(--primary-light)" opacity="0.6"/></svg>',
    reykjavik: '<svg viewBox="0 0 180 100" fill="none"><rect x="70" y="20" width="10" height="80" rx="1" fill="var(--primary)" opacity="0.7"/><rect x="67" y="18" width="16" height="5" rx="1" fill="var(--primary-light)" opacity="0.6"/><rect x="30" y="55" width="25" height="45" rx="1" fill="var(--primary)" opacity="0.4"/><path d="M30 55 L42.5 42 L55 55" fill="var(--primary-light)" opacity="0.4"/><rect x="120" y="60" width="22" height="40" rx="1" fill="var(--primary-light)" opacity="0.5"/><path d="M120 60 L131 48 L142 60" fill="var(--primary)" opacity="0.4"/></svg>',
    rio: '<svg viewBox="0 0 180 100" fill="none"><path d="M60 30 Q90 0 120 30 Q130 45 120 60 L60 60 Q50 45 60 30" fill="var(--primary)" opacity="0.4"/><line x1="90" y1="20" x2="85" y2="5" stroke="var(--primary-light)" stroke-width="2"/><line x1="90" y1="20" x2="95" y2="5" stroke="var(--primary-light)" stroke-width="2"/><line x1="90" y1="20" x2="90" y2="3" stroke="var(--primary-light)" stroke-width="2"/><rect x="20" y="55" width="18" height="45" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="45" y="50" width="14" height="50" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="130" y="45" width="16" height="55" rx="1" fill="var(--primary-light)" opacity="0.6"/></svg>',
    oslo: '<svg viewBox="0 0 180 100" fill="none"><rect x="50" y="40" width="20" height="60" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M50 40 L60 28 L70 40" fill="var(--primary-light)" opacity="0.4"/><rect x="80" y="50" width="25" height="50" rx="1" fill="var(--primary-light)" opacity="0.4"/><rect x="115" y="55" width="18" height="45" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M115 55 L124 43 L133 55" fill="var(--primary-light)" opacity="0.4"/><rect x="25" y="60" width="16" height="40" rx="1" fill="var(--primary)" opacity="0.4"/></svg>',
    seoul: '<svg viewBox="0 0 180 100" fill="none"><rect x="10" y="30" width="16" height="70" rx="1" fill="var(--primary)" opacity="0.6"/><rect x="30" y="15" width="14" height="85" rx="1" fill="var(--primary-light)" opacity="0.5"/><rect x="48" y="25" width="18" height="75" rx="1" fill="var(--primary)" opacity="0.7"/><path d="M80 50 Q95 35 110 50" stroke="var(--primary-light)" stroke-width="2" fill="none" opacity="0.5"/><rect x="80" y="50" width="30" height="50" rx="1" fill="var(--primary)" opacity="0.5"/><rect x="120" y="20" width="15" height="80" rx="1" fill="var(--primary-light)" opacity="0.6"/><rect x="140" y="35" width="18" height="65" rx="1" fill="var(--primary)" opacity="0.5"/></svg>',
    amsterdam: '<svg viewBox="0 0 180 100" fill="none"><rect x="15" y="45" width="18" height="55" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M15 45 L24 32 L33 45" fill="var(--primary-light)" opacity="0.5"/><rect x="38" y="40" width="16" height="60" rx="1" fill="var(--primary-light)" opacity="0.5"/><path d="M38 40 L46 28 L54 40" fill="var(--primary)" opacity="0.5"/><rect x="59" y="42" width="18" height="58" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M59 42 L68 30 L77 42" fill="var(--primary-light)" opacity="0.5"/><rect x="82" y="38" width="16" height="62" rx="1" fill="var(--primary-light)" opacity="0.5"/><path d="M82 38 L90 25 L98 38" fill="var(--primary)" opacity="0.5"/><rect x="103" y="44" width="18" height="56" rx="1" fill="var(--primary)" opacity="0.5"/><path d="M103 44 L112 32 L121 44" fill="var(--primary-light)" opacity="0.5"/><rect x="126" y="40" width="16" height="60" rx="1" fill="var(--primary-light)" opacity="0.5"/><path d="M126 40 L134 28 L142 40" fill="var(--primary)" opacity="0.5"/></svg>',
  };

  function t(key, fallback) {
    return window.i18n ? window.i18n.t(key, fallback) : (fallback || key);
  }

  // Create city lights particle effect
  function createParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const light = document.createElement('div');
      light.className = 'city-light';
      light.style.left = (5 + Math.random() * 90) + '%';
      light.style.top = (10 + Math.random() * 80) + '%';
      light.style.animationDelay = (Math.random() * 5) + 's';
      light.style.animationDuration = (3 + Math.random() * 4) + 's';
      light.style.width = (2 + Math.random() * 3) + 'px';
      light.style.height = light.style.width;
      container.appendChild(light);
    }
  }

  // Update skyline buildings (light up as questions answered)
  function updateSkyline() {
    for (let i = 1; i <= currentQuestion; i++) {
      const building = document.querySelector(`.b${i}`);
      if (building) building.classList.add('lit');
    }
  }

  // Show a specific screen
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) screen.classList.add('active');
  }

  // Render current question
  function renderQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('question-container');
    const progressText = document.getElementById('progress-text');
    if (!container) return;

    progressText.textContent = `${currentQuestion + 1} / ${totalQuestions}`;
    updateSkyline();

    const qText = t(`questions.${q.key}.text`, `Question ${currentQuestion + 1}`);
    const options = [];
    for (let i = 0; i < 4; i++) {
      options.push({
        text: t(`questions.${q.key}.options.${i}.text`, `Option ${i + 1}`),
        icon: t(`questions.${q.key}.options.${i}.icon`, ''),
        axis: q.axis,
        side: i < 2 ? q.axis[0] : q.axis[1],
        weight: (i === 0 || i === 2) ? 2 : 1
      });
    }

    container.innerHTML = `
      <div class="question-number">${t('app.questionLabel', 'Question')} ${currentQuestion + 1}</div>
      <div class="question-text">${qText}</div>
      <div class="options">
        ${options.map((opt, idx) => `
          <button class="option-btn" data-idx="${idx}" data-side="${opt.side}" data-weight="${opt.weight}">
            <span class="option-icon">${opt.icon}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    container.classList.remove('question-card');
    void container.offsetWidth;
    container.classList.add('question-card');

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn));
    });
  }

  // Handle answer selection
  function handleAnswer(btn) {
    const side = btn.dataset.side;
    const weight = parseInt(btn.dataset.weight, 10);
    scores[side] += weight;

    btn.classList.add('selected');

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion >= totalQuestions) {
        showResult();
      } else {
        renderQuestion();
      }
    }, 300);
  }

  // Calculate MBTI type from scores
  function calculateMBTI() {
    const ei = scores.E >= scores.I ? 'E' : 'I';
    const sn = scores.S >= scores.N ? 'S' : 'N';
    const tf = scores.T >= scores.F ? 'T' : 'F';
    const jp = scores.J >= scores.P ? 'J' : 'P';
    return ei + sn + tf + jp;
  }

  // Show result
  function showResult() {
    showScreen('result-screen');
    updateSkyline();
    const mbti = calculateMBTI();
    const result = cityResults[mbti];
    const container = document.getElementById('result-container');
    if (!container || !result) return;

    const cityName = t(`results.${mbti}.name`, mbti);
    const cityTagline = t(`results.${mbti}.tagline`, '');
    const cityDesc = t(`results.${mbti}.description`, '');
    const traits = result.traits.map(tr => t(`traits.${tr}`, tr));
    const skylineSvg = citySkylines[result.city] || '';

    container.innerHTML = `
      <div class="result-city-skyline">${skylineSvg}</div>
      <div class="result-mbti">${mbti}</div>
      <div class="result-city-name">${cityName}</div>
      <div class="result-tagline">${cityTagline}</div>
      <p class="city-rarity" id="city-rarity"></p>
      <div class="card">
        <div class="result-description">${cityDesc}</div>
        <div class="result-traits">
          ${traits.map(tr => `<span class="trait-tag">${tr}</span>`).join('')}
        </div>
      </div>

      <div class="share-section">
        <h3 data-i18n="share.title">${t('share.title', 'Share Your Results')}</h3>
        <div class="share-buttons">
          <button class="share-btn kakao" id="share-kakao" aria-label="KakaoTalk">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.21 4.65 6.6l-1.18 4.33c-.1.37.33.66.65.44l5.19-3.42c.23.02.45.05.69.05 5.52 0 10-3.58 10-7.9S17.52 3 12 3z"/></svg>
            <span>KakaoTalk</span>
          </button>
          <button class="share-btn twitter" id="share-twitter" aria-label="X/Twitter">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>X</span>
          </button>
          <button class="share-btn facebook" id="share-facebook" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span>Facebook</span>
          </button>
          <button class="share-btn copy-link" id="share-copy" aria-label="Copy Link">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            <span>${t('share.copyLink', 'Copy Link')}</span>
          </button>
        </div>
      </div>

      <button id="retry-btn" class="btn btn-secondary">${t('app.retryBtn', 'Try Again')}</button>
    `;

    bindShareButtons(mbti, cityName);

    // City rarity percentage
    const rarityEl = document.getElementById('city-rarity');
    if (rarityEl) {
      const rarities = { INFP: 4.4, ENFP: 8.1, INTJ: 2.1, ENTJ: 1.8, INFJ: 1.5, ENFJ: 2.5, INTP: 3.3, ENTP: 3.2, ISFP: 8.8, ESFP: 8.5, ISTJ: 11.6, ESTJ: 8.7, ISFJ: 13.8, ESFJ: 12.3, ISTP: 5.4, ESTP: 4.3 };
      const pct = rarities[mbti] || 5;
      rarityEl.innerHTML = `🌍 <strong>${pct}%</strong> ${t('result.rarityText', 'of travelers share your city')}`;
    }

    // Show related tests section
    const relatedTests = document.getElementById('related-tests');
    if (relatedTests) {
      relatedTests.style.display = '';
      if (window.i18n) window.i18n.translateDOM(relatedTests);
    }

    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', resetQuiz);
    }

    if (typeof gtag === 'function') {
      gtag('event', 'quiz_complete', {
        event_category: 'mbti_city',
        event_label: mbti,
        value: 1
      });
    }
  }

  // Share functionality
  function bindShareButtons(mbti, cityName) {
    const shareText = t('share.text', 'My MBTI city is {city} ({mbti})!')
      .replace('{city}', cityName)
      .replace('{mbti}', mbti);
    const shareUrl = 'https://dopabrain.com/mbti-city/';
    const fullText = shareText + ' ' + t('share.cta', 'Find yours!');

    const kakaoBtn = document.getElementById('share-kakao');
    const twitterBtn = document.getElementById('share-twitter');
    const facebookBtn = document.getElementById('share-facebook');
    const copyBtn = document.getElementById('share-copy');

    if (kakaoBtn) {
      kakaoBtn.addEventListener('click', () => {
        const url = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(fullText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      });
    }
    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      });
    }
    if (facebookBtn) {
      facebookBtn.addEventListener('click', () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(fullText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
          const span = copyBtn.querySelector('span');
          if (span) {
            const orig = span.textContent;
            span.textContent = t('share.copied', 'Copied!');
            setTimeout(() => { span.textContent = orig; }, 2000);
          }
        }).catch(() => {});
      });
    }
  }

  // Reset quiz
  function resetQuiz() {
    currentQuestion = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);
    // Reset skyline
    document.querySelectorAll('.building').forEach(b => b.classList.remove('lit'));
    showScreen('start-screen');
  }

  // Hide app loader
  function hideLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => { loader.style.display = 'none'; }, 400);
    }
  }

  // Init
  function init() {
    createParticles();

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        showScreen('question-screen');
        renderQuestion();
      });
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect && window.i18n) {
      langSelect.value = window.i18n.currentLang || 'ko';
      langSelect.addEventListener('change', (e) => {
        if (window.i18n) {
          window.i18n.switchLang(e.target.value);
          if (currentQuestion > 0 && currentQuestion < totalQuestions) {
            renderQuestion();
          }
        }
      });
    }

    // Wait for i18n to be ready before hiding loader
    const startTime = Date.now();
    const waitForI18n = setInterval(() => {
      if ((window.i18n && window.i18n.initialized) || Date.now() - startTime > 2000) {
        clearInterval(waitForI18n);
        hideLoader();
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }
})();
