import { slides, slideDetailsConfig } from './content.js';

class Slider extends HTMLElement {
  constructor() {
    super();
    this.currentSlide = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { shadowRoot } = this;
    this.setAttribute('class', 'slider');
    this.classList.add('slider--separated_description');

    const navArrowPrev = document.createElement('div');
    navArrowPrev.setAttribute('class', 'slider__arrow');
    navArrowPrev.classList.add('arrow--prev');
    navArrowPrev.innerHTML = `<`;
    navArrowPrev.addEventListener('click', () => this.prevSlide());

    const navArrowNext = document.createElement('div');
    navArrowNext.setAttribute('class', 'slider__arrow');
    navArrowNext.classList.add('arrow--next');
    navArrowNext.innerHTML = `>`;
    navArrowNext.addEventListener('click', () => this.nextSlide());

    this.slideWrapper = document.createElement('div');
    this.slideWrapper.setAttribute('class', 'slider__wrapper');
    this.slideWrapper.setAttribute('data-slide', this.currentSlide);

    const slideDetails = document.createElement('div');
    slideDetails.setAttribute('class', 'slider__details');
    this.buildDetails(slideDetails, slideDetailsConfig.length);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'assets/styles/slider.css');

    shadowRoot.appendChild(link);
    shadowRoot.appendChild(navArrowPrev);
    shadowRoot.appendChild(this.slideWrapper);
    shadowRoot.appendChild(navArrowNext);
    shadowRoot.appendChild(slideDetails);

    this.details = slides.map((slide) => slide.details);
    this.createSlides(this.slideWrapper, slides);
    this.setDetailContent();
  }

  createSlides(wrapper, slides) {
    const gen = this.slideGenerator();
    gen.next();
    slides.forEach((slideContent) => {
      wrapper.appendChild(gen.next(slideContent).value);
    });
  }

  buildDetails(container, times) {
    const gen = this.detailsGenerator();
    gen.next();
    slideDetailsConfig.properties.forEach((property) => {
      container.appendChild(gen.next(property).value);
    });
  }

  nextSlide() {
    const slideWrapper = this.shadowRoot.querySelector('.slider__wrapper');
    if (this.currentSlide < slides.length - 1) {
      slideWrapper.setAttribute('data-slide', ++this.currentSlide);
      this.setDetailContent();
    }
  }

  prevSlide() {
    const slideWrapper = this.shadowRoot.querySelector('.slider__wrapper');
    if (this.currentSlide > 0) {
      slideWrapper.setAttribute('data-slide', --this.currentSlide);
      this.setDetailContent();
    }
  }

  *slideGenerator() {
    let content = yield;
    while (true) {
      const slide = document.createElement('div');
      slide.setAttribute('class', 'slide');

      const img = document.createElement('img');
      img.setAttribute('src', content.src);

      const carName = document.createElement('p');
      carName.setAttribute('class', 'slide__car__name');
      carName.innerText = `${content.title}`;

      const carDescription = document.createElement('p');
      carDescription.setAttribute('class', 'slide__car__description');
      carDescription.innerText = `${content.subtitle}`;

      const carDetails = document.createElement('div');
      carDetails.setAttribute('class', 'slide__car');

      slide.appendChild(img);
      slide.appendChild(carDetails);
      carDetails.appendChild(carName);
      carDetails.appendChild(carDescription);

      content = yield slide;
    }
  }

  *detailsGenerator() {
    let content = yield;
    while (true) {
      const detailsContainer = document.createElement('div');
      detailsContainer.setAttribute('class', 'slider__details__attribute');
      detailsContainer.setAttribute('data-name', content.name);

      const label = document.createElement('p');
      label.setAttribute('class', 'slider__details__attribute-label');
      label.innerText = content.label;

      const value = document.createElement('p');
      value.setAttribute('class', 'slider__details__attribute-value');
      value.classList.add('animated', 'fade-in');

      detailsContainer.appendChild(label);
      detailsContainer.appendChild(value);

      content = yield detailsContainer;
    }
  }

  setDetailContent() {
    slideDetailsConfig.properties.forEach((property) => {
      const element = this.shadowRoot.querySelector(`[data-name="${property.name}"]`);
      const value = element.querySelector('.slider__details__attribute-value');
      element.removeChild(value);
      value.innerText = slides[this.currentSlide].details[property.name];
      element.appendChild(value);
    });
  }
}
customElements.define('car-slider', Slider);
