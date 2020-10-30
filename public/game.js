(() => {
    const socket = io();
    class GameStart {
        
        movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        constructor() {
            socket.on('state', (data) => {
                //console.log(data);
            });

            this.initDocumentEvents('keyup', false);
            this.initDocumentEvents('keydown', true);
            this.initSocketEvents();
        }

        initDocumentEvents = (direction, active) => {
            document.addEventListener(direction, (event) => {
                switch (event.keyCode) {
                    case 65:
                        this.movement.left = active;
                        break;
                    case 87:
                        this.movement.up = active;
                        break;
                    case 68:
                        this.movement.right = active;
                        break;
                    case 83:
                        this.movement.down = active;
                        break;
                }
            });
        }

        initSocketEvents = () => {
            socket.emit('new player');
            setInterval(() => {
                socket.emit('movement', this.movement);
            }, 1000 / 60);
        }
    }

    new GameStart();
})();