import { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.scss';
import { Column } from '../components/column/column';
import { Row } from '../components/row/row';

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

  const [rows, set_rows] = useState<number>(3);
  const [cols, set_cols] = useState<number>(4);
  const [input_text_table, set_input_text_table] = useState<string[][]>(
    // Array(rows).fill(Array(cols).fill('')),
    [
      ['#', 'circle', 'square', 'triangle'],
      ['1', 'Loser', 'Zaxer', 'Dries'],
      ['2', 'Saddy', 'Discreet', 'Dude'],
    ],
  );

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

  /** width of a full line of `i`s in the chat box */
  const max_line_width = 614;

  const width_of_space = calculate_text_width(
    ' ',
    calc_font_family(font_face),
    calc_font_size(font_size),
  );

  const width_of_separator = calculate_text_width(
    '|',
    calc_font_family(font_face),
    calc_font_size(font_size),
  );

  const column_data: ColumnData[] = [];
  for (let i = 0; i < input_text_table[0].length; i++) {
    column_data.push(
      new ColumnData(
        input_text_table.reduce((col, val) => col.concat(val[i]), []),
        calc_font_family(font_face),
        calc_font_size(font_size),
      ),
    );
  }

  const total_width = column_data.reduce(
    (width, col, i) =>
      (width +=
        col.max_width +
        (i < column_data.values.length - 1
          ? width_of_separator + width_of_space * 2
          : 0)),
    0,
  );

  const output_lines: string[] = [];

  if (total_width >= max_line_width) {
    console.error('max width exceeded!');
  } else {
    // const output: string[][] = Array(rows).fill(Array(cols));
    const output: string[][] = [];
    for (let [i, col] of column_data.entries()) {
      // output.push(Array(col.values.length));
      output.push([]);

      if (!process.browser) {
        break;
      }

      for (let [j, row] of col.values.entries()) {
        // for (let j = 0; j < col.values.length; j++) {
        //   const row = col.values[j];
        const extra_space = col.max_width - row.width;
        const spaces = Math.round(extra_space / width_of_space);
        const spaces_before = Math.floor(spaces / 2);
        const spaces_after = Math.ceil(spaces / 2);

        output[i][j] =
          ' '.repeat(spaces_before + 1) +
          row.value +
          ' '.repeat(spaces_after + 1) +
          (i < column_data.length - 1 ? '|' : '');
      }
    }

    for (let i = 0; i < output[0].length; i++) {
      output_lines.push(output.reduce((row, val) => row + val[i], ''));
    }
  }

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

          <form className={styles.form}>
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

          <br />

          <form className={styles.form}>
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

          <br />

          <form className={styles.form} onSubmit={ev => ev.preventDefault()}>
            <Column>
              {[...Array(rows).keys()].map(row => (
                <Row key={row}>
                  {[...Array(cols).keys()].map(col => (
                    <input
                      key={col}
                      type="text"
                      value={input_text_table[row][col]}
                      onChange={ev => {
                        // TODO: don't rewrite original array
                        const new_table = input_text_table.concat([]);
                        new_table[row][col] = ev.target.value;
                        set_input_text_table(new_table);
                      }}
                    />
                  ))}
                  <button
                    onClick={() => {
                      if (cols > 1) {
                        remove_col(
                          rows,
                          cols,
                          set_cols,
                          input_text_table,
                          set_input_text_table,
                        );
                      }
                    }}
                    disabled={cols <= 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      add_col(
                        rows,
                        cols,
                        set_cols,
                        input_text_table,
                        set_input_text_table,
                      )
                    }
                  >
                    +
                  </button>
                </Row>
              ))}
              <Row>
                <button
                  onClick={() => {
                    if (rows > 1) {
                      remove_row(
                        rows,
                        cols,
                        set_rows,
                        input_text_table,
                        set_input_text_table,
                      );
                    }
                  }}
                  disabled={rows <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (rows < 5) {
                      add_row(
                        rows,
                        cols,
                        set_rows,
                        input_text_table,
                        set_input_text_table,
                      );
                    }
                  }}
                  disabled={rows >= 5}
                >
                  +
                </button>
              </Row>
            </Column>

            <hr />
            <Column
              className={styles.outputText}
              style={{ fontFamily: calc_font_family(font_face) }}
            >
              <div>Output:</div>
              {output_lines.map((row, i) => (
                <Row key={i}>
                  <div className={styles.channel}>To [Fireteam]: </div>
                  <div>{row}</div>
                  <button
                    className={styles.clipboardButton}
                    onClick={ev => {
                      const button = ev.target as HTMLButtonElement;
                      const line = button.previousSibling as HTMLDivElement;
                      if (line != null) {
                        window.getSelection()?.selectAllChildren(line);
                        document.execCommand('copy');
                      }
                    }}
                  >
                    Copy
                  </button>
                </Row>
              ))}
            </Column>
          </form>
        </Column>
      </main>

      <footer className={styles.footer}>
        Powered by
        <a
          href="https://flawlessexecution.gg?utm_source=destiny-tools&utm_medium=chat-builder&utm_campaign=chat-builder"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          Flawless Execution
        </a>
      </footer>
    </div>
  );
}

function add_row(
  rows: number,
  cols: number,
  set_rows: (val: number) => void,
  input_text_table: string[][],
  set_input_text_table: (val: string[][]) => void,
): void {
  input_text_table.push(Array(cols).fill(''));
  set_rows(rows + 1);
  set_input_text_table(input_text_table);
}

function add_col(
  rows: number,
  cols: number,
  set_cols: (val: number) => void,
  input_text_table: string[][],
  set_input_text_table: (val: string[][]) => void,
): void {
  for (let row of input_text_table) {
    row.push('');
  }
  set_cols(cols + 1);
  set_input_text_table(input_text_table);
}

function remove_row(
  rows: number,
  cols: number,
  set_rows: (val: number) => void,
  input_text_table: string[][],
  set_input_text_table: (val: string[][]) => void,
): void {
  set_rows(rows - 1);
  input_text_table.splice(rows - 1);
  set_input_text_table(input_text_table);
}

function remove_col(
  rows: number,
  cols: number,
  set_cols: (val: number) => void,
  input_text_table: string[][],
  set_input_text_table: (val: string[][]) => void,
): void {
  set_cols(cols - 1);
  for (let row of input_text_table) {
    row.splice(cols - 1);
  }
  set_input_text_table(input_text_table);
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

  if (!process.browser) {
    return width;
  }

  const span = document.createElement('span');
  document.body.appendChild(span);
  span.style.position = 'absolute';
  span.style.opacity = '0';
  span.style.fontFamily = font_face;
  span.style.fontSize = `${font_size}px`;
  span.style.whiteSpace = 'break-spaces';
  for (let char of input_text) {
    span.innerText = char;
    width += span.offsetWidth;
  }
  document.body.removeChild(span);

  return width;
}

class ColumnData {
  private _values: { value: string; width: number }[];
  get values(): { value: string; width: number }[] {
    return this._values;
  }

  private _max_width: number = 0;
  get max_width(): number {
    return this._max_width;
  }

  constructor(
    _values: string[],
    private _font_face: string,
    private _font_size: number,
  ) {
    this._values = _values.map(val => ({
      value: val,
      width: calculate_text_width(val, this._font_face, this._font_size),
    }));

    this._max_width = this._values.reduce((max_width, curr) => {
      return curr.width > max_width ? curr.width : max_width;
    }, 0);
  }
}
