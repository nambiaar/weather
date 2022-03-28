import './Card.scss';
import { CURRENT_DATA, FORECAST_DATA } from "../constants";


const Card = (props) => {
    const { description, data, size } = props;
    let content = null;
    let dateVal = null;
    let icon = "";
    let condition = {};
    if (data) {
        switch (description) {
            case CURRENT_DATA: {
                ({ condition } = data);
                content = <div className="current-condition">{data.temp_f} &deg;F</div>;
                dateVal = <div className="date">Today</div>;
                break;
            }
            case FORECAST_DATA: {
                ({ condition } = data[0]?.day);
                const { maxtemp_f, mintemp_f } = data[0]?.day
                content = (
                    <>
                        <div className="max-temp">Max: {maxtemp_f} &deg;F</div>
                        <div className="min-temp">Min: {mintemp_f} &deg;F</div>
                    </>
                );
                dateVal = <div className="date">{data[0]?.date}</div>;
                break;
            }
            default: {
                break;
            }
        }
        icon = condition?.icon;
    }
    return (
        <div className={`card ${size}`}>
            {dateVal}
            <img src={icon} alt={condition?.text} />
            <h3>{condition?.text}</h3>
            <div className="content">
                {content}
            </div>
        </div>
    );
}

export default Card;