const socket = io();


const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendBtn = document.querySelector('.send-button');

const send = () => {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit('chatting', param);
    chatInput.value = "";
}

chatInput.addEventListener('keypress',(e) => {
    if(e.keyCode === 13){
        send();
    }
})

sendBtn.addEventListener('click',send)


socket.on('chatting', (data)=>{
    const {name, msg, time} = data;
   const item = new LiModel(name, msg, time);
   item.makeLi();
   
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement('li');
        li.classList.add(nickname.value === this.name ? 'sent' : 'received')
        const dom = `                    
        <div class="user">
        ${name}
    </div>
    <span class="message">${msg}</span>
    <span class="time">${time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
}

console.log(socket)