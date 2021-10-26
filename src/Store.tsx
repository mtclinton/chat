import * as React from "react";
import { Server, Socket } from "socket.io";
import { io } from "socket.io-client";
import {useReducer} from "react";


// interface for payload
interface MsgPayload {
    from: string
    msg: string
    topic: string
}

// An interface for our actions
interface MsgAction {
  type: string;
  payload: MsgPayload;
}

// interface for msg
export interface Msg {
    from: string
    msg: string
}

// An interface for our state topics is a key
interface MsgState {
  [topics: string]: Msg[]
}

const initState = {
    general: [
        {from: 'matt', msg: 'hows the weather'},
        {from: 'bob', msg: 'pretty bad'},
        {from: 'matt', msg: 'that sucks'},
    ],
    topic2: [
        {from: 'matt', msg: 'hi'},
        {from: 'bob', msg: 'whats up'},
        {from: 'matt', msg: 'not much'},

    ]
}

function reducer(state: MsgState, action: MsgAction): MsgState {
    const {from, msg, topic} = action.payload;

    switch (action.type) {
        case 'RECEIVE_MESSAGE':

            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            } as MsgState;

        default:
            return state
    }
}

let socket = io('ws://localhost:5000', {transports: ['websocket']});
socket.on("connect", () => {
  console.log(socket.connected); // true
});


export interface MsgContext {
    msgState: MsgState
    sendChat: Function
    user: string

}

export const CTX = React.createContext<MsgContext>({
    msgState: {},
    sendChat: ()=>{},
    user: ''
});

type Props = {
  children: React.ReactNode;
};

export default function Store({ children }: Props) {

    const [allChats, dispatch] = useReducer(reducer, initState);

    if(!socket) {
        socket = io('ws://localhost:5000', {transports: ['websocket']});

    }

    function sendChatAction(value: MsgPayload) {
        socket.emit('chatmessage', value);
        console.log('sending '+value);
        dispatch({type: 'RECEIVE_MESSAGE', payload: value});
    }

    const user = 'brian'+Math.random().toFixed(2);

    let msgContext: MsgContext = {
        msgState:allChats,
        sendChat: sendChatAction,
        user: user
    }

    return (
        <CTX.Provider value={msgContext}>
            {children}
        </CTX.Provider>
    )
}