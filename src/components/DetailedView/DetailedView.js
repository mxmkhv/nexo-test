import React, { useEffect } from 'react';
import styles from './DetailedView.module.scss';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const DetailedView = props => {
  let { slug } = useParams();

  useEffect(() => {
    props.fetchCountryData(slug);
    // eslint-disable-next-line
  }, [slug]);

  let details = props.countryData ? props.countryData[props.countryData.length - 1] : null;

  let countryDetails = details ? (
    <div>
      <p>{JSON.stringify(details, null, 2)}</p>
      <h1>{details.Country}</h1>
      <h1>{details.Confirmed}</h1>
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      {countryDetails}
      <Link to='/'>Close</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    countryData: state.countryData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountryData: slug => {
      fetch(
        `https://api.covid19api.com/total/country/${slug}?from=2020-06-24T00:00:00Z&to=2020-06-25T00:00:00Z`
      )
        .then(res => res.json())
        .then(data =>
          dispatch({
            type: 'FETCH_COUNTRYDATA',
            data
          })
        );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
