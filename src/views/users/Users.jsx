import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import Loader from '../../components/Loader';
import AlbumDrawer from '../../components/AlbumDrawer';
import Alert from '../../components/Alert';
import UsersList from '../../components/UsersList';

export class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      users: {
        data: [],
        fetching: true,
        errored: false,
      },
      albums: {
        data: [],
        fetching: false,
        errored: false,
      },
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchAlbums = this.fetchAlbums.bind(this);
    this.fetchAlbumPhotos = this.fetchAlbumPhotos.bind(this);
  }

  componentWillMount() {
    this.fetchUsers();
  }

  /**
   * Fetches users from API
   * @return {Promise}
   */
  fetchUsers() {
    const endPoint = `${PHOTOS_API}/users`;

    return axios.get(endPoint).then((res) => {
      // fetch albums for first user
      this.fetchAlbums(res.data[0].id);

      this.setState(() => ({
        users: { data: res.data, fetching: false, errored: false },
      }));
    }, (err) => {
      this.setState(() => ({
        users: { data: [], fetching: false, errored: true },
        albums: { ...this.state.albums, fetching: true },
      }));
    });
  }

  /**
   * Fetches a user's albums
   * @param  {Number} userId
   * @return {Promise}
   */
  fetchAlbums(userId) {
    const endPoint = `${PHOTOS_API}/albums?userId=${userId}`;

    this.setState(() => ({ albums: { ...this.state.albums, fetching: true } }));

    return axios.get(endPoint).then((res) => {
      this.setState(() => ({
        albums: { data: res.data, fetching: false, errored: false },
      }));
    }, (err) => {
      this.setState(() => ({
        albums: { data: [], fetching: false, errored: true },
      }));
    });
  }

  /**
   * Fetches photos in a particular album
   * @param  {Number} albumId
   * @return {Promise}
   */
  fetchAlbumPhotos(albumId) {
    return axios.get(`${PHOTOS_API}/photos?albumId=${albumId}`);
  }

  render() {
    const {
      data: users,
      fetching: fetchingUsers,
      errored: usersError,
    } = this.state.users;

    const {
      data: albums,
      fetching: fetchingAlbums,
      errored: albumsError,
    } = this.state.albums;

    const showAlertForUsers = !fetchingUsers && (usersError || !users.length);
    const showAlertForAlbums = !fetchingAlbums && (albumsError || !albums.length);

    return (
      <section className={'users-section'}>
        <div className={'users-wrapper'}>
          {fetchingUsers && <Loader />}

          {showAlertForUsers && (
            <Alert message={usersError ? 'Network Error' : 'No users to display'} />
          )}

          {!!users.length && (
            <React.Fragment>
              <UsersList
                users={users}
                defaultActiveItem={users[0].id}
                onItemClick={this.fetchAlbums}
              />

              <div className={'albums'}>
                {fetchingAlbums && <Loader />}

                {showAlertForAlbums && (
                  <Alert message={albumsError ? 'Network Error' : 'No albums to display'} />
                )}

                {!!albums.length && (
                  <React.Fragment>
                    <h5 className={'subject-title'}>
                      {'ALBUMS'}
                    </h5>

                    <AlbumDrawer
                      items={albums}
                      onPanelClick={this.fetchAlbumPhotos}
                    />
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    );
  }
}

export default Users;
