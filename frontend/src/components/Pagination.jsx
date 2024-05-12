import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <Link
            key={p + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${p + 1}`
                  : `/page/${p + 1}`
                : `/admin/products/${p + 1}`
            }>
            <Pagination.Item as='span' active={p + 1 === page}>
              {p + 1}
            </Pagination.Item>
          </Link>
        ))}
      </Pagination>
    )
  );
};

PaginationComponent.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  isAdmin: PropTypes.bool,
  keyword: PropTypes.string,
};

export default PaginationComponent;
