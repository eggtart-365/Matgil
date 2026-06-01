// JavaScript는 개인적인 욕심으로 구현해봤습니다.

// 이메일 도메인 드롭다운 관련 변수 및 함수 선언
const selectBtn = document.getElementById('email-service-select-button');
const arrowBtn = document.getElementById('email-service-direct-input-button');
const dropdown = document.getElementById('email-service-dropdown');
const domainField = document.getElementById('email-domain-field');

// 회원가입 폼 validation 관련 변수 선언
const signupForm = document.getElementById('signup-form');
const idInput = document.getElementById('signup-id');
const passwordInput = document.getElementById('signup-password');
const passwordConfirmInput = document.getElementById('signup-password-confirm');
const nameInput = document.getElementById('signup-name');
const emailLocalInput = document.getElementById('email-input-field');
const emailInputWrap = document.getElementById('email-input');
const phoneInput = document.getElementById('signup-phone');
const verifyButton = document.getElementById('verify-button');
const addressValueInput = document.getElementById('address-value');
const addressSearchButton = document.getElementById('address-search-button');
const addressSelectedText = document.getElementById('address-selected-text');
const birthdayYearInput = document.getElementById('birthday-year');
const birthdayMonthInput = document.getElementById('birthday-month');
const birthdayDayInput = document.getElementById('birthday-day');
const birthdayContainer = document.getElementById('birthday-container');
const recommendRadio = document.querySelector('input[name="additional"][value="recommend"]');
const recommendIdInput = document.getElementById('signup-recommend-id');

const ID_PATTERN = /^[a-zA-Z0-9_]{4,20}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,20}$/;
const NAME_PATTERN = /^[가-힣a-zA-Z]{2,10}$/;
const EMAIL_LOCAL_PATTERN = /^[a-zA-Z0-9._-]+$/;
const EMAIL_DOMAIN_PATTERN = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_PATTERN = /^01[016789]\d{7,8}$/;

// 필수 약관 체크박스 (필수 표시가 있는 항목만 선택)
const requiredAgreementCheckboxes = Array.from(
  document.querySelectorAll('.agreement-item')
).filter(item => {
  const requiredLabel = item.querySelector('.agreement-item-content-required');
  return requiredLabel && requiredLabel.textContent.includes('필수');
}).map(item => item.querySelector('.checkbox-input'));

// 이메일 도메인 드롭다운 열기
function toggleDropdown() {
  dropdown.classList.toggle('open');
}

// 이메일 도메인 드롭다운 닫기
function closeDropdown() {
  dropdown.classList.remove('open');
}

// 이메일 도메인 드롭다운 열기 및 닫기 이벤트 리스너
selectBtn.addEventListener('click', toggleDropdown);
arrowBtn.addEventListener('click', toggleDropdown);

// 이메일 도메인 드롭다운 내 아이템 클릭 이벤트 리스너
dropdown.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', function () {
    const value = this.dataset.value;
    if (value === 'direct') {
      selectBtn.style.display = 'none';
      domainField.style.display = 'block';
      domainField.focus();
    } else {
      selectBtn.style.display = '';
      domainField.style.display = 'none';
      selectBtn.textContent = value;
      selectBtn.style.color = '#333';
    }
    closeDropdown();
    clearFieldError('signup-email');
  });
});

// 이메일 도메인 드롭다운 외부 영역 클릭 시 닫기
document.addEventListener('click', function (e) {
  if (!document.getElementById('email-service-container').contains(e.target)) {
    closeDropdown();
  }
});

// 이용약관 동의 관련 변수 및 함수 선언
const mainCheckbox = document.getElementById('agreement-item-main-checkbox');
const subCheckboxes = Array.from(
  document.querySelectorAll('#agreement-content .checkbox-input:not(#agreement-item-main-checkbox)')
);

// 전체 동의 체크박스 클릭 시 하위 체크박스 모두 체크되도록 구현
mainCheckbox.addEventListener('change', function () {
  subCheckboxes.forEach(cb => cb.checked = this.checked);
  clearFieldError('signup-agreement');
});

// 하위 체크박스 클릭 시 전체 동의 체크박스 체크 여부 업데이트 (모두 동의하지 않을 시 취소되도록)
subCheckboxes.forEach(cb => {
  cb.addEventListener('change', function () {
    mainCheckbox.checked = subCheckboxes.every(cb => cb.checked);
    clearFieldError('signup-agreement');
  });
});

// 추가입력 사항 관련 변수 및 함수 선언
const additionalOptionRows = document.querySelectorAll('.additional-option-row');

// 추가입력 사항 라디오 버튼 클릭 시 해당 옵션 행이 표시되도록 구현
recommendRadio.addEventListener('change', function () {
  additionalOptionRows.forEach(row => {
    row.style.display = this.checked ? 'inline-flex' : 'none';
  });
  if (!this.checked) clearFieldError('signup-recommend-id');
});

// 필드 에러 메시지 표시
function showFieldError(fieldKey, message) {
  const errorEl = document.getElementById(`${fieldKey}-error`);
  if (errorEl) errorEl.textContent = message;

  const invalidTargets = {
    'signup-id': idInput,
    'signup-password': passwordInput,
    'signup-password-confirm': passwordConfirmInput,
    'signup-name': nameInput,
    'signup-email': emailInputWrap,
    'signup-phone': phoneInput,
    'signup-address': addressSearchButton,
    'signup-birthday': birthdayContainer,
    'signup-recommend-id': recommendIdInput,
  };

  invalidTargets[fieldKey]?.classList.add('invalid');
}

// 필드 에러 메시지 제거
function clearFieldError(fieldKey) {
  const errorEl = document.getElementById(`${fieldKey}-error`);
  if (errorEl) errorEl.textContent = '';

  const invalidTargets = {
    'signup-id': idInput,
    'signup-password': passwordInput,
    'signup-password-confirm': passwordConfirmInput,
    'signup-name': nameInput,
    'signup-email': emailInputWrap,
    'signup-phone': phoneInput,
    'signup-address': addressSearchButton,
    'signup-birthday': birthdayContainer,
    'signup-recommend-id': recommendIdInput,
  };

  invalidTargets[fieldKey]?.classList.remove('invalid');
}

// 선택된 이메일 도메인 값 반환
function getEmailDomain() {
  if (domainField.style.display === 'block') {
    return domainField.value.trim();
  }
  if (selectBtn.textContent === '선택하기') return '';
  return selectBtn.textContent.trim();
}

// 아이디 유효성 검사
function validateId() {
  const value = idInput.value.trim();

  if (!value) {
    showFieldError('signup-id', '아이디를 입력해주세요.');
    return false;
  }
  if (!ID_PATTERN.test(value)) {
    showFieldError('signup-id', '아이디는 4~20자의 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.');
    return false;
  }

  clearFieldError('signup-id');
  return true;
}

// 비밀번호 유효성 검사
function validatePassword() {
  const value = passwordInput.value;

  if (!value) {
    showFieldError('signup-password', '비밀번호를 입력해주세요.');
    return false;
  }
  if (!PASSWORD_PATTERN.test(value)) {
    showFieldError('signup-password', '비밀번호는 8~20자이며 영문과 숫자를 모두 포함해야 합니다.');
    return false;
  }

  clearFieldError('signup-password');
  return true;
}

// 비밀번호 확인 유효성 검사
function validatePasswordConfirm() {
  const value = passwordConfirmInput.value;

  if (!value) {
    showFieldError('signup-password-confirm', '비밀번호 확인을 입력해주세요.');
    return false;
  }
  if (value !== passwordInput.value) {
    showFieldError('signup-password-confirm', '비밀번호가 일치하지 않습니다.');
    return false;
  }

  clearFieldError('signup-password-confirm');
  return true;
}

// 이름 유효성 검사
function validateName() {
  const value = nameInput.value.trim();

  if (!value) {
    showFieldError('signup-name', '이름을 입력해주세요.');
    return false;
  }
  if (!NAME_PATTERN.test(value)) {
    showFieldError('signup-name', '이름은 2~10자의 한글 또는 영문만 입력할 수 있습니다.');
    return false;
  }

  clearFieldError('signup-name');
  return true;
}

// 이메일 유효성 검사
function validateEmail() {
  const localPart = emailLocalInput.value.trim();
  const domainPart = getEmailDomain();

  if (!localPart) {
    showFieldError('signup-email', '이메일 아이디를 입력해주세요.');
    return false;
  }
  if (!EMAIL_LOCAL_PATTERN.test(localPart)) {
    showFieldError('signup-email', '이메일 아이디는 영문, 숫자, ., _, - 만 사용할 수 있습니다.');
    return false;
  }
  if (!domainPart) {
    showFieldError('signup-email', '이메일 도메인을 선택하거나 입력해주세요.');
    return false;
  }
  if (!EMAIL_DOMAIN_PATTERN.test(domainPart)) {
    showFieldError('signup-email', '올바른 이메일 도메인 형식이 아닙니다.');
    return false;
  }

  clearFieldError('signup-email');
  return true;
}

// 휴대폰 번호 유효성 검사
function validatePhone() {
  const value = phoneInput.value.replace(/\D/g, '');

  if (!value) {
    showFieldError('signup-phone', '휴대폰 번호를 입력해주세요.');
    return false;
  }
  if (!PHONE_PATTERN.test(value)) {
    showFieldError('signup-phone', '휴대폰 번호는 10~11자리 숫자로 입력해주세요.');
    return false;
  }

  clearFieldError('signup-phone');
  return true;
}

// 주소 유효성 검사
function validateAddress() {
  if (!addressValueInput.value.trim()) {
    showFieldError('signup-address', '주소 검색을 통해 배송지를 입력해주세요.');
    return false;
  }

  clearFieldError('signup-address');
  return true;
}

// 생년월일 유효성 검사 (선택 입력, 일부만 입력 시 오류)
function validateBirthday() {
  const year = birthdayYearInput.value.trim();
  const month = birthdayMonthInput.value.trim();
  const day = birthdayDayInput.value.trim();

  if (!year && !month && !day) {
    clearFieldError('signup-birthday');
    return true;
  }

  if (!year || !month || !day) {
    showFieldError('signup-birthday', '생년월일은 연, 월, 일을 모두 입력해주세요.');
    return false;
  }

  const yearNum = Number(year);
  const monthNum = Number(month);
  const dayNum = Number(day);
  const date = new Date(yearNum, monthNum - 1, dayNum);
  const today = new Date();

  if (
    !/^\d{4}$/.test(year) ||
    !/^\d{1,2}$/.test(month) ||
    !/^\d{1,2}$/.test(day) ||
    date.getFullYear() !== yearNum ||
    date.getMonth() !== monthNum - 1 ||
    date.getDate() !== dayNum ||
    date > today
  ) {
    showFieldError('signup-birthday', '올바른 생년월일을 입력해주세요.');
    return false;
  }

  clearFieldError('signup-birthday');
  return true;
}

// 추천인 아이디 유효성 검사 (선택 입력)
function validateRecommendId() {
  if (!recommendRadio.checked) {
    clearFieldError('signup-recommend-id');
    return true;
  }

  const value = recommendIdInput.value.trim();

  if (!value) {
    showFieldError('signup-recommend-id', '추천인 아이디를 입력해주세요.');
    return false;
  }
  if (!ID_PATTERN.test(value)) {
    showFieldError('signup-recommend-id', '추천인 아이디는 4~20자의 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.');
    return false;
  }

  clearFieldError('signup-recommend-id');
  return true;
}

// 필수 약관 동의 유효성 검사
function validateAgreements() {
  const unchecked = requiredAgreementCheckboxes.filter(cb => !cb.checked);

  if (unchecked.length > 0) {
    document.getElementById('signup-agreement-error').textContent =
      '필수 이용약관에 모두 동의해주세요.';
    return false;
  }

  clearFieldError('signup-agreement');
  return true;
}

// 휴대폰 번호 입력 시 숫자만 허용하고 인증 버튼 활성화
phoneInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
  verifyButton.disabled = !PHONE_PATTERN.test(this.value);
  clearFieldError('signup-phone');
});

// 주소 검색 버튼 클릭 시 샘플 주소 입력 (UI 시뮬레이션)
addressSearchButton.addEventListener('click', function () {
  const sampleAddress = '서울특별시 강남구 테헤란로 123';
  addressValueInput.value = sampleAddress;
  addressSelectedText.textContent = sampleAddress;
  clearFieldError('signup-address');
});

// 입력 중 에러 상태 초기화
idInput.addEventListener('input', () => clearFieldError('signup-id'));
passwordInput.addEventListener('input', () => {
  clearFieldError('signup-password');
  if (passwordConfirmInput.value) validatePasswordConfirm();
});
passwordConfirmInput.addEventListener('input', () => clearFieldError('signup-password-confirm'));
nameInput.addEventListener('input', () => clearFieldError('signup-name'));
emailLocalInput.addEventListener('input', () => clearFieldError('signup-email'));
domainField.addEventListener('input', () => clearFieldError('signup-email'));
[birthdayYearInput, birthdayMonthInput, birthdayDayInput].forEach(input => {
  input.addEventListener('input', () => clearFieldError('signup-birthday'));
});
recommendIdInput.addEventListener('input', () => clearFieldError('signup-recommend-id'));

// 포커스 아웃 시 개별 필드 검사
idInput.addEventListener('blur', validateId);
passwordInput.addEventListener('blur', validatePassword);
passwordConfirmInput.addEventListener('blur', validatePasswordConfirm);
nameInput.addEventListener('blur', validateName);
emailLocalInput.addEventListener('blur', validateEmail);
domainField.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
[birthdayYearInput, birthdayMonthInput, birthdayDayInput].forEach(input => {
  input.addEventListener('blur', validateBirthday);
});
recommendIdInput.addEventListener('blur', validateRecommendId);

// validation 실패 시 최상단으로 스크롤하고 안내 alert 표시
function handleValidationFailure(message) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  alert(message);
}

// 폼 제출 시 전체 validation 수행
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const isValid =
    validateId() &&
    validatePassword() &&
    validatePasswordConfirm() &&
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAddress() &&
    validateBirthday() &&
    validateRecommendId() &&
    validateAgreements();

  if (!isValid) {
    handleValidationFailure('입력 정보를 확인해주세요.');
    return;
  }

  alert('회원가입이 완료되었습니다.');
  window.location.href = 'index.html';
});
