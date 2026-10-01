document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. CALCULADORA DE FORÇA CENTRÍPETA
  // ==========================================================================
  const calcForm = document.getElementById('calc-form');
  const resultText = document.getElementById('result-text');
  const resultSpeedKmh = document.getElementById('result-speed-kmh');

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const massa = parseFloat(document.getElementById('massa').value);
    const velocidade = parseFloat(document.getElementById('velocidade').value);
    const raio = parseFloat(document.getElementById('raio').value);

    if (raio <= 0) {
      alert('O raio deve ser maior que zero.');
      return;
    }

    // Fórmula: Fc = (m * v^2) / r
    const forcaCentripeta = (massa * Math.pow(velocidade, 2)) / raio;
    const velocidadeKmh = velocidade * 3.6;

    resultText.innerHTML = `Força Centrípeta (Fc): <strong>${forcaCentripeta.toFixed(2)} N</strong>`;
    resultSpeedKmh.textContent = `Velocidade em km/h: ${velocidadeKmh.toFixed(2)} km/h`;
  });

  // ==========================================================================
  // 2. VISUALIZADOR: CALENDÁRIO INTERATIVO
  // ==========================================================================
  const monthYearDisplay = document.getElementById('month-year-display');
  const calendarDaysContainer = document.getElementById('calendar-days');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');

  // Mês base: Outubro 2026 (Mês 9 no JS pois começa em 0)
  let currentDate = new Date(2026, 9, 1);

  const monthsNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Atualiza cabeçalho
    monthYearDisplay.textContent = `${monthsNames[month]} ${year}`;

    // Limpa dias anteriores
    calendarDaysContainer.innerHTML = '';

    // Primeiro dia do mês e total de dias
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Preenche dias vazios antes do início do mês
    for (let x = 0; x < firstDayIndex; x++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('calendar-day', 'empty');
      calendarDaysContainer.appendChild(emptyDiv);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('calendar-day');
      dayDiv.textContent = day;

      // Destaca a data limite (15 de Outubro de 2026)
      if (day === 15 && month === 9 && year === 2026) {
        dayDiv.classList.add('event-deadline');
        dayDiv.title = 'Prazo Final do Projeto';
      }

      calendarDaysContainer.appendChild(dayDiv);
    }
  }

  // Navegação de Meses
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Renderização inicial
  renderCalendar();
});
