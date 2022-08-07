import Document, { Html, Head, Main, NextScript } from 'next/document'

class LegoistDoc extends Document {
  head = 'Fredoka+One';
  body = 'Raleway:wght@200';

  getFontUrl(): string {
    const url = 'https://fonts.googleapis.com/css2?';
    const params = `family=${this.head}&family=${this.body}&display=optional`;
    return url+params;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href={this.getFontUrl()}
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default LegoistDoc