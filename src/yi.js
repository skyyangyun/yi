const waitChildMap = new WeakMap();

function fetchTemplate(target) {
	fetch(`./${target.name}.html`).then(response=>response.text()).then(text=>{
		/* get documentFragment */
		const range = document.createRange();
		const fragment = range.createContextualFragment(text);
		const templateContent = fragment.querySelector('template').content;
		Object.defineProperty(target, "templateContent", {
			value: templateContent,
		});

		/* render element which already in document */
		const waitArray = waitChildMap.get(target) || [];
		let t;
		while((t = waitArray.shift())){
			t.shadowRoot.appendChild(target.templateContent.cloneNode(true));
		}
		waitChildMap.delete(target);
	});
}

class Yi extends HTMLElement {
	static templateContent = null;
	constructor() {
		super();
		const target = new.target;
		if(!target) throw new TypeError();

		this.attachShadow({mode: 'open'});

		if(target.templateContent) {
			/* render element if templateContent is exist */
			this.shadowRoot.appendChild(target.templateContent.cloneNode(true));
		}
		else {
			/* push to array, render after templateContent fetch finish. */
			let waitArray = waitChildMap.get(target);
			if(!waitArray) {
				waitArray = [];
				waitChildMap.set(target, waitArray);
				fetchTemplate(target);
			}
			waitArray.push(this);
		}
	}
}
Object.defineProperty(Yi, "templateContent", {
	value: null
});

export default Yi;
