import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'Mern Shop',
  description = 'We sell the best products',
  keywords = 'electronics',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default Meta;
