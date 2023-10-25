import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div>
    <h1>Cliente - WebSocket</h1>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <br/>
    <span id="server-status">offline</span>
    
    <ul id="clients-ul"></ul>

    <form id="message-form">
        <input placeholder="message" id="message-input" />
    </form>
     <h4>Mensajes</h4>
    <ul id="messages-ul"></ul>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!
const btnConnect = document.querySelector("#btn-connect")!

btnConnect.addEventListener("click", () => {
  if (jwtToken.value.trim().length <= 0) return alert("Ingrese un token valido")
  connectToServer(jwtToken.value.trim())
})
