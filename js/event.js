const eventFilters = document.querySelectorAll('.event-filter');
const eventCards = document.querySelectorAll('.event-card');

// 필터링 기능 (메인 페이지 코드 참고)
eventFilters.forEach((tab) => {
  tab.addEventListener('click', function () {
    eventFilters.forEach((t) => t.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;
    eventCards.forEach((card) => {
      const status = card.dataset.status;
      const show =
        filter === 'all' || filter === status;
      card.classList.toggle('hidden', !show);
    });
  });
});
