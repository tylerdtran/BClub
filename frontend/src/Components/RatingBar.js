// The rating bar itself 
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';

function RatingBar(props) {
    if (props.rating) {
        const percent = (props.rating / 5) * 100;
        return(
            <div>
                <div>
                    <div>{props.title}</div>
                    <div>{props.rating}/5</div>
                </div>
                <ProgressBar now={100} animated />
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