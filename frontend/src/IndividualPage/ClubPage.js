// This would be the equivalent to frat 

/* 
Contains major components:
- ClubTitle
- ClubInfo 
	- RatingBar 
- instaEmbed 
- ReviewDisplay 
	- StarRating 
	- ReviewComponent 
*/

import '../App.css';
import React from 'react';
// import { ClubTitle } from "./Components/ClubTitle";
import { ClubInfo } from "../Components/ClubInfo";
import { ReviewDisplay } from "../Components/ReviewDisplay";
import 'bootstrap/dist/css/bootstrap.css';

/*		
		<>
			<div>
				<ClubInfo
                    data={fratInfo}
                    loading={loadingFrat}
                />
				<socialEmbed />
				<ReviewDisplay />
			</div>
		</>
*/
export default function ClubPage(){
	return(
		<div>
			<ClubInfo />
			<ReviewDisplay></ReviewDisplay>
		</div>
	);
}