import React, {Component} from "react";

class ListEpisode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="episode">
                <p>{this.props.name}</p>
            </div>

        );
    }
}

export default ListEpisode;
