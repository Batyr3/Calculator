// Секцияларды таңдау
const calculatorSection = document.querySelector('.calculator-container');
const converterSection = document.querySelector('.converter-container');
const investmentSection = document.querySelector('.investment-container');
const weightSection = document.querySelector('.weight-container');
const ageSection = document.querySelector('.age-calculator-container') 
const toggleBtns = document.querySelectorAll('.toggle-btn');

// Жалпы функция: секцияларды көрсету/жасыру
function showSection(section) {
  // Барлық секцияларды жасыру
  calculatorSection.style.display = 'none';
  converterSection.style.display = 'none';
  investmentSection.style.display = 'none';
  weightSection.style.display = 'none';
  ageSection.style.display = 'none';

  // Белсенді секцияны көрсету
  section.style.display = 'block';
}

// Батырмаларды басқанда секцияларды ауыстыру
toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Барлық батырмалардан 'active' классын алып тастау
    toggleBtns.forEach((b) => b.classList.remove('active'));
    // Белсенді батырмаға 'active' классын қосу
    btn.classList.add('active');

    // Батырма мәтініне байланысты секцияны көрсету
    if (btn.textContent.trim() === 'Calculator') {
      showSection(calculatorSection);
    } else if (btn.textContent.trim() === 'Temperature') {
      showSection(converterSection);
    } else if (btn.textContent.trim() === 'Investment Calculator') {
      showSection(investmentSection);
    } else if (btn.textContent.trim() === 'Weight Calculator') {
      showSection(weightSection);
    } else if (btn.textContent.trim() === 'Age Calculator') {
      showSection(ageSection);
    }
  });
});

// Калькулятор логикасы
let calcString = '';
const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('.calculator button');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML === '=') {
      try {
        calcString = eval(calcString); // Есептеу
        input.value = calcString;
      } catch {
        input.value = 'Error';
      }
    } else if (e.target.innerHTML === 'AC') {
      calcString = ''; // Барлығын тазалау
      input.value = calcString;
    } else if (e.target.innerHTML === 'DEL') {
      calcString = calcString.slice(0, -1); // Соңғы символды өшіру
      input.value = calcString;
    } else {
      calcString += e.target.innerHTML; // Символды қосу
      input.value = calcString;
    }
  });
});

// Температура конвертері
const tempInput = document.getElementById('tempInput');
const convertTempBtn = document.getElementById('convertTemp');
const conversionResult = document.getElementById('conversionResult');

convertTempBtn.addEventListener('click', () => {
  const tempValue = parseFloat(tempInput.value);
  if (isNaN(tempValue)) {
    conversionResult.textContent = 'Please enter a valid number!';
  } else {
    const convertedTemp = (tempValue * 9) / 5 + 32; // Цельсий -> Фаренгейт
    conversionResult.textContent = `${tempValue}°C = ${convertedTemp.toFixed(2)}°F`;
  }
});

// Инвестиция калькуляторы
const investmentAmount = document.getElementById('investmentAmount');
const interestRate = document.getElementById('interestRate');
const years = document.getElementById('years');
const calculateInvestment = document.getElementById('calculateInvestment');
const investmentResult = document.getElementById('investmentResult');

calculateInvestment.addEventListener('click', () => {
  const principal = parseFloat(investmentAmount.value); // Негізгі сома
  const rate = parseFloat(interestRate.value) / 100; // Пайыздық мөлшерлеме
  const time = parseFloat(years.value); // Уақыт (жылдар)

  if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
    investmentResult.textContent = 'Please enter valid numbers!';
  } else {
    const amount = principal * (1 + rate * time); // Есептеу формуласы
    investmentResult.textContent = `Future Value: ${amount.toFixed(2)}`;
  }
});

// Салмақ конвертері
const weightValue = document.getElementById('weightValue');
const weightUnit = document.getElementById('weightUnit');
const calculateWeightBtn = document.getElementById('calculateWeight');
const weightResult = document.getElementById('weightResult');

calculateWeightBtn.addEventListener('click', () => {
  const value = parseFloat(weightValue.value);
  const unit = weightUnit.value;

  if (unit === 'kg') {
    weightResult.textContent = `${value} kg = ${value * 1000} g, ${value * 2.20462} lb, ${value / 1000} ton`;
  } else if (unit === 'g') {
    weightResult.textContent = `${value} g = ${value / 1000} kg, ${value / 453.592} lb, ${value / 1000000} ton`;
  } else if (unit === 'lb') {
    weightResult.textContent = `${value} lb = ${value / 2.20462} kg, ${value * 453.592} g, ${value / 2204.62} ton`;
  } else {
    weightResult.textContent = `${value} ton = ${value * 1000} kg, ${value * 1000000} g, ${value * 2204.62} lb`;
  }
});


// Жас есептеу логикасы
const birthdateInput = document.getElementById("birthdate");
const ageResult = document.getElementById("ageResult");

birthdateInput.addEventListener("change", function() {
  const birthdate = birthdateInput.value;
  const birthDateObj = new Date(birthdate);
  const today = new Date();

  const diffInMilliseconds = today - birthDateObj;
  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  const years = Math.floor(diffInDays / 365.25);
  const months = Math.floor((diffInDays % 365.25) / 30.44);
  const days = Math.floor((diffInDays % 365.25) % 30.44);

  const result = `You are ${years} years, ${months} months, and ${days} days old.`;
  ageResult.textContent = result;
});
