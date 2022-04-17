import React, { useEffect } from "react";
import { Terminal } from "xterm";
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links"
import { Unicode11Addon } from "xterm-addon-unicode11"
import { SerializeAddon } from "xterm-addon-serialize"

// class DockerTerminal extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             containers: null
//         }
//     }

//     render() {
//         return (
//             <div>Loading ...</div>
//         )
//     }
// }

function TerminalComponent(props) {
    console.log(props.containers)

    useEffect(() => {

        var terminal = new Terminal({ rendererType: "canvas", convertEol: true, cursorBlink: true, cursorStyle: "block" });
        terminal.open(document.getElementById("terminal"))

        const protocol = (location.protocol === "https:") ? "wss://" : "ws://";
        const url = protocol + `localhost:2375/containers/${props.containers[0].Id}/attach/ws`
        const socket = new WebSocket(url);


        const attachAddon = new AttachAddon(socket);
        const fitAddon = new FitAddon()

        const webLinksAddon = new WebLinksAddon()
        terminal.loadAddon(webLinksAddon);

        const unicode11Addon = new Unicode11Addon()
        terminal.loadAddon(unicode11Addon)

        const serializeAddon = new SerializeAddon();
        terminal.loadAddon(serializeAddon);

        socket.onclose = function (event) {
            console.log(event);
            terminal.write('\r\n\nconnection has been terminated from the server-side (hit refresh to restart)\n')
        };
        socket.onopen = function () {
            terminal.loadAddon(attachAddon);
            terminal.focus();
            setTimeout(function () { fitAddon.fit() });
            terminal.onResize(function (event) {
                var rows = event.rows;
                var cols = event.cols;
                var size = JSON.stringify({ cols: cols, rows: rows + 1 });
                var send = new TextEncoder().encode("\x01" + size);
                console.log('resizing to', size);
                socket.send(send);
            });
            terminal.onTitleChange(function (event) {
                console.log(event);
            });
            window.onresize = function () {
                fitAddon.fit();
            };
        };
    }, []);


    return (
        <div>
            <div id="terminal" className="terminal" />
        </div>

    );
}

export default TerminalComponent;
