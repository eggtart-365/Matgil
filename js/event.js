const eventFilters = document.querySelectorAll('.event-filter');
const eventCards = document.querySelectorAll('.event-card');

// 이벤트 종료 날짜 계산
function endOfLocalDay(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, m - 1, d, 23, 59, 59, 999);
}

// 이벤트 카드 종료 표시
function markCardEnded(card) {
  if (card.dataset.status === 'ended') return;

  card.dataset.status = 'ended';

  const badge = card.querySelector('.event-card-badge');
  if (badge) {
    badge.textContent = '종료';
    badge.classList.remove('badge-ongoing');
    badge.classList.add('badge-ended');
  }

  const link = card.querySelector('a.event-card-btn');
  if (link) {
    const endedBtn = document.createElement('span');
    endedBtn.className = 'event-card-btn event-card-btn-disabled';
    endedBtn.textContent = '종료됨';
    link.replaceWith(endedBtn);
  }
}

// 이벤트 카드 상태 동기화
function syncEventStatusFromDates() {
  const now = new Date();

  eventCards.forEach((card) => {
    const end = card.dataset.end;
    if (!end) return;

    if (now > endOfLocalDay(end)) {
      markCardEnded(card);
    }
  });
}

// 이벤트 필터 적용
function applyEventFilter(filter) {
  eventCards.forEach((card) => {
    const status = card.dataset.status;
    const show = filter === 'all' || filter === status;
    card.classList.toggle('hidden', !show);
  });
}

// 이벤트 상태 동기화 및 필터 적용
syncEventStatusFromDates();

eventFilters.forEach((tab) => {
  tab.addEventListener('click', function () {
    eventFilters.forEach((t) => t.classList.remove('active'));
    this.classList.add('active');
    applyEventFilter(this.dataset.filter);
  });
});
