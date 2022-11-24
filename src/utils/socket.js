import { io } from 'socket.io-client'
const socket = io.connect('http://10.133.203.243:4001')
export default socket
