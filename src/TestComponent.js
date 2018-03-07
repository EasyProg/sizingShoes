/**
 * Created by Михаил on 06.03.2018.
 */
import React, {Component} from 'react';
export default class TestComponent  extends Component {
    constructor(props) {
       super(props);
       this.state={shit:false};
    }
    rearm () {
           this.setState({shit:true});
    }

    render() {

        return (
            <div onClick={()=>{this.rearm()}}>
                Shit
            </div>
               )
             }
}