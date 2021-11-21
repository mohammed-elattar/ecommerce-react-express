import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

interface Props {
  value: number;
  text: string;
  rating?: number;
  color?: string;
}

const Rating: React.FC<Props> = ({ value, text, rating, color }) => {
  return (
    <div className='rating'>
      {[...Array(rating)].map((_, index: number) => (
        <FontAwesomeIcon
          color={color}
          icon={
            value > index
              ? faStar
              : value > index + 0.5
              ? faStarHalfAlt
              : emptyStar
          }
          key={index}
        />
      ))}{' '}
      {text}
    </div>
  );
};

Rating.defaultProps = {
  rating: 5,
  color: '#f8e925',
};

export default Rating;
