import React, { Component } from 'react'
import TempChart from './TempChart';
import WeatherCard from './WeatherCard';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            data: null,
            city: "Pune",
            days: 5,
            dates: [],
            minTemp: [],
            maxTemp: []
        }
    }

    async callAPi(city="Pune", days=5) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b130ac7ace2e76a716cb361030da5ad0&cnt=${days*8}`;

        const response = await fetch(url);  
        const data = await response.json();
        if(data.cod != '200') {
            alert('Wrong City Entered!!!')
        } else {
            this.setChartData(data)
            // this.setState({
            //     data: data
            // })
        }
        
    }

    setChartData = (data) => {
        this.setState({
            data: null,
            dates: null,
            minTemp: null,
            maxTemp: null
        })
        const date = []
        const min = []
        const max = []
        data.list.map((item, index)=>{
            if(index%8 === 0) {
                date.push(item.dt_txt.split(' ')[0])
                min.push((item.main.temp_min-275).toFixed(1))
                max.push((item.main.temp_max-275).toFixed(1))
            }
        })
        this.setState({
            data: data,
            dates: date,
            minTemp: min,
            maxTemp: max
        })
    }

    async componentDidMount() {
        this.callAPi();
    }

    getData = () => {
        const enteredCity = document.getElementById('City').value
        const enteredDays = document.getElementById('Days').value
        this.callAPi(enteredCity, enteredDays);
        this.setState({city: enteredCity, days: enteredDays})
    }

    render() {
        const { data, dates, minTemp, maxTemp } = this.state;
        if (data) {
            return (
                <div>
                    <div className="header p-2">
                        <h3 className="container text-center">Weather App</h3>
                    </div>
                    <div className="container">

                        <div className="d-flex justify-content-center my-4">
                            <div className="form-inline text-white" style={{fontSize: '14px'}}>
                                <div className="form-group">
                                    <label htmlFor="City" className="text-danger">City</label>
                                    <input type="text" className="custom-inp" id="City" placeholder="Enter City" defaultValue={this.state.city}/>
                                </div>
                                <div className="form-group ml-5">
                                    <label htmlFor="Days" className="text-danger">Days</label>
                                    <select type="text" className="custom-inp" id="Days" placeholder="Days" defaultValue={this.state.days}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <button className="btn btn-sm btn-danger ml-5" onClick={this.getData}>Get Data</button>
                            </div>
                        </div>

                        <div className="text-danger text-center">Location: <span className="text-white">{this.state.city}</span></div>
                        <div className="row justify-content-center">
                            {data.list.map((item, index) => 
                                index%8 == 0 ? <div className="col-md-4 col-xl-2 mt-4 card-container" key={index}>
                                    <WeatherCard weatherData={item} index={index}></WeatherCard>
                                </div> : ''
                            )}  
                        </div>

                        <TempChart dates={dates} minTemp={minTemp} maxTemp={maxTemp}></TempChart>

                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3 className="text-center text-white">Loading...</h3>
                </div>
            )
        }
    }
}
