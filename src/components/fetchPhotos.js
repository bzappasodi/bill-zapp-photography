import React, {Component} from 'react';


class PhotoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };
    }


    fetchPhotos = async () => {
        try {

            const response = await
                fetch('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=f4c5d0b8e1a8205f40a151b728934793&photoset_id=72157672161775757&user_id=84086059%40N00&format=rest&auth_token=72157674482529887-dcbed5f777a65a69&api_sig=3ccd7e92a1e1f41f355ab328eee8a1f5')
            if (!response.ok) {
                throw Error(response.statusText);
            }

            const json = await response.json();
            this.setState({photos: json._embedded.photos});

        } catch (error) {
            console.log("ERROR:: " + error);
        }

    }

    componentWillMount() {
        const QUERY = 'flickr.photosets.getPhotos&api_key=0bfdec570e0b535a4b59707cd4e6c30b&photoset_id=72157672161775757&user_id=84086059%40N00&format=json&nojsoncallback=1&auth_token=72157674605766707-38fb0da04ed6ea47&api_sig=946720969cd246eb1d6c82a0242c3ff9';
        const API = 'https://api.flickr.com/services/rest/?method=';
        fetch(API + QUERY)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({photos: data.photoset.photo})
            });

    }

    componentWillUpdate() {
        console.log('updating lifecycle')
    }

    render() {
        const {photos} = this.state;
        return (
            <div className="App">
                <ul>
                    {photos.map(picture =>
                        <li key={picture.id}>
                            {/*{picture.id}*/}
                            <img src="https://c2.staticflickr.com/2/1932/${picture.id}_fc7025fca0.jpg"/>
                        </li>
                    )}
                </ul>

            </div>
        );
    }
}

export default PhotoList;