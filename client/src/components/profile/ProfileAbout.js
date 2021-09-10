import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills
  },
  auth: {
    username
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        {username ? (
         <h2 className='text-primary'>{username.trim().split(' ')[0]}'s Bio</h2>
      ) : (
        <h2 className='text-primary'>User's Bio</h2>
      )}
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
    <h2 className='text-primary'>Skill Set</h2>
    <div className='skills'>
      {skills.map((skill, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
