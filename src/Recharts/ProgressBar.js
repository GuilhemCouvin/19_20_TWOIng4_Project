import React, {Component} from 'react';
import { Progress } from 'reactstrap';

class Bar extends Component {
    state={ 
        assid: this.props.data
    }

    render(){
        return (
            <div>
                <h3>Assiduité: {this.state.assid.name}</h3>
                <div className="text-center">{this.state.assid.nb} crédits utilisés sur {this.state.assid.lim} disponibles</div>
                <Progress animated color="danger" value={this.state.assid.nb} max={this.state.assid.lim} />
            </div>
        );
    } 
}

export default Bar;