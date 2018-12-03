import React, { Component } from 'react';

export default class CurrentDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(()=>{
            this.getDate()
        },1000)
    }

    componentWillUnmount() {
        if (this.timerID) {
            clearInterval(this.timerID)
        }
    }

    getDate() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>{ this.state.date.getFullYear() }年{ this.state.date.getMonth()+1 }月{ this.state.date.getDate() }日{ this.state.date.toLocaleTimeString() }</div>
        )
    }
}
