import { hyper } from './node_modules/hyperhtml/index.mjs'; 
import { SamComponent } from './sam.js';

export class DemoComponent extends SamComponent {

    defineActions(actions, propose) { 
        actions.setTime = () => propose({time: new Date()})
        actions.reset = () => propose({time: new Date(0,0,0,0,0,0,0)})
        actions.tick = () => propose({tick: 1})
        actions.log = (str) => console.log(str)
    }

    init(model, actions) {
        actions.setTime()
        setInterval(actions.tick, 1000)
    }

    updateModel(model, proposal) {
        if (proposal.time) {
            model.hours = proposal.time.getHours()
            model.minutes = proposal.time.getMinutes()
            model.seconds = proposal.time.getSeconds()
        }
        else if (proposal.tick) {
            let time = new Date()
            time.setHours(model.hours)
            time.setMinutes(model.minutes)
            time.setSeconds(model.seconds + 1)
            model.hours = time.getHours()
            model.minutes = time.getMinutes()
            model.seconds = time.getSeconds()
        }
        console.log(model)
    }

    nextAction(model, actions) {
    }

    render(model, actions) {
        return this.html`
            <style>
            .even { color: blue }
            .odd { color: red }
            </style>
            <button onclick=${(e) => actions.reset() }>Reset</button>
            <button onclick=${(e) => actions.setTime() }>Set time</button>
            <p>Hours: ${ model.hours }, Minutes: ${ model.minutes }, Seconds:
            ${  new Array(model.seconds).fill(0).map((v, i) => i + 1).map( second => `
                    <span class="${ second % 2 ? "even" : "odd" }">${ second } </span>
            `)}
            </p>
        `
    }
}

customElements.define('demo-component', DemoComponent);
