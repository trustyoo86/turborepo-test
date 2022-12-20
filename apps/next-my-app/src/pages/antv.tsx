import { Column } from '@ant-design/plots';
// import { Column } from '@ant-design/plots';
import dynamic from 'next/dynamic';
const Plots = dynamic(
  // @ts-ignore
  async () => {
    try {
      const plotModule = await import('@ant-design/plots');
      return plotModule.default;
    } catch {
      return null;
    }
  },
  { ssr: false },
);
// const { Column } = Plots;

const data = [
  {
    type: 'test',
    sales: 38,
  },
  {
    type: 'test1',
    sales: 32,
  },
  {
    type: 'test2',
    sales: 42,
  },
  {
    type: 'test3',
    sales: 11,
  },
  {
    type: 'test4',
    sales: 55,
  },
];

const config = {
  data,
  xField: 'type',
  yField: 'sales',
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '타입',
    },
    sales: {
      alias: '판매량',
    },
  },
};

function AntvExample() {
  return (
    <>
      <div>Antv</div>
      <Column {...config} />
    </>
  );
}

export default AntvExample;
