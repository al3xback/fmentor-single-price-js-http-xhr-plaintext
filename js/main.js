import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/6a940b3d44b676c518cf2ca1366c5338/raw/76ce72cbdd199b9c04ec355324bcc058e67a6b94/single-price-data.txt';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const sectionJoinCommunityTemplate = document.getElementById(
	'section-join-community-template'
);
const sectionMonthlySubscriptionTemplate = document.getElementById(
	'section-monthly-subsription-template'
);
const sectionWhyUsTemplate = document.getElementById('section-why-us-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const rawData = data.split('\n');

	const sectionData = [];
	let sectionItemData = [];
	for (let i = 0; i < rawData.length; i++) {
		const item = rawData[i];
		if (item === '') {
			sectionData.push(sectionItemData);
			sectionItemData = [];
			continue;
		}
		sectionItemData.push(item);
		if (i === rawData.length - 1) {
			sectionData.push(sectionItemData);
		}
	}

	const [joinCommunityData, monthlySubsriptionData, whyUsData] = sectionData;
	const [
		joinCommunityTitle,
		joinCommunitySubtitle,
		joinCommunityDescription,
	] = joinCommunityData;
	const [
		monthlySubsriptionTitle,
		monthlySubsriptionPrice,
		monthlySubsriptionDescription,
	] = monthlySubsriptionData;
	const [whyUsTitle, ...whyUsBenefits] = whyUsData;

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');
	const sectionGroupEl = cardTemplateNode.querySelector('.card__group');

	/* section join community */
	const sectionJoinCommunityTemplateNode = document.importNode(
		sectionJoinCommunityTemplate.content,
		true
	);
	const sectionJoinCommunityEl =
		sectionJoinCommunityTemplateNode.querySelector(
			'.card__block--join-community'
		);

	const sectionJoinCommunityTitleEl =
		sectionJoinCommunityEl.querySelector('.card__title');
	sectionJoinCommunityTitleEl.textContent = joinCommunityTitle;

	const sectionJoinCommunitySubtitleEl =
		sectionJoinCommunityEl.querySelector('.card__subtitle');
	sectionJoinCommunitySubtitleEl.textContent = joinCommunitySubtitle;

	const sectionJoinCommunityDescriptionEl =
		sectionJoinCommunityEl.querySelector('.card__desc');
	sectionJoinCommunityDescriptionEl.textContent = joinCommunityDescription;

	/* section monthly subscription */
	const sectionMonthlySubscriptionTemplateNode = document.importNode(
		sectionMonthlySubscriptionTemplate.content,
		true
	);
	const sectionMonthlySubscriptionEl =
		sectionMonthlySubscriptionTemplateNode.querySelector(
			'.card__block--monthly-subsription'
		);

	const sectionMonthlySubscriptionTitleEl =
		sectionMonthlySubscriptionEl.querySelector('.card__title');
	sectionMonthlySubscriptionTitleEl.textContent = monthlySubsriptionTitle;

	const sectionMonthlySubscriptionPriceEl =
		sectionMonthlySubscriptionEl.querySelector('.card__price');
	const sectionMonthlySubscriptionPriceAmountEl =
		sectionMonthlySubscriptionPriceEl.querySelector('.num');
	sectionMonthlySubscriptionPriceAmountEl.textContent =
		monthlySubsriptionPrice.substring(
			0,
			monthlySubsriptionPrice.indexOf(' ')
		);
	const sectionMonthlySubscriptionPriceLabelEl =
		sectionMonthlySubscriptionPriceEl.querySelector('.label');
	sectionMonthlySubscriptionPriceLabelEl.textContent =
		monthlySubsriptionPrice.substring(
			monthlySubsriptionPrice.indexOf(' ') + 1
		);

	const sectionMonthlySubscriptionDescriptionEl =
		sectionMonthlySubscriptionEl.querySelector('.card__desc');
	sectionMonthlySubscriptionDescriptionEl.textContent =
		monthlySubsriptionDescription;

	/* section why us */
	const sectionWhyUsTemplateNode = document.importNode(
		sectionWhyUsTemplate.content,
		true
	);
	const sectionWhyUsEl = sectionWhyUsTemplateNode.querySelector(
		'.card__block--why-us'
	);

	const sectionWhyUsTitleEl = sectionWhyUsEl.querySelector('.card__title');
	sectionWhyUsTitleEl.textContent = whyUsTitle;

	const sectionWhyUsListEl = sectionWhyUsEl.querySelector('.card__list');

	for (const benefit of whyUsBenefits) {
		const sectionWhyUsListItemEl = document.createElement('li');
		sectionWhyUsListItemEl.textContent = benefit;

		sectionWhyUsListEl.appendChild(sectionWhyUsListItemEl);
	}

	removeLoading();
	sectionGroupEl.appendChild(sectionMonthlySubscriptionTemplateNode);
	sectionGroupEl.appendChild(sectionWhyUsTemplateNode);
	cardEl.prepend(sectionJoinCommunityTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
