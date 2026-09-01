// MBTI City Test - Main Application
(function() {
  'use strict';

  // MBTI axis scores: E/I, S/N, T/F, J/P
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  let currentQuestion = 0;
  const totalQuestions = 8;
  const mbtiCityStages = new Set();
  const boundaryCopy = {
    ko:['재미로 보는 매칭이며 진단이 아닙니다','이 독립 콘텐츠는 공식 MBTI 검사가 아니며 거주지를 결정할 수 없습니다. 여기서 고른 8개 답만 도시 이야기로 바꿉니다.','규칙: E/I, S/N, T/F, J/P 축마다 2문항을 점수화합니다. 높은 쪽으로 네 글자를 만들며 동점은 E, S, T, J 순입니다.','결과의 범위','이 도시는 답변을 위한 창작 라벨이며 심리·이주·여행 조언이 아닙니다.'],
    en:['Playful match, not a diagnosis','This independent activity is not an official MBTI assessment and cannot determine where you should live. It maps only the eight choices you make here.','Rule: two questions score each E/I, S/N, T/F and J/P axis. The higher side forms the four-letter result; ties use E, S, T and J.','Keep the result in context','This city is a creative label for your answers, not psychological, relocation or travel advice.'],
    zh:['趣味匹配，不是心理诊断','这是独立制作的娱乐内容，并非官方MBTI测评，也不能决定你该住在哪里。它只把本次8个选择转换成城市故事。','规则：E/I、S/N、T/F、J/P每个维度各有2题。分数较高的一侧组成四字母结果；平分时依次采用E、S、T、J。','正确理解结果','城市只是对本次答案的创意标签，不是心理、移居或旅行建议。'],
    ja:['遊びのマッチであり診断ではありません','これは独立した娯楽コンテンツで、公式MBTI診断ではなく、住む場所も決められません。今回の8つの選択だけを都市物語に変換します。','ルール：E/I、S/N、T/F、J/Pの各軸を2問で採点。高い側で4文字を作り、同点はE、S、T、Jを使います。','結果の範囲','都市は今回の回答につけた創作ラベルで、心理・移住・旅行の助言ではありません。'],
    es:['Una coincidencia lúdica, no un diagnóstico','Esta actividad independiente no es una evaluación MBTI oficial ni puede decidir dónde vivir. Solo convierte tus ocho elecciones en una historia urbana.','Regla: dos preguntas puntúan cada eje E/I, S/N, T/F y J/P. Gana el lado mayor; los empates usan E, S, T y J.','Pon el resultado en contexto','La ciudad es una etiqueta creativa para tus respuestas, no un consejo psicológico, de mudanza o de viaje.'],
    pt:['Uma combinação lúdica, não um diagnóstico','Esta atividade independente não é uma avaliação MBTI oficial e não decide onde você deve morar. Ela transforma apenas suas oito escolhas em uma história de cidade.','Regra: duas perguntas pontuam cada eixo E/I, S/N, T/F e J/P. O lado maior forma o resultado; empates usam E, S, T e J.','Mantenha o resultado em contexto','A cidade é um rótulo criativo para suas respostas, não orientação psicológica, de mudança ou viagem.'],
    de:['Spielerische Zuordnung, keine Diagnose','Diese unabhängige Aktivität ist kein offizieller MBTI-Test und bestimmt nicht, wo du leben solltest. Sie ordnet nur deine acht Antworten einer Stadtgeschichte zu.','Regel: Je zwei Fragen bewerten E/I, S/N, T/F und J/P. Die höhere Seite bildet das Ergebnis; Gleichstände nutzen E, S, T und J.','Ergebnis richtig einordnen','Die Stadt ist ein kreatives Etikett für deine Antworten, keine psychologische, Umzugs- oder Reiseberatung.'],
    fr:['Une association ludique, pas un diagnostic','Cette activité indépendante n’est pas un test MBTI officiel et ne peut pas décider où vivre. Elle transforme seulement vos huit choix en récit urbain.','Règle : deux questions notent chaque axe E/I, S/N, T/F et J/P. Le côté le plus élevé gagne ; les égalités utilisent E, S, T et J.','Gardez le résultat en contexte','La ville est une étiquette créative pour vos réponses, pas un conseil psychologique, de déménagement ou de voyage.'],
    id:['Pencocokan untuk hiburan, bukan diagnosis','Aktivitas independen ini bukan tes MBTI resmi dan tidak menentukan tempat tinggalmu. Aktivitas ini hanya mengubah delapan pilihanmu menjadi cerita kota.','Aturan: dua pertanyaan menilai tiap sumbu E/I, S/N, T/F, dan J/P. Sisi tertinggi membentuk hasil; seri memakai E, S, T, dan J.','Pahami batas hasil','Kota ini hanya label kreatif untuk jawabanmu, bukan saran psikologis, pindah tempat, atau perjalanan.'],
    tr:['Eğlencelik eşleşme, tanı değil','Bu bağımsız etkinlik resmi bir MBTI değerlendirmesi değildir ve nerede yaşayacağınıza karar veremez. Yalnızca sekiz seçiminizi bir şehir hikâyesine dönüştürür.','Kural: E/I, S/N, T/F ve J/P eksenlerinin her biri iki soruyla puanlanır. Yüksek taraf sonucu oluşturur; eşitlikte E, S, T ve J kullanılır.','Sonucu bağlamında tutun','Şehir, yanıtlarınız için yaratıcı bir etikettir; psikolojik, taşınma veya seyahat tavsiyesi değildir.'],
    hi:['मनोरंजन के लिए मिलान, निदान नहीं','यह स्वतंत्र गतिविधि आधिकारिक MBTI आकलन नहीं है और यह तय नहीं कर सकती कि आपको कहाँ रहना चाहिए। यह केवल आपके आठ विकल्पों को एक शहर की कहानी में बदलती है।','नियम: E/I, S/N, T/F और J/P के हर अक्ष पर दो प्रश्न अंक देते हैं। ऊँचा पक्ष परिणाम बनाता है; बराबरी में E, S, T और J चुने जाते हैं।','परिणाम की सीमा समझें','यह शहर आपके उत्तरों का रचनात्मक लेबल है, मनोवैज्ञानिक, स्थानांतरण या यात्रा सलाह नहीं।'],
    ru:['Игровое совпадение, а не диагноз','Это независимое развлечение не является официальным тестом MBTI и не определяет, где вам жить. Оно превращает только восемь ваших ответов в историю города.','Правило: по два вопроса оценивают оси E/I, S/N, T/F и J/P. Побеждает большая сумма; при равенстве используются E, S, T и J.','Учитывайте границы результата','Город — творческая метка ваших ответов, а не психологический совет или рекомендация по переезду и путешествиям.']
  };

  function trackMbtiCity(name, detail = {}) {
    if (mbtiCityStages.has(name)) return;
    mbtiCityStages.add(name);
    if (typeof gtag === 'function') gtag('event', name, { event_category: 'mbti_city_match', app_language: window.i18n?.currentLang || 'ko', ...detail });
  }

  function applyBoundaryCopy() {
    const copy = boundaryCopy[window.i18n?.currentLang] || boundaryCopy.en;
    const boundary = document.getElementById('truth-boundary');
    if (boundary) { boundary.querySelector('strong').textContent = copy[0]; boundary.querySelector('p').textContent = copy[1]; }
    const rule = document.getElementById('score-rule'); if (rule) rule.textContent = copy[2];
    const title = document.getElementById('result-boundary-title'); if (title) title.textContent = copy[3];
    const result = document.getElementById('result-boundary-copy'); if (result) result.textContent = copy[4];
  }

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
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = `${((currentQuestion + 1) / totalQuestions) * 100}%`;
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

    const encouragement = currentQuestion === 4
      ? `<div class="mid-quiz-encouragement">${t('app.encouragement', 'Halfway there! 4 more to go!')}</div>`
      : '';

    container.innerHTML = `
      ${encouragement}
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
  function showResult(isCompletion = true) {
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

      <button id="retry-btn" class="btn secondary">${t('app.retryBtn', 'Try Again')}</button>
    `;

    bindShareButtons(mbti, cityName);

    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', resetQuiz);
    }

    if (isCompletion) {
      trackMbtiCity('mbti_city_complete');
      if (typeof GameAds !== 'undefined') GameAds.showInterstitial({ onComplete: () => {} });
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
        trackMbtiCity('mbti_city_share');
      });
    }
    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
        trackMbtiCity('mbti_city_share');
      });
    }
    if (facebookBtn) {
      facebookBtn.addEventListener('click', () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(fullText)}`;
        window.open(url, '_blank', 'width=600,height=400');
        trackMbtiCity('mbti_city_share');
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
          trackMbtiCity('mbti_city_share');
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
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        showScreen('question-screen');
        renderQuestion();
        trackMbtiCity('mbti_city_start');
      });
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect && window.i18n) {
      langSelect.value = window.i18n.currentLang || 'ko';
      langSelect.addEventListener('change', async (e) => {
        if (window.i18n) {
          await window.i18n.switchLang(e.target.value);
          applyBoundaryCopy();
          if (currentQuestion > 0 && currentQuestion < totalQuestions) {
            renderQuestion();
          }
          if (document.getElementById('result-screen').classList.contains('active')) showResult(false);
        }
      });
    }

    document.querySelectorAll('[data-target-slug]').forEach(link => link.addEventListener('click', () => trackMbtiCity('mbti_city_related_click', { target_slug: link.dataset.targetSlug })));

    // Wait for i18n to be ready before hiding loader
    const startTime = Date.now();
    const waitForI18n = setInterval(() => {
      if ((window.i18n && window.i18n.initialized) || Date.now() - startTime > 2000) {
        clearInterval(waitForI18n);
        if (langSelect) langSelect.value = window.i18n?.currentLang || 'ko';
        applyBoundaryCopy();
        hideLoader();
        trackMbtiCity('mbti_city_view');
        if (typeof GameAds !== 'undefined') GameAds.init();
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/mbti-city/sw.js', { scope: '/mbti-city/' }).catch(() => {});
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
