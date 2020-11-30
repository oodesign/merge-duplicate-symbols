class ProgressRing extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute('stroke');
    const radius = this.getAttribute('radius');
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;

    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `
      <svg
        height="${radius * 2}"
        width="${radius * 2}"
       >
         <circle
           stroke="#FF8E78"
           stroke-dasharray="${this._circumference} ${this._circumference}"
           style="stroke-dashoffset:${this._circumference}"
           stroke-width="${stroke}"
           fill="transparent"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
      </svg>

      <style>
        circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
    `;
  }

  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.querySelector('circle');
    circle.style.strokeDashoffset = offset;
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }
}

window.customElements.define('progress-ring', ProgressRing);

// // emulate progress attribute change
// let progress = 0;
// const el = document.querySelector('progress-ring');

// const interval = setInterval(() => {
//   progress += 10;
//   el.setAttribute('progress', progress);
//   if (progress === 100)
//     clearInterval(interval);
// }, 1000);
