import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Alert from './Alert';
import Loader from './Loader';

class AlbumDrawerPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      content: { data: [], fetching: false, errored: false },
    };

    this.renderContents = this.renderContents.bind(this);
    this.handleAlbumPanelClick = this.handleAlbumPanelClick.bind(this);
  }

  /**
   * Handles album panel click event
   * @return {Promise}
   */
  handleAlbumPanelClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      content: { ...this.state.content, fetching: true },
    }));

    // fetch album photos
    return this.props.onPanelClick(this.props.item.id)
      .then((res) => {
        this.setState(() => ({
          content: { data: res.data, fetching: false, errored: false },
        }));
      }, (err) => {
        this.setState(() => ({
          content: { data: [], fetching: false, errored: true },
        }));
      });
  }

  /**
   * Renders panel's contents
   * @return {JSX}
   */
  renderContents() {
    const { data: contents, fetching, errored } = this.state.content;

    return (
      <React.Fragment>
        {fetching && <Loader />}

        {!fetching && (errored || !contents.length) && (
          <Alert message={errored ? 'Network Error' : 'No photos to display'} />
        )}

        <div className={'album-cards-wrapper'}>
          {contents.map(content => (
            <div
              key={content.id}
              className={'card'}
            >
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className={'card__image'}
              />

              <div className={'card__body'}>
                <h5 className={'m0-p0'}>
                  {content.title}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { item } = this.props;
    const { fetching } = this.state.content;

    return (
      <div className={classnames('drawer-panel', {
        'is-open': this.state.isOpen,
      })}>
        <div
          className={'drawer-panel__header'}
          onClick={this.handleAlbumPanelClick}
        >
          {item.title}
        </div>

        <div
          style={{ paddingTop: fetching ? '64px' : '' }}
          className={'drawer-panel__content'}
        >
          {this.renderContents()}
        </div>
      </div>
    );
  }
}

AlbumDrawerPanel.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onPanelClick: PropTypes.func.isRequired,
};

export default AlbumDrawerPanel;
