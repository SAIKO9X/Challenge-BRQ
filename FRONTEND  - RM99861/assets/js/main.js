/*=============== SMOOTH SCROLL ===============*/
const lenis = new Lenis({
	duration: 1.2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
	const scrollUp = document.getElementById("scroll-up");
	this.scrollY >= 1000
		? scrollUp.classList.add("show-scroll")
		: scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

document.getElementById("cards").onmousemove = (e) => {
	for (const card of document.getElementsByClassName("card")) {
		const rect = card.getBoundingClientRect(),
			x = e.clientX - rect.left,
			y = e.clientY - rect.top;

		card.style.setProperty("--mouse-x", `${x}px`);
		card.style.setProperty("--mouse-y", `${y}px`);
	}
};

const toggleButtons = document.querySelectorAll(".toggle-heart");

// Adiciona um ouvinte de evento de clique a cada botão
toggleButtons.forEach((button) => {
	button.addEventListener("click", function () {
		// Obtém o ícone vazio e preenchido dentro do botão clicado
		const emptyIcon = button.querySelector(".empty-heart");
		const filledIcon = button.querySelector(".filled-heart");

		// Alterna a visibilidade dos ícones
		if (emptyIcon.style.display === "inline") {
			emptyIcon.style.display = "none";
			filledIcon.style.display = "inline";
		} else {
			emptyIcon.style.display = "inline";
			filledIcon.style.display = "none";
		}
	});
});

/*=============== MENU SETTINGS ===============*/
const menu_open = gsap.timeline({
	paused: "true",
	reversed: "true",
});
menu_open.to(".menu__wrapper", {
	display: "flex",
});
menu_open.to("#menu__button-1", {
	duration: 0.2,
	y: 50,
});
menu_open.fromTo(
	"#menu__button-2",
	{
		duration: 0.2,
		y: -100,
	},
	{
		y: -30,
	},
	"-=.15",
);
menu_open.from(
	".menu__container",
	{
		duration: 0.5,
		x: "-100%",
	},
	"-=.5",
);
menu_open.from(
	".menu__item",
	{
		stagger: {
			amount: 0.15,
		},
		y: 100,
		duration: 0.5,
	},
	"-=.1",
);
menu_open.from(
	".menu__container-2",
	{
		duration: 0.5,
		x: "100%",
	},
	"-=1",
);
menu_open.from(
	".menu__container-2 .menu__footer li span",
	{
		stagger: {
			amount: 0.15,
		},
		y: 100,
		duration: 0.5,
	},
	"-=.5",
);

function menuOpen() {
	if (menu_open.reversed()) {
		menu_open.restart();
		document.body.classList.add("menu-opened");
	} else {
		menu_open.reverse();
		document.body.classList.remove("menu-opened");
	}
}

/*=============== LOGO ANIMATION ===============*/
ScrollTrigger.create({
	animation: gsap.from(".logo", {
		y: "50vh",
		x: "-25vw",
		fontSize: "clamp(1.5rem, 10vw, 10rem)",
		yPercent: -50,
	}),
	scrub: true,
	trigger: ".home__content",
	start: "top bottom",
	endTrigger: ".home__content",
	end: "top center",
});

/*=============== CIRCLE ANIMATION ===============*/
$(".sticky-circle_wrap").each(function (index) {
	let triggerElement = $(this);
	let targetElement = $(".sticky-circle_element");

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: triggerElement,
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
		},
	});

	tl.fromTo(
		targetElement,
		{
			color: "transparent",
			width: "35em",
			height: "35em",
			borderRadius: "35em",
			duration: 1,
		},
		{
			width: "100vw",
			height: "100vh",
			borderRadius: "0em",
			duration: 1,
			color: "white",
		},
	);
});

/*=============== DARK TO LIGHT ===============*/
$(".grid_wrapper:nth-child(even), .sticky-circle_wrap").each(function (index) {
	let triggerElement = $(this);
	let targetElement = $("body, .is--nav");

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: triggerElement,
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
		},
	});
	tl.fromTo(
		targetElement,
		{
			backgroundColor: "#000",
			color: "#fff",
			duration: 1,
		},
		{
			backgroundColor: "#131925",
			color: "#fff",
			duration: 1,
		},
	);
});

/*=============== ZOOM TEXT ===============*/
gsap
	.timeline({
		scrollTrigger: {
			trigger: ".imageBoard",
			pin: true,
			start: "top top",
			end: "+=300%",
			scrub: 1,
		},
		defaults: {
			ease: "none",
		},
	})
	.to(
		["body"],
		{
			delay: 0.3,
			backgroundColor: "#000",
			color: "#fff",
			duration: 1,
			ease: "power1.easeInOut",
		},
		"start",
	)
	.to(
		".upper-container h3",
		{
			scale: 5,
			opacity: 0,
		},
		"start",
	)
	.to(
		".cardImage",
		{
			delay: 0.1,
			scale: 1,
			opacity: 1,
		},
		"start",
	);

/*=============== PCD Video Gallery ===============*/
let swiper = new Swiper(".mySwiper", {
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
});

/*=============== PCD Image Gallery ===============*/
$(".projects_link").each(function (index) {
	let relatedPopupItem = $(".popup_item").eq(index);
	let projectImg = $(this).find(".projects_img");
	let popupImg = relatedPopupItem.find(".projects_img");
	projectImg.attr("data-flip-id", index);
	popupImg.attr("data-flip-id", index);

	// Estado Inicial
	gsap.set(relatedPopupItem.find(".popup_heading"), { yPercent: -100 });

	// Interação Popup
	let openPopup = gsap
		.timeline({
			paused: true,
			defaults: {
				duration: 0.7,
				ease: "power1.inOut",
			},
		})
		.to($(this).find(".projects_heading"), { yPercent: 100 })
		.to($(this).find(".projects_p"), { yPercent: 100, opacity: 0 }, "<")
		.to($(this).parent().siblings(), { opacity: 0, duration: 0.5 }, "<")
		.to(relatedPopupItem.find(".popup_heading"), { yPercent: 0 })
		.from(relatedPopupItem.find(".popup_p"), { yPercent: 30, opacity: 0 }, "<");

	function toggleOpenClasses() {
		$("body").toggleClass("popup-open");
		relatedPopupItem.toggleClass("current");
		projectImg.toggleClass("current");
	}

	// Abrir Popup
	$(this).on("click", function () {
		// record states
		const state = Flip.getState(projectImg, {
			props: "backgroundPosition",
		});
		// toggle between states
		toggleOpenClasses();
		// animate between states
		Flip.from(state, {
			targets: popupImg,
			duration: 1,
			absolute: true,
			toggleClass: "flipping",
			ease: "power1.inOut",
		});

		openPopup.restart();
	});

	// Fechar Popup
	relatedPopupItem.find(".popup_back").on("click", function () {
		const state = Flip.getState(popupImg, {
			props: "backgroundPosition",
		});

		toggleOpenClasses();

		Flip.from(state, {
			targets: projectImg,
			duration: 1,
			absolute: true,
			toggleClass: "flipping",
			ease: "power1.inOut",
		});

		openPopup.reverse();
	});

	// Parallax
	gsap
		.timeline({
			scrollTrigger: {
				trigger: $(this),
				scrub: true,
			},
			defaults: {
				ease: "none",
			},
		})
		.fromTo(
			$(this).find(".projects_img"),
			{ backgroundPosition: "50% 100%" },
			{ backgroundPosition: "50% 0%" },
		)
		.fromTo(
			$(this).find(".projects_content-wrap"),
			{ yPercent: 30 },
			{ yPercent: -30 },
			0,
		);
});

/*=============== POPULAR SWIPER ===============*/
let swiperPopular = new Swiper(".popular__container", {
	slidesPerView: "auto",
	spaceBetween: 24,
	loop: false,
	grabCursor: true,
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
	},
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
		1024: {
			spaceBetween: 48,
		},
	},
});

/*=============== BYD ARTICLE ===============*/
window.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger, Flip);
	ScrollTrigger.normalizeScroll(true);

	let zoneEl = $("[js-scrollflip-element='zone']"),
		targetEl = $("[js-scrollflip-element='target']").first();

	let tl;
	function createTimeline() {
		if (tl) {
			tl.kill();
			gsap.set(targetEl, { clearProps: "all" });
		}
		tl = gsap.timeline({
			scrollTrigger: {
				trigger: zoneEl.first(),
				start: "center center",
				endTrigger: zoneEl.last(),
				end: "center center",
				scrub: true,
			},
		});
		zoneEl.each(function (index) {
			let nextZoneEl = zoneEl.eq(index + 1);
			if (nextZoneEl.length) {
				let nextZoneDistance =
					nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
				let thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
				let zoneDifference = nextZoneDistance - thisZoneDistance;
				tl.add(
					Flip.fit(targetEl[0], nextZoneEl[0], {
						duration: zoneDifference,
						ease: "power2.inOut",
					}),
				);
			}
		});
	}
	createTimeline();

	let resizeTimer;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			createTimeline();
		}, 250);
	});
});

// BYD SLIDER
const carNames = ["BYD Dolphin", "BYD D1", "BYD Yuan Plus"];

function imgSlider(e, name) {
	gsap.to(".car__name h3", { opacity: 0, duration: 0.3 });
	gsap.to(".slider__image img", {
		opacity: 0,
		duration: 0.3,
		onComplete: updateCarInfo,
		onCompleteParams: [e, name],
	});
}

function updateCarInfo(e, name) {
	document.querySelector(".headimg").src = e;
	document.querySelector(".car__name h3").textContent = name;

	gsap.to(".car__name h3", { opacity: 1, duration: 1 });
	gsap.to(".slider__image img", { opacity: 1, duration: 1 });
}

const btns = document.querySelectorAll(".slidebar__btn");

btns.forEach((button, index) => {
	button.addEventListener("click", () => {
		const imageName = carNames[index];
		imgSlider(`./assets/images/slide/byd-${index + 1}.png`, imageName);
	});
});

// text animation

let textWrapper = document.querySelector(".ml3");
textWrapper.innerHTML = textWrapper.textContent.replace(
	/\S/g,
	"<span class='letter'>$&</span>",
);

anime
	.timeline({ loop: true })
	.add({
		targets: ".ml3 .letter",
		opacity: [0, 1],
		easing: "easeInOutQuad",
		duration: 2250,
		delay: (el, i) => 150 * (i + 1),
	})
	.add({
		targets: ".ml3",
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000,
	});

/*=============== PRICING SECTION ===============*/
let toggleBtn = document.querySelector(".toggle__btn");
let proPrice = document.querySelector("#pro");
let premiumPrice = document.querySelector("#premium");
let basicPrice = document.querySelector("#basic");

toggleBtn.addEventListener("click", () => {
	const newBasic = basicPrice.innerHTML === "350" ? "3200" : "350";
	basicPrice.innerHTML = newBasic;

	const newPro = proPrice.innerHTML === "660" ? "4800" : "660";
	proPrice.innerHTML = newPro;

	const newPremium = premiumPrice.innerHTML === "850" ? "8600" : "850";
	premiumPrice.innerHTML = newPremium;
});

/*=============== FAQ ===============*/
const items = document.querySelectorAll(".accordion__link");

function toggleAccordion() {
	const itemToggle = this.getAttribute("aria-expanded");
	const icon = this.querySelector("i");

	for (i = 0; i < items.length; i++) {
		items[i].setAttribute("aria-expanded", "false");
		items[i].querySelector("i").classList.remove("ri-close-line");
		items[i].querySelector("i").classList.add("ri-add-line");
	}

	if (itemToggle == "false") {
		this.setAttribute("aria-expanded", "true");
		icon.classList.remove("ri-add-line");
		icon.classList.add("ri-close-line");
	}
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

/*=============== FOOTER ===============*/
const cursor = document.querySelector("#cursor");
const cursorBall = document.querySelector("#cursor__ball");
const tl = gsap.timeline({ paused: true });
const button = document.querySelectorAll(".footer__button");
const overlayTitle = document.querySelector("#title");
const overlayFlag = document.querySelector("#flag");
const footerOverlay = document.querySelector(".footer__overlay");

button.forEach((button) => {
	button.addEventListener("mouseenter", () => {
		const countryImage = button.dataset.country;
		cursor.style.backgroundImage = `url(${countryImage})`;
		cursor.style.backgroundSize = "cover";
		cursor.style.width = "50px";
		cursor.style.height = "50px";
		tl.play();
	});

	button.addEventListener("mouseleave", () => {
		cursor.style.backgroundImage = "none";
		cursor.style.width = "8px";
		cursor.style.height = "8px";
		tl.reverse();
	});

	button.addEventListener("click", () => {
		overlayTitle.innerText = button.innerText;

		const countryImage = button.dataset.country;
		const imgElement = document.createElement("img");

		imgElement.width = 80;
		imgElement.zIndex = 10000;

		imgElement.src = countryImage;
		overlayFlag.innerHTML = "";
		overlayFlag.appendChild(imgElement);

		tl2.reversed(!tl2.reversed());
	});
});

// Cursor do Mouse
const updateCursorPosition = (e) => {
	gsap.to("#cursor__ball", {
		duration: 1,
		x: e.pageX * 2 - 50 + "%",
		y: e.pageY * 2 - 50 + "%",
		ease: "power3.out",
	});

	cursor.style.top = `${e.pageY}px`;
	cursor.style.left = `${e.pageX}px`;

	const isOverOverlay =
		e.pageX >= footerOverlay.offsetLeft &&
		e.pageX <= footerOverlay.offsetLeft + footerOverlay.offsetWidth &&
		e.pageY >= footerOverlay.offsetTop &&
		e.pageY <= footerOverlay.offsetTop + footerOverlay.offsetHeight;

	if (isOverOverlay) {
		cursorBall.style.backgroundColor = "#0000001a";
		cursorBall.style.borderColor = "#000";
	} else {
		cursorBall.style.backgroundColor = "";
		cursorBall.style.borderColor = "";
	}
};

document.addEventListener("mouseleave", () => {
	cursor.classList.remove("cursor-block");
	cursor.classList.add("cursor-none");
	cursorBall.classList.remove("cursor-block");
	cursorBall.classList.add("cursor-none");
});

document.addEventListener("mouseover", () => {
	cursor.classList.remove("cursor-none");
	cursor.classList.add("cursor-block");
	cursorBall.classList.remove("cursor-none");
	cursorBall.classList.add("cursor-block");
});

document.addEventListener("mousemove", updateCursorPosition);

document.addEventListener("mouseout", () => {
	cursor.textContent = "";
	tl.reverse();
});

// Overlay do Footer
const tl2 = gsap.timeline({ paused: true });

function resetInput() {
	setTimeout(() => {
		document
			.querySelectorAll(".form input, .form textarea")
			.forEach((input) => {
				input.value = "";
			});

		const checkbox = document.querySelectorAll('input[(type = "checkbox")]');
		checkbox.forEach((box) => {
			box.checked = false;
		});
	}, 2000);
}

function openForm() {
	animateOpenForm();
	const closeBtn = document.querySelector("#close-btn");
	const submit = document.querySelector("#submit__button");

	closeBtn.addEventListener("click", () => {
		tl2.reversed(!tl2.reversed());
	});

	submit.addEventListener("click", () => {
		tl2.reversed(!tl2.reversed());
	});
}

openForm();

function animateOpenForm() {
	tl2.to(".footer__overlay", 1, {
		right: "0",
		ease: "power4.inOut",
	});

	tl2
		.to(
			".overlay__item",
			1,
			{
				top: 0,
				ease: "power3.inOut",
			},
			"-=0.8",
		)
		.reverse();
}
/*=============== FORM SAIL ===============*/
const numberInput = document.getElementById("credit-card");
const cardNumber = document.getElementById("card-number");

// Função para formatar o número do cartão
function format(input) {
	const numeroCartao = input.value.replace(/\D/g, "");

	if (/^\d{1,16}$/.test(numeroCartao)) {
		let numeroFormatado = "";
		for (let i = 0; i < numeroCartao.length; i++) {
			if (i > 0 && i % 4 === 0) {
				numeroFormatado += "  "; // Adiciona espaços a cada 4 dígitos
			}
			numeroFormatado += numeroCartao[i];
		}
		input.value = numeroFormatado;
	} else {
		input.setCustomValidity("Número de cartão inválido");
	}
}

// Event listeners para atualizar elementos de exibição em tempo real
// conforme o usuário insere informações do cartão
cardNumber.addEventListener("keypress", function (e) {
	if (isNaN(e.key)) {
		e.preventDefault();
	}
});
numberInput.addEventListener("keyup", function () {
	cardNumber.innerHTML = this.value;
});

document.getElementById("card-name").addEventListener("keyup", function () {
	document.querySelector(".name-holder").innerHTML = this.value;
});
document.getElementById("exp-month").addEventListener("keyup", function () {
	document.querySelector(".exp-month").innerHTML = this.value;
});
document.getElementById("exp-year").addEventListener("keyup", function () {
	document.querySelector(".exp-year").innerHTML = this.value;
});
document.getElementById("cvv-input").addEventListener("keyup", function () {
	document.querySelector(".signature i").innerHTML = this.value;
});

// Função para iniciar o timer quando a seção de timer é visível na tela
function startTimerWhenVisible(duration, display) {
	let timer = duration,
		minutes,
		seconds;

	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const timerObserver = new IntersectionObserver((entries, observer) => {
		if (entries[0].isIntersecting) {
			let intervalId = setInterval(function () {
				minutes = parseInt(timer / 60, 10);
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				display.textContent = minutes + ":" + seconds;

				if (--timer < 0) {
					clearInterval(intervalId);
				}
			}, 1000);

			timerObserver.disconnect();
		}
	}, observerOptions);

	timerObserver.observe(display);
}

// Iniciar o timer quando a página é carregada
window.onload = function () {
	let Minutes = 60 * 3, // 3 horas em segundos
		display = document.querySelector("#time");
	startTimerWhenVisible(Minutes, display);
};

// Efeito de virar o cartão ao passar o mouse sobre o campo CVV
const creditCvv = document.getElementById("credit-cvv");
const creditCard = document.querySelector(".credit__card");

creditCvv.addEventListener("mouseenter", () => {
	creditCard.style.transform = "rotateY(180deg)";
});

creditCvv.addEventListener("mouseleave", () => {
	creditCard.style.transform = "rotateY(0deg)";
});

// Gerenciamento de formulário de vários passos
let currentStep = 1;
const totalSteps = document.querySelectorAll(".step").length;

// Função para atualizar os indicadores de passos e progresso
function updateIndicator(step) {
	const stepIndicators = document.querySelectorAll(".step-indicator");
	const stepBars = document.querySelectorAll(".step-bar");

	stepIndicators.forEach((indicator, index) => {
		if (index < step) {
			indicator.classList.add("active");
		} else {
			indicator.classList.remove("active");
		}
	});

	stepBars.forEach((bar, index) => {
		if (index < step - 1) {
			bar.classList.add("completed");
		} else {
			bar.classList.remove("completed");
		}
	});
}

// Função para mostrar o passo atual
function showStep(step) {
	const steps = document.querySelectorAll(".step");

	steps.forEach((stepElement) => {
		stepElement.style.display = "none";
	});

	const currentStepElement = document.getElementById(`step-${step}`);
	if (currentStepElement) {
		currentStepElement.style.display = "block";
	}
}

// Função para avançar para o próximo passo
function nextStep() {
	if (currentStep < totalSteps) {
		// totalSteps é o número total de etapas
		currentStep++;
		showStep(currentStep);
		updateIndicator(currentStep);
	}
}

// Função para voltar para o passo anterior
function previousStep() {
	if (currentStep > 1) {
		currentStep--;
		showStep(currentStep);
		updateIndicator(currentStep);
	}
}
// Mostrar o primeiro passo inicialmente
showStep(currentStep);

// Abrir e fechar o formulário (etapa)
const openButtons = document.querySelectorAll(".open-btn");
const closeButton = document.getElementById("close-form");
const stepsContainer = document.querySelector(".steps__container");

openButtons.forEach((button) => {
	button.addEventListener("click", function () {
		const carName = this.getAttribute("data-car-name");
		const carImage = this.getAttribute("data-car-image");

		const stepCarNames = document.querySelectorAll(".name__car");
		const stepCarImages = document.querySelectorAll(".car__image");

		const selectedCar = document.querySelector(".receipt span:nth-child(2)");
		selectedCar.textContent = carName;

		stepCarNames.forEach((element) => {
			element.textContent = carName;
		});

		stepCarImages.forEach((element) => {
			element.setAttribute("src", carImage);
		});

		modiContainer.style.display = "none";
		stepsContainer.style.display = "block";
		document.body.style.overflow = "hidden";
	});
});

closeButton.addEventListener("click", () => {
	stepsContainer.style.display = "none";
	document.body.style.overflowY = "auto";
	document.body.style.overflowX = "hidden";
});

// Abrir e fechar o formulário com (modificações)
const openButtons2 = document.querySelectorAll(".open-2");
const modiContainer = document.querySelector(".modifications");

openButtons2.forEach((button) => {
	button.addEventListener("click", function () {
		const carName = this.getAttribute("data-car-name");
		const carImage = this.getAttribute("data-car-image");

		const stepCarNames = document.querySelectorAll(".name__car");
		const stepCarImages = document.querySelectorAll(".car__image");

		const selectedCar = document.querySelector(".receipt span:nth-child(2)");
		selectedCar.textContent = carName;

		stepCarNames.forEach((element) => {
			element.textContent = carName;
		});

		stepCarImages.forEach((element) => {
			element.setAttribute("src", carImage);
		});

		stepsContainer.style.display = "block";
		modiContainer.style.display = "block";
		document.body.style.overflow = "hidden";
	});
});

// Atualizar o tipo de aluguel selecionado

const subscriptionRadios = document.querySelectorAll(
	'input[name="subscription"]',
);
const rentalType = document.querySelector(".rental__type");

for (const radio of subscriptionRadios) {
	radio.addEventListener("change", updateSelectedOption);
}

function updateSelectedOption() {
	const selectedOptionText = [];

	for (const radio of subscriptionRadios) {
		if (radio.checked) {
			selectedOptionText.push(radio.nextElementSibling.textContent);
		}
	}

	if (selectedOptionText.length > 0) {
		rentalType.textContent = `Conta ${selectedOptionText.join(", ")}`;
		document.querySelector(".rental__time").textContent = "Mensalidade";
	} else {
		rentalType.textContent = "";
	}
}

// Atualizar o tempo de aluguel selecionado
document.getElementById("time-location").addEventListener("keyup", function () {
	document.querySelector(".rental__time").innerHTML = this.value;
	rentalType.textContent = `Diária`;
});

// Atualizar o tipo de modificação selecionada
const dessert1 = document.getElementById("dessert-1");
const dessert2 = document.getElementById("dessert-2");
const dessert3 = document.getElementById("dessert-3");
const modificationType = document.querySelector(".modification__type");
const modificationText = document.querySelector(".modification__text");

dessert1.addEventListener("change", updateModification);
dessert2.addEventListener("change", updateModification);
dessert3.addEventListener("change", updateModification);

function updateModification() {
	const selectedModi = [];

	if (dessert1.checked) {
		selectedModi.push("Banco com Transferência");
	}
	if (dessert2.checked) {
		selectedModi.push("Prolongador de Pedais");
	}
	if (dessert3.checked) {
		selectedModi.push("Pomo Giratório Removível");
	}

	if (selectedModi.length > 0) {
		modificationType.style.display = "block";
		modificationText.textContent = `${selectedModi.join(", ")}`;
	} else {
		modificationType.style.display = "none";
	}
}
/*=============== MULTI SELECT ===============*/
const checkboxes = document.querySelectorAll(".multi__checkbox");

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("click", () => {
		checkboxes.forEach((cb) => {
			cb.querySelector("input").checked = false; // Uncheck all checkboxes
		});

		const input = checkbox.querySelector("input");
		input.checked = true; // Check the clicked checkbox

		// Trigger the 'change' event on the input to apply the CSS styles
		const event = new Event("change", { bubbles: true });
		input.dispatchEvent(event);
	});
});
