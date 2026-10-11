const menuButton = document.querySelector('.nav__toggle');
const navigation = document.querySelector('#nav-links');

menuButton.addEventListener('click', () => {
	const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
	menuButton.setAttribute('aria-expanded', String(!isExpanded));
	menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
	navigation.classList.toggle('is-open', !isExpanded);
});

navigation.addEventListener('click', (event) => {
	if (event.target.closest('a')) {
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('aria-label', 'Open navigation');
		navigation.classList.remove('is-open');
	}
});

document.querySelectorAll('.faq__question').forEach((question) => {
	question.addEventListener('click', () => {
		const isExpanded = question.getAttribute('aria-expanded') === 'true';
		document.querySelectorAll('.faq__question').forEach((otherQuestion) => {
			otherQuestion.setAttribute('aria-expanded', 'false');
			document.getElementById(otherQuestion.getAttribute('aria-controls')).hidden = true;
		});
		const answer = document.getElementById(question.getAttribute('aria-controls'));
		question.setAttribute('aria-expanded', String(!isExpanded));
		answer.hidden = isExpanded;
	});
});

const calculatorForm = document.querySelector('#calculator-form');

if (calculatorForm) {
	const feedback = document.querySelector('#calculator-feedback');
 const resultElements = {
		dailyEnergy: document.querySelector('#daily-energy'),
		monthlyEnergy: document.querySelector('#monthly-energy'),
		yearlyEnergy: document.querySelector('#yearly-energy'),
		monthlyCost: document.querySelector('#monthly-cost'),
		yearlyCost: document.querySelector('#yearly-cost')
	};
	const numberFormat = new Intl.NumberFormat('en-AU', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	function updateCalculator() {
		const power = calculatorForm.elements.power.valueAsNumber;
		const hours = calculatorForm.elements.hours.valueAsNumber;
		const price = calculatorForm.elements.price.valueAsNumber;
		const errors = [];

		if (!Number.isFinite(power) || power <= 0) {
			errors.push('Enter a power value greater than 0 watts.');
		}
		if (!Number.isFinite(hours) || hours < 0 || hours > 24) {
			errors.push('Enter daily use between 0 and 24 hours.');
		}
		if (!Number.isFinite(price) || price < 0) {
			errors.push('Enter an electricity price of 0 cents or more.');
		}

		feedback.textContent = errors.length
			? errors.join(' ')
			: 'Estimates update automatically as you change the values.';
		feedback.classList.toggle('is-error', errors.length > 0);

		if (errors.length > 0) {
			resultElements.dailyEnergy.textContent = '-- kWh';
			resultElements.monthlyEnergy.textContent = '-- kWh';
			resultElements.yearlyEnergy.textContent = '-- kWh';
			resultElements.monthlyCost.textContent = '--';
			resultElements.yearlyCost.textContent = '--';
			return;
		}

		const dailyEnergy = (power * hours) / 1000;
		const monthlyEnergy = dailyEnergy * 30;
		const yearlyEnergy = dailyEnergy * 365;
		const monthlyCost = (monthlyEnergy * price) / 100;
		const yearlyCost = (yearlyEnergy * price) / 100;

		resultElements.dailyEnergy.textContent = `${numberFormat.format(dailyEnergy)} kWh`;
		resultElements.monthlyEnergy.textContent = `${numberFormat.format(monthlyEnergy)} kWh`;
		resultElements.yearlyEnergy.textContent = `${numberFormat.format(yearlyEnergy)} kWh`;
		resultElements.monthlyCost.textContent = `$${numberFormat.format(monthlyCost)}`;
		resultElements.yearlyCost.textContent = `$${numberFormat.format(yearlyCost)}`;
	}

	calculatorForm.addEventListener('input', updateCalculator);
	calculatorForm.addEventListener('change', updateCalculator);
	calculatorForm.addEventListener('submit', (event) => {
		event.preventDefault();
		updateCalculator();
	});
	updateCalculator();
}

document.querySelector('#year').textContent = new Date().getFullYear();
