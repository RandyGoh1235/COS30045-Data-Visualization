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

document.querySelector('#year').textContent = new Date().getFullYear();
