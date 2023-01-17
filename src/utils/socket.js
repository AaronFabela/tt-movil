import { io } from 'socket.io-client'
const socket = io.connect('http://192.168.6.215:4001')
export default socket
