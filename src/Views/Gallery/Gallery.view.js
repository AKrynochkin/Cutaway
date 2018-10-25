import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Gallery.view.scss';

const itemTmpl = {
  title: 'Lorem ipsum dolor sit amet.',
  imgName: '1.jpg'
};

const items = [];

for (let i = 0; i < 25; i++) {
  items.push({ ...itemTmpl, id: i + 1 });
}

export class Gallery extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <section className='gallery'>
        <div className='gallery__items-wrapper'>
          {
            items.map((item, index) => (
              <div key={index} className='gallery__item'>
                <img className='gallery__item__img' src={require('../../Assets/images/no_poster.jpg')} alt={item.title} />
                <Link className='gallery__item__title' to={`/gallery/${item.id}`}>{item.title}</Link>
              </div>
            ))
          }
        </div>
      </section>
    );
  }
}
