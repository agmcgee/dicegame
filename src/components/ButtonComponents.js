import React from 'react'

class ButtonComponents extends React.Component {
    render () {
        return (
            <div className="button">
                <button name="roll" onClick={e => this.props.onClick(e.target.name)}>Roll!</button>
                <button name="stay" onClick={e => this.props.onClick(e.target.name)}>Stay</button>
                <button name="play again" onClick={e => this.props.onClick(e.target.name)}>New Match</button>
            </div>
        );
    }
}

export default ButtonComponents;