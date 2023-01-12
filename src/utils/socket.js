import { io } from 'socket.io-client'
const socket = io.connect('http://192.168.146.215:4001')
export default socket
