import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';

class PhotoSlider extends React.Component {
  constructor() {
    super();

    this.state = {
      slideIndex: 0,
    };

    this.showSlide = this.showSlide.bind(this);
  }

  /**
   * Displays the next slide
   * @param  {Number} index Position of slide
   */
  showSlide(index) {
    const { slideIndex } = this.state;
    const { photos } = this.props;

    let newIndex = slideIndex + index;

    if (newIndex < 0) {
      newIndex = photos.length - 1;
    } else if (newIndex === photos.length) {
      newIndex = 0;
    }

    this.setState(() => ({ slideIndex: newIndex }));
  }

  render() {
    const { photos } = this.props;
    const { slideIndex } = this.state;

    if (!photos.length) {
      return null;
    }

    return (
      <div className={'photo-slides'}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={classnames('photo-slides__slide', {
              'photo-slides__slide--current-slide': slideIndex === index,
            })}
          >
            <a
              className={'photo-slides__slide__prev'}
              onClick={() => this.showSlide(-1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            <a
              className={'photo-slides__slide__next'}
              onClick={() => this.showSlide(1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </a>

            <img
              src={photo.url}
              alt={photo.title}
              className={'photo-slides__slide__photo'}
            />
          </div>
        ))}

        <div className={'photo-slides__details'}>
          <h5 className={'photo-slides__details__caption'}>
            {photos[slideIndex].title}
          </h5>

          <h5>
            {`${slideIndex + 1} / ${photos.length}`}
          </h5>
        </div>
      </div>
    );
  }
}

PhotoSlider.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default PhotoSlider;
