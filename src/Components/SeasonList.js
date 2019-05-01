import React, {Component} from "react";
import ListEpisode from "./ListEpisode";

class SeasonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodes : this.props.episodes.map(function (episode) {
                return <ListEpisode name={episode['name']}/>
            })
        }
    }



    render() {
        return (
            <div class="saison" data-id={this.props.nbSaison}>
                <span>{this.props.nbEpisode} épisodes</span>
                {this.state.episodes }
            </div>

        );
    }
}

export default SeasonList;
