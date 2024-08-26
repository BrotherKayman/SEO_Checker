import React, { useState, useEffect } from 'react';
import './Reviews.css';

const reviews = [
  { id: 1, name: 'Thabo Melamu', company: 'TSA Tech Solutions', position: 'CEO', stars: 5, review: 'TOP SEO transformed our online presence. The increase in organic traffic was noticeable within weeks. Highly recommend!', date: 'June 20, 2021' },
  { id: 2, name: 'Palesa Metsing', company: 'Melamu Mining Machinery', position: 'Marketing Manager', stars: 5, review: 'The team at TOP SEO is exceptional. Their comprehensive strategies and frequent updates kept us informed and engaged throughout the process.', date: 'August 19, 2024' },
  { id: 3, name: 'David De Koker', company: 'JD Lifestyle', position: 'Product Lead', stars: 5, review: 'We saw a significant boost in our search engine rankings thanks to TOP SEO. Their attention to detail and personalized service made a big difference.', date: 'March 18, 2021' },
  { id: 4, name: 'Peter Monare', company: 'TransTech', position: 'CTO', stars: 5, review: 'TOP SEO delivered on their promises. The keyword research was thorough, and our website’s visibility improved considerably. A solid investment for our business.', date: 'August 17, 2024' },
  { id: 5, name: 'Stephanie Abrams', company: 'Merafe Logistics', position: 'Operations Manager', stars: 4, review: 'Great service and support.', date: 'August 16, 2024' },
  { id: 6, name: 'David Harvey', company: 'Refresh', position: 'Sales Director', stars: 5, review: 'The results from TOP SEO exceeded our expectations. Their strategies not only improved our search rankings but also enhanced our overall digital marketing efforts.', date: 'August 15, 2024' }
];

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className='reviews-container'>
      <div
        className='reviews-slider'
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {duplicatedReviews.map((review) => (
          <div
            key={review.id}
            className='review-card'
          >
            <h3 className='review-name'>{review.name}</h3>
            <p className='review-company'>{review.company} - {review.position}</p>
            <div className='review-stars'>{'★'.repeat(review.stars)}</div>
            <p className='review-text'>{review.review}</p>
            <p className='review-date'>{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
