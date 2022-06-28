const template = document.createElement('template');
template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 400px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
    border-radius: 30px;
		border-bottom: blue 5px solid;
		border-left: blue 5px solid;
	}

	.user-card img {
		width: 100%;
    border-radius: 50%;
    padding: 20px;
	}

	.user-card button {
		cursor: pointer;
		background: blue;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}

  .details {
    margin-left: 40px;
  }
  </style>
  <div class="user-card">
    <img />
    <div class="details">
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if(this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('id-card', UserCard);