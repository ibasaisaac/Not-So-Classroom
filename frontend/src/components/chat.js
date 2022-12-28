import React, { useEffect, useState } from 'react';
import socketClient from "socket.io-client";

import ChannelList from './channelList.js';
import MessagesPanel from './messagePanel.js';
import '../static/chat.css';


const Chat = () => {

    const [channels, setChannels] = useState([]);
    const [channel, setChannel] = useState();
    const [socket, setSocket] = useState('');

    useEffect(() => {
        loadChannels()
        configureSocket()
    },);

    const configureSocket = () => {
        var socket = socketClient("http://127.0.0.1:5000");

        socket.on('connection', () => {
            if (channel) {
                handleChannelSelect(channel.id);
            }
        });

        socket.on('channel', channel => {
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setChannels(channels);
        });

        socket.on('message', message => {
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setChannels(channels);
        });
        setSocket(socket);
    }


    const loadChannels = async () => {
        fetch('http://localhost:5000/getChannels')
            .then(async response => {
                let data = await response.json();
                setChannels(data.channels);
            })
    }
    const handleChannelSelect = id => {
       
        let channel = channels.find(c => {
            return c.id === id;
        });
        setChannel(channel);
        socket.emit('channel-join', id, ack => {
        });
    }
    const handleSendMessage = (channel_id, text) => {
        socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
    }


    if (!channels)
        return <div style={{ textAlign: 'center', lineHeight: '600px' }}><i className="fa-regular fa-circle fa-beat fa-3x"></i><i className="fa-solid fa-circle fa-beat fa-3x"></i><i className="fa-regular fa-circle fa-beat fa-3x"></i></div>
    return (
        <div className="chat-app">
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect}></ChannelList>
            <MessagesPanel onSendMessage={handleSendMessage} channel={channel} />
        </div>
    )
}
export default Chat;
