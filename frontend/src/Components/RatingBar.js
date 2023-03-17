// The rating bar itself 
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';

function RatingBar(props) {
    let variant = "success";
    if (props.rating) {
        const percent = (props.rating / 5) * 100;
        if (percent > 65 )
        {
            variant = "success";
        }
        else if (percent > 35 && percent < 65)
        {
            variant = "danger";
        }
        else
        {
            variant = "warning";
        }

        return(
            <div>
                <div>
                    <div>{props.title}</div>
                    <div>{props.rating}/5</div>
                </div>
                <ProgressBar now={percent} variant={variant} animated />
            </div>
        );
    } else {
        return(
            <div>
                <div>
                    <div>{props.title}</div>
                    <div>N/A</div>
                </div>
                <ProgressBar now={0} />
            </div>
        );
    }
} 
export { RatingBar };