import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Head from '../../Components/Head/Head';
import BodyContent from '../../Components/BodyContent/BodyContent';
import '../../Style/About.scss';

function About() {
  const AboutText = `
    Welcome to MRV Ratings Site, your ultimate destination for exploring the enchanting realm of movies! At MRV Ratings Site, 
    we present a carefully curated selection of movies, each with its own unique blend of entertainment and storytelling. 
    Our platform introduces the innovative MRV rating system a bespoke metric designed to capture the true essence of a movie's popularity.
    Whether you're a dedicated cinephile in search of top-rated films, a fan of trending releases, or someone eager to discover hidden gems,
    our categories, including Top Ratings, Popular, Upcoming, and Now Playing, cater to every cinematic taste.

    Delve into the rich details of each movie, from comprehensive rating statistics to official trailers and captivating posters. 
    Our user-friendly interface ensures a seamless experience as you explore the vast cinematic landscape. 
    The search bar allows you to quickly find your favorite movies, enhancing your movie-watching journey.

    At MRV Ratings Site, our passion for movies drives us to provide a platform that elevates your movie discovery and rating experience. 
    Join us in celebrating the magic of cinema, and let the world of movies unfold before your eyes.

    Thank you for choosing MRV Ratings Site where movie exploration meets innovation!
  `;

  return (
    <div className='about-page'>
      <Head Title='About Page' />
      <div>
        <Header />
      </div>
      <BodyContent>
        <h1>About Us</h1>
        <p>{AboutText}</p>
        <br />
      </BodyContent><br /><br />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default About;
