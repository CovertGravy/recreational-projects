const clock = document.querySelector(".clock");
const second_hand = document.querySelector(".hand.second");
const minute_hand = document.querySelector(".hand.minute");
const hour_hand = document.querySelector(".hand.hour");
const time = document.querySelector(".time");

let seconds = 0;
let minutes = 0;
let hours = 0;
let request_interval;

// #region clock-functions

function initClock() {
	const date = new Date();
	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = (date.getHours() % 12) * 5 + Math.floor(minutes / 12);

	rotateSecondHand();
	rotateMinuteHand();
	rotateHourHand();
	startClock();
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function incrementSecond() {
	seconds = ++seconds % 60;
	seconds === 0 && incrementMinute();
}

function incrementMinute() {
	minutes = ++minutes % 60;
	minutes % 12 === 0 && incrementHour();
}

function incrementHour() {
	hours = ++hours % 60;
}

function rotateSecondHand(second = seconds) {
	const secondDegree = second * 6;
	second_hand.setAttribute("data-value", prefixZero(second));
	second_hand.style.setProperty("--degree", secondDegree + "deg");
	clock.style.setProperty("--degree", secondDegree + "deg");
}

function rotateMinuteHand(minute = minutes) {
	const minuteDegree = minute * 6;
	minute_hand.style.setProperty("--degree", minuteDegree + "deg");
	minute_hand.setAttribute("data-value", prefixZero(minute));
}

function rotateHourHand(hour = hours) {
	const hourDegree = hour * 6;
	hour_hand.style.setProperty("--degree", hourDegree + "deg");
	hour_hand.setAttribute("data-value", prefixZero(Math.floor(hour / 5) || 12));
}

function rotateHands() {
	incrementSecond();
	rotateSecondHand();
	rotateMinuteHand();
	rotateHourHand();
}

function startClock() {
	request_interval = setInterval(rotateHands, 1000);
}

function stopClock() {
	clearInterval(request_interval);
}

// #endregion clock-functions

function setWaveAnimationPlayState(state) {
	clock.style.setProperty("--waves-play-state", state);
}

function prefixZero(number) {
	return number >= 10 ? number.toString() : number.toString().padStart(2, "0");
}

function onCustomTimeChange(time) {
	// time format = HH:mm
	let [_hours, _minutes] = time.split(':').map(Number);
	_hours = (_hours % 12) * 5 + Math.floor(_minutes / 12);
	stopClock();
	rotateSecondHand(0);
	rotateMinuteHand(_minutes);
	rotateHourHand(_hours);
	seconds = 0;
	minutes = _minutes;
	hours = _hours;
	startClock();
}

initClock();
