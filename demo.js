import { hyper } from './node_modules/hyperhtml/index.mjs'; 
import { SamComponent } from './sam.js';

export class DemoComponent extends SamComponent {

    defineActions(actions, propose) { 
        actions.setTime = () => propose({time: new Date()})
        actions.reset = () => propose({time: new Date(0, 0, 0, 0, 0, 0), users: null})
        actions.tick = () => propose({tick: 1})
        actions.loadUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
                                  .then(res => res.json())
                                  .then(users => propose({users}))
        actions.log = (str) => console.log(str)
    }

    init(model, actions) {
        actions.reset()
        setInterval(actions.tick, 1000)
    }

    updateModel(model, proposal) {
        if (proposal.users !== undefined) {
            model.users = proposal.users
        }
        if (proposal.tick) {
            proposal.time = new Date(0, 0, 0, model.hours, model.minutes, model.seconds + 1)
        }
        if (proposal.time) {
            model.hours = proposal.time.getHours()
            model.minutes = proposal.time.getMinutes()
            model.seconds = proposal.time.getSeconds()
        }
    }

    nextAction(model, actions) {
        if (model.seconds >= 3 && !model.users) actions.loadUsers()
    }

    render(model, actions, html) {
        return html`
            <style>
            .even { color: blue }
            .odd { color: red }
            </style>
            <button onclick=${(e) => actions.reset() }>Reset</button>
            <button onclick=${(e) => actions.setTime() }>Set time</button>
            <p>Hours: ${ model.hours }, Minutes: ${ model.minutes }, Seconds:
                ${ new Array(model.seconds).fill(0).map((v, i) => i + 1).map(second => `
                <span class="${ second % 2 ? "even" : "odd" }">${ second } </span>
                `)}
            </p>
            ${ model.users ? html`
            <ul>
                ${ model.users.map(user => `
                <li>${ user.name }</li>
                `)}
            </ul>
            ` : html`
            <span>Users pending to load</span>
            `}
        `
    }
}

customElements.define('demo-component', DemoComponent);
