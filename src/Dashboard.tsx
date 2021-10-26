import React, {useEffect} from 'react';


import {CTX, Msg, MsgContext} from './Store'



export default function Dashboard() {

    const {msgState, sendChat, user} = React.useContext(CTX);

   useEffect(() => {
       console.log(msgState)
   }, [msgState])

    const topics = Object.keys(msgState);

    const [activeTopic, changeActiveTopic] = React.useState<string>(topics[0]);
    const [textValue, changeTextValue] = React.useState<string>('');

    return (
        <div>
            <div className={"root"}>

                <h4 className="h4">
                    Chat App
                </h4>
                <h5 className="h5">
                    {activeTopic}
                </h5>
                <div className={"flex"}>
                    <div className={"topicsWindow"}>
                        <ul className="topicsList">

                            {
                                topics.map(topic=> (
                                    <div className="listItemButton" role="button" aria-disabled="false" onClick={e => changeActiveTopic((e.target as HTMLElement).innerText)} key={topic} >
                                        <div className="listItemTextContainer">
                                            <span className="listItemText">{topic}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={"chatWindow"}>
                        {
                            msgState[activeTopic].map((chat: Msg, i: number ) => (
                                <div className={"flex"} key={i}>
                                    <div className={"chip"}>
                                        <span className={"chipLabel"}>{chat.from}</span>
                                    </div>
                                    <p className="chatText">{chat.msg}</p>
                                </div>
                            ))
                        }
                    </div>
                    </div>
                <div className={"flex"}>
                    <div className="chatBoxInputContainer">
                        <label className="chatBoxInputLabel">Send a chat</label>
                        <div className="chatBoxInputFormControl">
                            <input aria-invalid="false" type="text"
                                   className="chatBoxInputForm"
                                   value={textValue}
                                    onChange={e => changeTextValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className={"chatButton"}
                        onClick={() => {
                            sendChat({from: user, msg: textValue, topic: activeTopic});
                            changeTextValue('');
                        }}
                    >
                        <span className={"buttonLabel"}>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}