import "./styles.css";

import PartySocket from "partysocket";

declare const PARTYKIT_HOST: string;

// A PartySocket is like a WebSocket, except it's a bit more magical.
// It handles reconnection logic, buffering messages while it's offline, and more.
const conn = new PartySocket({
  host: PARTYKIT_HOST,
  room: "aduk-bubur",
});

const toggle = document.querySelector(".toggle-switch");
const aduk = document.getElementById("aduk") as HTMLInputElement;
const pisah = document.getElementById("pisah") as HTMLInputElement;
const bg = document.getElementById('background') as HTMLDivElement;
let itwasme = false;

console.log("toggle", toggle);

conn.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  console.log("receive", message, "from", itwasme ? "me" : "them");
  if ("aduk" in message) {
    itwasme = message.sender === conn.id;
    if (message.aduk) {
      aduk.checked = true;
      bg.style.backgroundImage = 'url("/bubur-diaduk.jpeg")'
    } else {
      pisah.checked = true;
      bg.style.backgroundImage = 'url("/bubur-topping.webp")'
    }
  }
});

// Click directly on the switch. Toggle the value.
toggle?.addEventListener("click", () => {
  console.log("send", !aduk.checked);
  conn.send(JSON.stringify({ aduk: !aduk.checked }));
});

// Click on label or use keyboard/screen reader to change selection.
aduk?.addEventListener("change", () => {
  console.log("send", aduk.checked);
  conn.send(JSON.stringify({ aduk: aduk.checked }));
});
