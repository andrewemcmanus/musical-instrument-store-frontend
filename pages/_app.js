import Page from "../components/Page"
import { ApolloProvider } from "@apollo/client";
import { CartStateProvider } from "../lib/cartState";
import Router from 'next/Router';
import NProgress from "nprogress";
import withData from '../lib/withData';
// import '../components/styles/nprogress.css'
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  ) 
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {};
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  };
  pageProps.query = ctx.query;
  return { pageProps };
}

export default withData(MyApp);
