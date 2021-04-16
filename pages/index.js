import Head from "next/head";
import HomePage from "../components/HomePage";

export default function Home({ mindata }) {
  return (
    <div>
      <Head>
        <title>Coronavirus Statistics Of India</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A volunteer-driven crowdsourced effort to track the coronavirus in India. A detailed country map shows the extent of the coronavirus outbreak, with tables of the number of cases by state and district."
        />
        <meta
          name="keywords"
          content="covid, covid19, covid-19, covid19india, coronavirus, corona, india, virus, pandemic, disease, carona, karona, korona"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomePage mindata={mindata} />
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`https://api.covid19india.org/v4/min/data.min.json`);
  const mindata = await res.json();

  if (!mindata) {
    return {
      notFound: true,
    };
  }

  return {
    props: { mindata },
    revalidate: 1,
  };
}
