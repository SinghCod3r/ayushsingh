import React from 'react';

interface OdometerProps {
  value: number | string;
  suffix?: string;
  fontSize?: string;
  color?: string;
  outlined?: boolean;
}

export const Odometer: React.FC<OdometerProps> = ({
  value,
  suffix = '',
  fontSize = '2.5rem',
  color = 'var(--ink)',
  outlined = false,
}) => {
  const str = String(value);
  const digits = str.split('');

  return (
    <div
      className={`odometer-wrap ${outlined ? 'odometer-outlined' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: "'Anton', sans-serif",
        fontSize,
        lineHeight: 1,
        color: outlined ? 'transparent' : color,
        WebkitTextStroke: outlined ? '2px var(--red)' : 'none',
        overflow: 'hidden',
        verticalAlign: 'baseline',
      }}
    >
      {digits.map((ch, idx) => {
        const isDigit = /\d/.test(ch);
        if (!isDigit) {
          return (
            <span key={idx} className="odometer-char" style={{ lineHeight: 1 }}>
              {ch}
            </span>
          );
        }

        const digitNum = parseInt(ch, 10);

        return (
          <div
            key={idx}
            className="odometer-column"
            style={{
              display: 'inline-block',
              height: '1em',
              lineHeight: '1em',
              overflow: 'hidden',
              position: 'relative',
              width: '0.62em',
              textAlign: 'center',
            }}
          >
            <div
              className="odometer-ribbon"
              style={{
                transform: `translateY(-${digitNum}em)`,
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    height: '1em',
                    lineHeight: '1em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {suffix && (
        <span
          className="odometer-suffix"
          style={{
            fontSize: '0.45em',
            marginLeft: '0.15em',
            color: 'var(--red)',
            WebkitTextStroke: 'none',
            lineHeight: 1,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
};
