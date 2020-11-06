import React, { Component } from 'react'

export default class WeatherCard extends Component {

    // moreInfo(e) {
    //     if(e.target.parentElement.parentNode.childNodes[2].style.display == 'block') {
    //         e.target.parentElement.parentNode.childNodes[2].style.display = 'none'
    //     } else {
    //         e.target.parentElement.parentNode.childNodes[2].style.display = 'block'
    //     }
    // }

    render() {
        const data = this.props.weatherData;

        let unix_timestamp = data.dt;
        let date = new Date(unix_timestamp * 1000);

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

        const src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`

        return (

            <div className="card text-center weather-card p-3" >
                <div className="card-body p-0">
                    <div className="front">
                        <h5 className="card-title border-bottom pb-2">{date.getDate() + ' ' + month[date.getMonth()]}</h5>
                        <h6 className="text-danger font-weight-bold">{day[date.getDay()]} ({(data.main.temp - 273).toFixed(1)}&#176;)</h6>
                        <img src={src} alt="..." />
                        <h6><span>{data.weather[0].main}</span></h6>
                        <div className="d-flex justify-content-around font-weight-bold">
                            <div><i className="fa fa-arrow-down text-danger"></i>{(data.main.temp_min - 273).toFixed(1)}&#176;</div>
                            <div><i className="fa fa-arrow-up text-danger"></i>{(data.main.temp_max - 273).toFixed(1)}&#176;</div>
                        </div>
                    </div>
                    <div className="back font-weight-bold">
                        <h5 className="card-title border-bottom pb-2">{date.getDate() + ' ' + month[date.getMonth()]}</h5>
                        <div><span className="text-danger">Des: </span>{data.weather[0].description}</div>
                        <div><span className="text-danger">Humidity: </span>{data.main.humidity}</div>
                        <div><span className="text-danger">Wind: </span>{data.wind.speed}mph</div>
                    </div>
                </div>

                {/* <div className="more-info mt-4 border-top" id={this.props.index}>
                    <h5 className="text-danger">More Info</h5>
                    <div><span className="font-weight-bold">Wind Speed: </span>{data.wind.speed}kmph</div>
                    <div><span className="font-weight-bold">Min. Temp: </span>{(data.main.temp_min - 275).toFixed()}&#176;</div>
                    <div><span className="font-weight-bold">Max. Temp:</span> {data.main.temp_max} Kelvin</div>
                </div> */}

            </div>
        )
    }
}
