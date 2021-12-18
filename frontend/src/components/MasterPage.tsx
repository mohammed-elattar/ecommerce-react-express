import React from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Header from './Header';
interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}
const MasterPage: React.FC<Props> = ({
  // these can be overwritten in each page seprately and it's only after page rendered so it's not have any value for SEO
  title = 'Welcome To ProShop',
  description = 'We sell the best products for cheap',
  keywords = 'electronics, buy electronics, cheap electroincs',
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keywords} />
      </Helmet>
      <Header />
      <main className='py-3'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default MasterPage;
