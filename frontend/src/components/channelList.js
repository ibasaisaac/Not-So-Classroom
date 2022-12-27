import React from 'react';

const ChannelList = props => {

    const handleClick = id => {
        props.onSelectChannel(id);
    }
    let list = <div className="no-content-message">There is no channels to show</div>;
    return (
        <div className="channel-list">
            {props.channels &&
             props.channels.map(c =>
                    <div className="channel-item" key={c.id} id={c.id} onClick={()=>{handleClick(c.id)}}>
                        <div>{c.name}</div>
                        <span>{c.participants}</span>
                    </div>
                )
            }
        </div>
    )
}
export default ChannelList