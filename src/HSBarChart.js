import React from 'react';
import HSBar from "react-horizontal-stacked-bar-chart";
export default class HSBarChart extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        console.log(this.props)
        return (
            <div><HSBar data={[{ value: this.props.value1,color: "skyblue" }, { value: this.props.value2,color:"orange" }]} />
            </div>
        )
    }
}