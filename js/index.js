// 캐러슬 배너 관련 변수 선언
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const currentLabel = document.getElementById('carouselCurrent');

const total = dots.length; // 슬라이드 총 개수
let current = 0; // 현재 슬라이드 인덱스 (0부터 시작)
let autoTimer; // 자동 슬라이드 타이머 ID

// 지정 인덱스의 슬라이드로 이동하고 닷과 카운터 업데이트
function goTo(index) {
  current = (index + total) % total; // 나머지 연산으로 순환 처리 (음수 인덱스 대응)
  track.style.transform = `translateX(-${current * 100}%)`; // CSS transform으로 슬라이드 가로 이동
  dots.forEach((d, i) => d.classList.toggle('active', i === current)); // 현재 슬라이드 닷 활성화
  currentLabel.textContent = current + 1; // 카운터 텍스트 업데이트 (표시는 1부터 시작)
}

// 4초 간격으로 다음 슬라이드로 자동 전환
function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}

// 타이머 초기화 후 재시작 (수동 조작 후 자동 슬라이드 재개)
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); }); // 이전 버튼 이벤트 리스너
nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); }); // 다음 버튼 이벤트 리스너

// 인디케이터 닷 클릭 시 해당 슬라이드로 이동
dots.forEach(dot => {
  dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); resetAuto(); });
});

// 터치 스와이프 지원
let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }); // 터치 시작 X 좌표 저장
track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  // 이동 거리가 50px 이상일 때만 슬라이드 전환 (오차 방지)
});

startAuto(); // 페이지 로드 시 자동 슬라이드 시작

// 카테고리 필터 관련 변수 선언
const filterTabs = document.querySelectorAll('.filter-tab');
const filterCards = document.querySelectorAll('.filter-card');

// 탭 클릭 시 해당 카테고리 카드만 표시
filterTabs.forEach(tab => {
  tab.addEventListener('click', function () {
    filterTabs.forEach(t => t.classList.remove('active')); // 기존 활성 탭 초기화
    this.classList.add('active'); // 클릭한 탭 활성화

    const filter = this.dataset.filter;
    filterCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match); // 카테고리 불일치 카드에 hidden 클래스 적용
    });
  });
});
