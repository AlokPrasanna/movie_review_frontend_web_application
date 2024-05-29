import React, { useState } from 'react';
import '../../Style/CategoryList.scss';
import { Link } from 'react-router-dom';

function LanguageList({children}) {
    const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className='category-list'>
      <div
        className={`categories ${isOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <ul>
            <li>
              <Link to="/filtered-movies/1/0">English</Link>
            </li>
            <li>
              <Link to="/filtered-movies/2/0">Tamil</Link>
            </li>
            <li>
              <Link to="/filtered-movies/3/0">Telugu</Link>
            </li>
            {/*Should create all genres */}
          </ul>
        </div>
      </div>
      {children}
    </div>
  )
}

export default LanguageList
