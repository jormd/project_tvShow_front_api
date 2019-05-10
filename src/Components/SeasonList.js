import React, {Component} from "react";
import ListEpisode from "./ListEpisode";

class SeasonList extends Component {
    constructor(props) {
        super(props);

        let self = this;

        this.state = {
            episodes : this.props.episodes.map(function (episode, index) {
                return <ListEpisode idSerie={self.props.idSerie} name={episode['name']} see={episode['see']} id={episode['id']} episode={index+1} saison={self.props.nbSaison}  />
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
