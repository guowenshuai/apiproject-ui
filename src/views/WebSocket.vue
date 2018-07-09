<template>
    <div class="websocket">
        <h2> this is webSocket chat room</h2>

        <input type="text" v-model.number="uid" placeholder="input you uid">
        <button v-on:click="conn()" v-bind:disabled="status === 'online'">connect webSocket</button>
        <label>{{status}}</label>

        <input type="text" id="msg-input" v-model="sendmsg" placeholder="send message">
        <button v-on:click="sendMessage()" v-bind:disabled="status === 'offline'">send message</button>
        <button v-on:click="disconn()" v-bind:disabled="status === 'offline'">disconn</button>

        <div class="history">
            <textarea v-model="textlines" placeholder="add multiple lines"></textarea>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      uid: '',
      status: 'offline',
      sendmsg: String(),
      socket: null,
      textlines: String()

    }
  },

  methods: {
    conn: function () {
      this.socket = new WebSocket('ws://127.0.0.1:38080/v1/ws/' + this.uid)
      // Message received on the socket
      this.socket.onopen = (ev) => {
        this.status = 'online'
      }
      this.socket.onmessage = (event) => {
        var data = JSON.parse(event.data)
        console.log(data)
        let msg = ''
        switch (data.Type) {
          case 0: // message
            msg = data.Uid + ': ' + data.Content + '\n'
            this.textlines += msg
            break
          case 1: // join
            msg = data.Uid + ' join' + '\n'
            this.textlines += msg
            break
          case 2: // Leave
            msg = data.Uid + ' leave' + '\n'
            this.textlines += msg
            break
        }
      }
      this.socket.onclose = (event) => {
        this.status = 'offline'
      }
    },

    disconn: function () {
      this.socket.close()
    },

    sendMessage: function () {
      this.socket.send(this.sendmsg)
    }
  }
}

</script>

<style scoped>
    textarea {
        width: 80%;
        height: 400px;
        background: gainsboro;
    }

    .websocket button {
        width: 150px;
    }
    .websocket label {
        width: 250px;
        margin-left: 10px;
        margin-right: 10px;
        background: lightsteelblue;
    }
</style>
