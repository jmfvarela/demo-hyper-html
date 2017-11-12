import { hyper } from './node_modules/hyperhtml/index.mjs'; 
import { SamComponent } from './sam.js';

export class DemoComponent extends SamComponent {

    defineActions(actions, propose) { 
        actions.setTime = () => propose({newTime: new Date()})
        actions.tick = () => setTimeout(() => {actions.setTime()}, 1000)
    }

    init(model, actions) {
        actions.setTime()
    }

    updateModel(model, proposal) {
        model.hours = proposal.newTime.getHours()
        model.minutes = proposal.newTime.getMinutes()
        model.seconds = proposal.newTime.getSeconds()
    }

    nextAction(model, actions) {
        actions.tick()
    }

    render(model) {
        return this.html`
            <style>
            .even { color: blue }
            .odd { color: red }
            </style>
            <p>Hours: ${ model.hours }, Minutes: ${ model.minutes }, Seconds:
            ${  new Array(model.seconds).fill(0).map((v, i) => i + 1).map( second => `
                    <span class="${ second % 2 ? "even" : "odd" }">${ second } </span>
            `)}
            </p>
        `
    }
}

customElements.define('demo-component', DemoComponent);
