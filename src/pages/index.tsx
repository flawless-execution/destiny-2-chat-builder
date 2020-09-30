import { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.scss';
import { Column } from '../components/column/column';

export default function Home() {
  // const [font_face, set_face_size] = useState<string>('AxisStd-Regular');
  // const [font_size, set_font_size] = useState<number>(0.5419);
  // const [padding_top, set_padding_top] = useState<number>(0.52);
  // const [padding_left, set_padding_left] = useState<number>(0.53);

  // const [font_face, set_face_size] = useState<string>(
  //   'NeueHaasUnicaW1G-Regular',
  // );
  // const [font_size, set_font_size] = useState<number>(0.6619);
  // const [padding_top, set_padding_top] = useState<number>(0.33);
  // const [padding_left, set_padding_left] = useState<number>(0.62);

  const [font_face, set_face_size] = useState<string>('NHaasGroteskTXPro-55Rg');
  const [font_size, set_font_size] = useState<number>(0.628);
  const [padding_top, set_padding_top] = useState<number>(0.45);
  const [padding_left, set_padding_left] = useState<number>(0.44);

  const [input_text, set_input_text] = useState<string>('');

  const [rows, set_rows] = useState<number>(2);
  const [cols, set_cols] = useState<number>(4);

  const font_faces = [
    'ALD55',
    'AxisStd-Heavy',
    'AxisStd-Medium',
    'AxisStd-Regular',
    'CromwellHPLHS',
    'CromwellNF',
    'Destiny_Keys',
    'Destiny_Symbols_360',
    'Destiny_Symbols_PC',
    'Destiny_Symbols_PS4',
    'Destiny_Symbols_Stadia',
    'Destiny_Symbols_Steam',
    'Destiny_Symbols_Xbox_ONE',
    'IwaNReiPro-Md',
    'MYingHeiHK-W4',
    'MYingHeiHK-W7',
    'MYingHeiHK-W8',
    'MYingHeiPRC-W4',
    'MYingHeiPRC-W7',
    'MYingHeiPRC-W8',
    'NeueHaasUnicaW1G-Bold',
    'NeueHaasUnicaW1G-Italic',
    'NeueHaasUnicaW1G-Medium',
    'NeueHaasUnicaW1G-MediumIt',
    'NeueHaasUnicaW1G-Regular',
    'NHaasGroteskDSPro-75Bd',
    'NHaasGroteskTXPro-55Rg',
    'NHaasGroteskTXPro-56It',
    'NHaasGroteskTXPro-65Md',
    'NHaasGroteskTXPro-66MdIt',
    'SDBNGGothicNeoaUni-eMd',
    'SDBNGGothicNeoaUni-gBd',
    'SDBNGGothicNeoaUni-iHv',
    'SDBNGMjNeoaUni-dMd',
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Destiny Chat Builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Column>
          <div className={styles.fontSample}>
            <img src="/text.png" />
            <div
              className={styles.previewText}
              style={{
                fontFamily: calc_font_family(font_face),
                fontSize: calc_font_size(font_size),
                top: padding_top * 20 - 10,
                left: padding_left * 15 - 5,
              }}
            >
              <span>To [Fireteam]:</span> The quick brown fox jumps over the
              lazy dog
            </div>
          </div>

          <form>
            <Column>
              <label>
                Font Face
                <select
                  value={font_face}
                  onChange={val => set_face_size(val.target.value)}
                >
                  {font_faces.map(font => (
                    <option value={font} key={font}>
                      {font}
                    </option>
                  ))}
                </select>
                {font_face}
              </label>
              <label>
                Font Size
                <input
                  type="range"
                  value={font_size * 100}
                  onChange={val =>
                    set_font_size(Number.parseFloat(val.target.value) / 100)
                  }
                />
                {font_size}
              </label>
              <label>
                Top
                <input
                  type="range"
                  value={padding_top * 100}
                  onChange={val =>
                    set_padding_top(Number.parseFloat(val.target.value) / 100)
                  }
                />
                {padding_top}
              </label>
              <label>
                Left
                <input
                  type="range"
                  value={padding_left * 100}
                  onChange={val =>
                    set_padding_left(Number.parseFloat(val.target.value) / 100)
                  }
                />
                {padding_left}
              </label>
            </Column>
          </form>

          <form>
            <Column>
              <label>
                Text
                <input
                  type="text"
                  value={input_text}
                  onChange={val => set_input_text(val.target.value)}
                />
                width:{' '}
                {calculate_text_width(
                  input_text,
                  calc_font_family(font_face),
                  calc_font_size(font_size),
                )}
              </label>
            </Column>
          </form>
        </Column>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

function calc_font_size(font_size: number): number {
  return font_size * 30 + 5;
}

function calc_font_family(font_face: string): string {
  return `"${font_face}", "Destiny_Symbols_PC"`;
}

function calculate_text_width(
  input_text: string,
  font_face: string,
  font_size: number,
): number {
  let width = 0;

  const span = document.createElement('span');
  document.body.appendChild(span);
  span.style.position = 'absolute';
  span.style.opacity = '0';
  span.style.fontFamily = font_face;
  span.style.fontSize = `${font_size}px`;
  for (let char of input_text) {
    span.innerText = char;
    width += span.offsetWidth;
  }
  document.body.removeChild(span);

  return width;
}
