import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="section container narrow" style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
    <h2>Page not found</h2>
    <p className="muted-text">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn btn-primary">Go Home</Link>
  </section>
);

export default NotFoundPage;
