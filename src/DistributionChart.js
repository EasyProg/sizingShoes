/**
 * Created by Михаил on 05.03.2018.
 */
import React, {Component} from 'react';
import foot from './img/Foot.gif';
import foot_woman from './img/Woman_Foot.gif';
import './style/DistributionChart.css';
export default class DistributionChart extends Component
{
    constructor(props){
        super(props);
        this.state = {
            link:'',
            prev:'',
            filter:{onlyWide:false,onlyLength:false}
                     }
                     }
    getData(nextPage)
                     {
        let headers = new Headers();
        let url = 'https://homeexercise.volumental.com/sizingsample';
        url = nextPage?`https://homeexercise.volumental.com/sizingsample?page=${nextPage}`:url;
        let username = 'admin';
        let password = 'ToPsEcReT';
        let arr = [];
        let wd = [];
        let lst = [];
        var b = this;
        headers.append('Authorization','Basic '+btoa(username+':'+password));
        fetch(url,{method:'GET',headers}).then((res)=>

        {
            if (res.status!==200) {
                return;
            }
            res.json().then(
            (data)=>
            {   let sizes = data.data[0].sizes;
                let system = data.data[0].system;
                let gender = data.data[0].gender;
                for (var key in sizes)
                                        {
                    arr.push(Number(key));
                    wd.push (sizes[key]);
                                        }
                wd.forEach((item)=>
                {
                const sorted = Object.keys(item).map
                (function (key){return [key,this[key]]},item).sort
                (function (a,b){return a[1]-b[1]});
                lst.push(sorted);});
                b.setState(

                            function(prevState) {return {link: data['next-page'],
                            system:system,
                            gender:gender,
                            sizes:arr.sort((a,b)=>{if (a>b) return -1; else return 1}),
                            sizeWide:lst,
                            // filter:{onlyWide:false,onlyLength:false},
                            prev:prevState
                            }}
                            );
            });
        });
    }

    componentDidMount() {
        this.getData();
                        }

    render ()   {
        //const Fragment = React.Fragment;
        return  (<div className="chartContainer">
                 <div>{this.state.system}</div>
                 <div>
                     <div className={!this.state.filter.onlyWide?"sizesLength":"sizesLengthNone"}>
                         {this.state.sizes?this.state.sizes.map((item,i)=><div key={i}>{item}</div>):null}
                        {/*<div/>*/}
                     </div>
                     <div className="chartSizesCont">
                         {this.state.gender==='Men'?<img src={foot} className="foot"/>:<img src={foot_woman} className="foot"/>}
                         <div className={!this.state.filter.onlyLength?"chartSizesWide":"chartSizesWideNone"}>
                             {this.state.sizeWide?this.state.sizeWide.map((item,i)=><div key={i}>
                                     {item.map((it,i)=><div>{it[0]}</div>)}

                                 </div>):null}
                         </div>
                     </div>
                     <div className="prevNextDiv">
                         <button onClick={e=>this.getData(this.state.link)}>Next >></button>
                         {this.state.prev&&this.state.prev.link?
                         <button onClick={e=>this.setState(this.state.prev)}>&#060;&#060; Prev</button>
                         :null}
                     </div>
                 </div>
                <div     className="filterButtons">
                <button  className={this.state.filter.onlyWide?"filterButtonAct":"filterButton"}
                         onClick={e=>this.setState({filter:{onlyWide:!this.state.filter.onlyWide}})}>Only Wide</button>
                <button  className={this.state.filter.onlyLength?"filterButtonAct":"filterButton"}
                         onClick={e=>this.setState({filter:{onlyLength:!this.state.filter.onlyLength}})}>Only Width</button>
                </div>
                </div>
                )
                }
}