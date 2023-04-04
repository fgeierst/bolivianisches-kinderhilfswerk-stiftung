export class ExpandingNav extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = `
<style>
 @media (max-width: ${this.breakpoint}px) {
		:host {
			--transition-duration: .2s;
			position: relative;
		}

		.clipbox {
			z-index: 1;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: grid;
			overflow: hidden;
			transition: visibility var(--transition-duration) linear;
		}

		[aria-expanded="false"] + .clipbox {
			visibility: hidden;
		}

		.clipbox__drawer {
			transition: transform var(--transition-duration) linear;
			background-color: white;
		}

		[aria-expanded="false"] + .clipbox > .clipbox__drawer {
			transform: translateX(100%);
		}

		:focus-visible {
			outline: 2px solid;
			outline-offset: 2px;
		}

		button {
			all: unset;
			position: fixed;
			right: 1rem;
			top: 1rem;
			background-color: var(--color-lightgrey, rgb(248 248 248));
			width: 48px;
			height: 48px;
			z-index: 2;
		}

		button::before,
		button::after {
				content: "";
				display: block;
				width: 24px;
				height: 3px;
				position: absolute;
				left: 12px;
				background-color: var(--color-text);
				transition: transform 0.2s;
				}

		button::before {
				top: 18px;
			}

		button::after {
				bottom: 18px;
			}

		[aria-expanded="true"]::before {
			top: calc(50% - 3px / 2);
			transform: rotate(-45deg);
		}

		[aria-expanded="true"]::after {
			top: calc(50% - 3px / 2);
			transform: rotate(45deg);
		}

		button:focus-visible {
				outline-offset: -3px;
		}
	}
	@media (min-width: ${this.breakpoint + 1}px) {
		button {
			display: none;
		}
	}
	.visually-hidden {
		position: absolute;
		transform: scale(0);
	}
</style>

<button aria-expanded="false">
	<span class="visually-hidden">
		<slot name="button"></slot>
	</span>
</button>

<div class="clipbox">
	<div class="clipbox__drawer">
		<slot></slot>
	</div>
</div>
`;
		this.shadow = this.attachShadow({ mode: "open" });
		const clone = template.content.cloneNode(true);
		this.shadow.appendChild(clone);
		this.button = this.shadowRoot.querySelector("button");
		this.panel = this.shadowRoot.querySelector(".panel");
		this.button.addEventListener("click", this.onButtonClick.bind(this));
	}

	connectedCallback() {
		console.log("connected");
	}

	get breakpoint() {
    return parseInt(this.getAttribute('breakpoint') || 700, 10);
	}

	onButtonClick() {
		console.log("clicked");
		const isOpen = this.button.getAttribute("aria-expanded") === "true";
		this.button.setAttribute("aria-expanded", !isOpen);
	}
}


