import { Manager, Socket } from "socket.io-client"

let socket: Socket
export const connectToServer = (token: string) => {
    const manager = new Manager("https://nest-ecommerce-postgres.onrender.com/socket.io/socket.io.js", {
        extraHeaders: {
            authentication: token
        }
    })
    socket?.removeAllListeners()
    socket = manager.socket("/")

    addListener()
}

const addListener = () => {
    //clients-ul
    const clientsUl = document.querySelector("#clients-ul")!
    const messageForm = document.querySelector<HTMLFormElement>("#message-form")!
    const messageInput = document.querySelector<HTMLInputElement>("#message-input")!
    const messagessUl = document.querySelector("#messages-ul")!
    const serverStatusLabel = document.querySelector("#server-status")!//(!)siempre va a existir

    socket.on("connect", () => {
        serverStatusLabel.innerHTML = "conectado"
        console.log("connected")
    })
    socket.on("disconnect", () => {
        serverStatusLabel.innerHTML = "desconectado"
        console.log("disconnected")
    })
    socket.on("clientes-updated", (clients: string[]) => {
        let clienteHtml = ""
        clients.forEach(clientId => { clienteHtml += `<li>${clientId}</li>` })
        clientsUl.innerHTML = clienteHtml

    })
    messageForm.addEventListener("submit", event => {
        event.preventDefault()
        if (messageInput.value.trim().length <= 0) return
        socket.emit("message-from-client", {
            message: messageInput.value
        })
        messageInput.value = ""
    })
    socket.on("messages-from-server", (payload: { fullName: string, message: string }) => {
        let newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span span > ${payload.message} </span>
            </li>
                `
        const li = document.createElement("li")
        li.innerHTML = newMessage
        messagessUl.append(li)
    })

}
//localhost:3000/socket.io/socket.io.js