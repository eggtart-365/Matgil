// reCAPTCHA 시뮬레이션: 체크박스 클릭 시 로딩 후 인증 완료 처리
function handleCaptcha() {
  const box = document.getElementById('captcha-checkbox');
  if (box.classList.contains('verified') || box.classList.contains('loading')) return;
  // 이미 인증 완료 또는 로딩 중이면 중복 실행 방지

  box.classList.add('loading'); // 로딩 상태로 전환 (스피너 표시)

  setTimeout(function () {
    box.classList.remove('loading');
    box.classList.add('verified'); // 인증 완료 상태로 전환 (체크 아이콘 표시)
    clearFieldError('captcha');
  }, 1400); // 1.4초 후 인증 완료 처리
}

// 로그인 폼 validation 관련 변수 선언
const loginForm = document.getElementById('login-form');
const idInput = document.getElementById('input-id');
const passwordInput = document.getElementById('input-password');
const captchaBox = document.getElementById('captcha-box');

const ID_PATTERN = /^[a-zA-Z0-9_]{4,20}$/; // 영문, 숫자, 밑줄 4~20자

// 필드 에러 메시지 표시
function showFieldError(fieldKey, message) {
  const errorEl = document.getElementById(`${fieldKey}-error`);
  if (errorEl) errorEl.textContent = message;

  if (fieldKey === 'captcha') {
    captchaBox.classList.add('invalid');
    return;
  }

  const input = fieldKey === 'input-id' ? idInput : passwordInput;
  input.classList.add('invalid');
}

// 필드 에러 메시지 제거
function clearFieldError(fieldKey) {
  const errorEl = document.getElementById(`${fieldKey}-error`);
  if (errorEl) errorEl.textContent = '';

  if (fieldKey === 'captcha') {
    captchaBox.classList.remove('invalid');
    return;
  }

  const input = fieldKey === 'input-id' ? idInput : passwordInput;
  input.classList.remove('invalid');
}

// 아이디 유효성 검사
function validateId() {
  const value = idInput.value.trim();

  if (!value) {
    showFieldError('input-id', '아이디를 입력해주세요.');
    return false;
  }
  if (!ID_PATTERN.test(value)) {
    showFieldError('input-id', '아이디는 4~20자의 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.');
    return false;
  }

  clearFieldError('input-id');
  return true;
}

// 비밀번호 유효성 검사
function validatePassword() {
  const value = passwordInput.value;

  if (!value) {
    showFieldError('input-password', '비밀번호를 입력해주세요.');
    return false;
  }
  if (value.length < 8 || value.length > 20) {
    showFieldError('input-password', '비밀번호는 8~20자로 입력해주세요.');
    return false;
  }

  clearFieldError('input-password');
  return true;
}

// reCAPTCHA 인증 여부 검사
function validateCaptcha() {
  const verified = document.getElementById('captcha-checkbox').classList.contains('verified');

  if (!verified) {
    showFieldError('captcha', '로봇이 아님을 확인해주세요.');
    return false;
  }

  clearFieldError('captcha');
  return true;
}

// 입력 중 에러 상태 초기화
idInput.addEventListener('input', () => clearFieldError('input-id'));
passwordInput.addEventListener('input', () => clearFieldError('input-password'));

// 포커스 아웃 시 개별 필드 검사
idInput.addEventListener('blur', validateId);
passwordInput.addEventListener('blur', validatePassword);

// validation 실패 시 최상단으로 스크롤하고 안내 alert 표시
function handleValidationFailure(message) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  alert(message);
}

// 폼 제출 시 전체 validation 수행
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const isValid = validateId() && validatePassword() && validateCaptcha();
  if (!isValid) {
    handleValidationFailure('입력 정보를 확인해주세요.');
    return;
  }

  alert('로그인에 성공했습니다.');
});
