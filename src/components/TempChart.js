import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'

export default class TempChart extends Component {    

    constructor(props) {
        super(props)
    
        this.state = {
             chartData: {
                 labels: this.props.dates,
                 datasets: [
                        {
                            label: 'Min',
                            data: this.props.minTemp,
                            backgroundColor: ['rgb(247, 224, 224)']
                        },
                        {
                            label: 'Max',
                            data: this.props.maxTemp,
                            backgroundColor: ['#dc3545']
                        }
                    ]
             }
        }
    }
    

    render() {
        return (
            <div className="m-xl-5 mt-5 p-4 mb-5 chart-holder">
                <Line
                  data={this.state.chartData}
                   options={{
                       title: {
                           display: true,
                            text: 'Temperature Chart',
                            fontSize: 20,
                            fontColor: '#000'
                       }
                   }}
                ></Line>
            </div>
        )
    }
}
