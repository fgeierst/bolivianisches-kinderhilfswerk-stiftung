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
			top: calc(var(--header-height, 0) + .8em + .7em);
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
			transform: translateY(-100%);
		}

		:focus-visible {
			outline: 2px solid;
			outline-offset: 2px;
		}
	}
	@media (min-width: ${this.breakpoint + 1}px) {
		button {
			display: none;
		}
	}
</style>

<button aria-expanded="false"><slot name="button"></slot> </button>
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


