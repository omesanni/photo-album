import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: props.defaultActiveItem,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  /**
   * Handles event for list item click
   * @param  {Number}   userId
   * @return {Function}
   */
  handleItemClick(userId) {
    this.setState(() => ({ activeItem: userId }));

    return this.props.onItemClick(userId);
  }

  render() {
    const { users } = this.props;

    return (
      <ul className={'users-list'}>
        {users.map(user => (
          <li
            key={user.id}
            className={classnames('users-list__item', {
              active: this.state.activeItem === user.id,
            })}
          >
            <a onClick={() => this.handleItemClick(user.id)}>
              {user.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onItemClick: PropTypes.func,
  defaultActiveItem: PropTypes.number,
};

UsersList.defaultProps = {
  onItemClick: () => undefined,
  defaultActiveItem: undefined,
};

export default UsersList;
