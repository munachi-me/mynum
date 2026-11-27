import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F0',
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 26, height: 64, backgroundColor: '#FF7900' }} />
          <div style={{ width: 26, height: 64, backgroundColor: '#FF7900', marginLeft: 30 }} />
        </div>
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 2, color: '#737373' }}>
          NUMIQ · NUMVIZ
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 76, color: '#0A0A0A', lineHeight: 1.05, letterSpacing: -2 }}>
          Tools for working with data.
        </div>
        <div style={{ fontSize: 28, color: '#242424', maxWidth: 880 }}>
          Numiq analyses and prepares data. Numviz visualizes and presents it.
        </div>
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: '#737373' }}
      >
        <div style={{ width: 40, height: 4, backgroundColor: '#16A34A' }} />
        {siteConfig.name}
      </div>
    </div>,
    size,
  );
}
