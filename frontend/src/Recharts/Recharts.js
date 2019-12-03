import React, { Component } from 'react';
import './Recharts.css';
import { 
    LineChart, 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip 
} from 'recharts';



export default class Widget extends Component {
    state = {
        list: this.props.data
    };

    render() {
        const { list } = this.state;
        return (
            <div className="container">
                <h6 style={{color:'white'}}>Evolution des notes:</h6>
                <LineChart 
                    width={550} 
                    height={200} 
                    data={list} 
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                <Line type="monotone" dataKey="maths" stroke="#8884d8" />
                <Line type="monotone" dataKey="physics" stroke="#40A497" />
                <CartesianGrid stroke="white" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                </LineChart>
            </div>
        );
    }
}
