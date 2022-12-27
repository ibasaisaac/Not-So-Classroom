import React, { useState } from 'react';

const MessagesPanel = props => {
    const [input_value, setInput_value] = useState('')
    const send = () => {
        if (input_value && input_value != '') {
            props.onSendMessage(props.channel.id, input_value);
            setInput_value('');
        }
    }

    const handleInput = e => {
        setInput_value(e.target.value)
    }

    let list = <div className="no-content-message">There is no messages to show</div>
    if (props.channel && props.channel.messages) {
        list = props.channel.messages.map(m =>
            <div className="message-item" key={m.id} id={m.id} >
                <div><b>{m.senderName}</b></div>
                <span>{m.text}</span>
            </div>
        )
    }

    return (
        <div className="messages-panel">
            <div className="meesages-list">{list}</div>
            {props.channel &&
                <div className="messages-input">
                    <input type="text" onChange={handleInput} value={input_value} />
                    <button onClick={send}>Send</button>
                </div>
            }
        </div>
    );
}
export default MessagesPanel;