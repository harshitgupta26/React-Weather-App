import React, { Component } from 'react'

export default class WeatherCard extends Component {

    render() {
        const {weatherData, minTemp, maxTemp} = this.props;
        let unix_timestamp = weatherData.dt;
        let date = new Date(unix_timestamp * 1000);

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

        const src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`

        return (

            <div className="card text-center weather-card p-3" >
                <div className="card-body p-0">
                    <div className="front">
                        <h5 className="card-title border-bottom pb-2">{date.getDate() + ' ' + month[date.getMonth()]}</h5>
                        <h6 className="text-danger font-weight-bold">{day[date.getDay()]} ({(weatherData.main.temp - 273).toFixed(1)}&#176;)</h6>
                        <img src={src} alt="..." />
                        <h6><span>{weatherData.weather[0].main}</span></h6>
                        <div className="d-flex justify-content-around font-weight-bold">
                            <div><i className="fa fa-arrow-down text-danger"></i>{minTemp}&#176;</div>
                            <div><i className="fa fa-arrow-up text-danger"></i>{maxTemp}&#176;</div>
                        </div>
                    </div>
                    <div className="back font-weight-bold">
                        <h5 className="card-title border-bottom pb-2">{date.getDate() + ' ' + month[date.getMonth()]}</h5>
                        <div><span className="text-danger">Des: </span>{weatherData.weather[0].description}</div>
                        <div><span className="text-danger">Humidity: </span>{weatherData.main.humidity}</div>
                        <div><span className="text-danger">Wind: </span>{weatherData.wind.speed} mph</div>
                    </div>
                </div>
            </div>
        )
    }
}
