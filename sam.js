import { hyper } from './node_modules/hyperhtml/index.mjs'; 

export class SamComponent extends HTMLElement {
    constructor() {
        super()
        this._model = {}
        const _model = this._model
        const _actions = {}
        const _html = hyper.bind(this.attachShadow({mode: 'closed'}))
        let _needsRender
        const _stateRepresentation = () => {
            if (!_needsRender) {
                _needsRender = true
                Promise.resolve().then(() => {
                    _needsRender = false
                    this.render(_model, _actions, _html)
                });
            }
        }
        const _propose = (_proposal) => {
            this.updateModel(_model, _proposal)
            _stateRepresentation(_model)
            this.nextAction(_model, _actions)
        }
        this.defineActions(_actions, _propose)
        this.init(_model, _actions)
    }
    // attributeChangedCallback() { this.render(this._model) }
    // connectedCallback() { this.render(this._model) }
    // static get observedAttributes() { return ['name'] } // TODO
}