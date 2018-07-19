import React from 'react';
import PropTypes from 'prop-types';
import AlbumDrawerPanel from './AlbumDrawerPanel';

const AlbumDrawer = props => (
  <div className={'drawer'}>
    {props.items.map(album => (
      <AlbumDrawerPanel
        key={album.id}
        item={album}
        onPanelClick={props.onPanelClick}
      />
    ))}
  </div>
);

AlbumDrawer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onPanelClick: PropTypes.func.isRequired,
};

export default AlbumDrawer;
